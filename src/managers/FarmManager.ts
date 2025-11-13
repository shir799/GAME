/**
 * FarmManager - Manages plant growing, harvesting, and plot management
 */

import type {
  GameState,
  PlotState,
  PlantInstance,
  PlantConfig,
} from '@types';
import { PlantGrowthStage, PlantQuality } from '@types';
import { EventBus } from '@core/EventBus';
import { PLANT_CONFIGS } from '@config/plants';

export class FarmManager {
  private gameState: GameState;
  private eventBus: EventBus;
  private plantConfigs: Map<string, PlantConfig>;

  constructor(gameState: GameState) {
    this.gameState = gameState;
    this.eventBus = EventBus.getInstance();
    this.plantConfigs = new Map();
  }

  initialize(gameState: GameState): void {
    this.gameState = gameState;

    // Load plant configs
    PLANT_CONFIGS.forEach((config) => {
      this.plantConfigs.set(config.id, config);
    });
  }

  update(deltaTime: number): void {
    // Update all active plants
    this.gameState.plots.forEach((plot) => {
      if (plot.plant) {
        this.updatePlant(plot, deltaTime);
      }
    });
  }

  /**
   * Plant a seed in a plot
   */
  plantSeed(plotId: number, plantConfigId: string): boolean {
    const plot = this.getPlot(plotId);
    if (!plot || !plot.isUnlocked || plot.plant) {
      return false;
    }

    const config = this.plantConfigs.get(plantConfigId);
    if (!config) {
      console.error(`Plant config not found: ${plantConfigId}`);
      return false;
    }

    // Check if player has enough money
    if (this.gameState.player.money < config.baseCost) {
      console.warn(`Not enough money to plant ${config.name}. Need $${config.baseCost}, have $${this.gameState.player.money}`);
      return false;
    }

    // Deduct cost
    this.gameState.player.money -= config.baseCost;
    this.gameState.statistics.totalMoneySpent += config.baseCost;

    // Create new plant instance
    const plant: PlantInstance = {
      id: this.generatePlantId(),
      plantConfigId,
      stage: PlantGrowthStage.SEED,
      quality: this.determineQuality(),
      plantedAt: Date.now(),
      growthProgress: 0,
      isWatered: false,
      isFertilized: false,
      health: 100,
      yieldMultiplier: 1,
    };

    plot.plant = plant;
    this.gameState.statistics.totalPlantedSeeds += 1;

    this.eventBus.emit('plant:planted', { plotId, plant });
    this.eventBus.emit('player:money_change', {
      delta: -config.baseCost,
      newValue: this.gameState.player.money
    });

    return true;
  }

  /**
   * Harvest a plant
   */
  harvestPlant(plotId: number): { cannabis: number; money: number } | null {
    const plot = this.getPlot(plotId);
    if (!plot || !plot.plant || plot.plant.stage !== PlantGrowthStage.READY) {
      return null;
    }

    const plant = plot.plant;
    const config = this.plantConfigs.get(plant.plantConfigId);
    if (!config) return null;

    // Calculate yield
    const baseYield = config.baseCannabisYield;
    const qualityMultiplier = config.qualityMultiplier[plant.quality];
    const healthMultiplier = plant.health / 100;

    const cannabisYield = baseYield * qualityMultiplier * healthMultiplier * plant.yieldMultiplier;
    const moneyValue = config.baseMoneyValue * qualityMultiplier * healthMultiplier;

    // Remove plant from plot
    plot.plant = null;

    // Update statistics
    this.gameState.player.totalHarvests += 1;
    this.gameState.statistics.totalHarvests += 1;

    this.eventBus.emit('plant:harvested', {
      plotId,
      cannabis: cannabisYield,
      money: moneyValue,
      quality: plant.quality,
    });

    return { cannabis: cannabisYield, money: moneyValue };
  }

  /**
   * Water a plant
   */
  waterPlant(plotId: number): boolean {
    const plot = this.getPlot(plotId);
    if (!plot || !plot.plant) return false;

    plot.plant.isWatered = true;
    plot.lastWatered = Date.now();
    plot.plant.health = Math.min(plot.plant.health + 10, 100);

    return true;
  }

  /**
   * Fertilize a plant
   */
  fertilizePlant(plotId: number): boolean {
    const plot = this.getPlot(plotId);
    if (!plot || !plot.plant) return false;

    plot.plant.isFertilized = true;
    plot.lastFertilized = Date.now();
    plot.plant.yieldMultiplier += 0.25; // +25% yield

    return true;
  }

  /**
   * Unlock a plot
   */
  unlockPlot(plotId: number, _cost: number): boolean {
    const plot = this.getPlot(plotId);
    if (!plot || plot.isUnlocked) return false;

    plot.isUnlocked = true;
    return true;
  }

  /**
   * Get plot by ID
   */
  getPlot(plotId: number): PlotState | undefined {
    return this.gameState.plots.find((p) => p.plotId === plotId);
  }

  /**
   * Get all plots
   */
  getAllPlots(): PlotState[] {
    return this.gameState.plots;
  }

  /**
   * Get plant config
   */
  getPlantConfig(plantConfigId: string): PlantConfig | undefined {
    return this.plantConfigs.get(plantConfigId);
  }

  /**
   * Get all available plant configs for current level
   */
  getAvailablePlantConfigs(): PlantConfig[] {
    return Array.from(this.plantConfigs.values()).filter(
      (config) => config.unlockLevel <= this.gameState.player.level
    );
  }

  /**
   * Update plant growth
   */
  private updatePlant(plot: PlotState, deltaTime: number): void {
    if (!plot.plant) return;

    const plant = plot.plant;
    const config = this.plantConfigs.get(plant.plantConfigId);
    if (!config) return;

    // Calculate growth speed
    let growthSpeed = 1 / config.baseGrowTime; // Progress per second

    // Apply modifiers
    if (plant.isWatered) growthSpeed *= 1.2; // +20% growth speed
    if (plant.isFertilized) growthSpeed *= 1.5; // +50% growth speed

    // Update growth progress
    plant.growthProgress += growthSpeed * deltaTime;

    // Handle stage transitions
    const oldStage = plant.stage;
    plant.stage = this.calculateGrowthStage(plant.growthProgress);

    if (oldStage !== plant.stage) {
      this.eventBus.emit('plant:stage_change', {
        plotId: plot.plotId,
        plant,
        oldStage,
        newStage: plant.stage,
      });
    }

    // Degrade watered/fertilized status over time
    const now = Date.now();
    if (plant.isWatered && now - plot.lastWatered > 300000) {
      // 5 minutes
      plant.isWatered = false;
    }
    if (plant.isFertilized && now - plot.lastFertilized > 600000) {
      // 10 minutes
      plant.isFertilized = false;
    }

    // Degrade health if not watered
    if (!plant.isWatered && plant.stage !== PlantGrowthStage.SEED) {
      plant.health -= 0.5 * deltaTime; // Lose 0.5 health per second
      plant.health = Math.max(plant.health, 0);

      // Kill plant if health reaches 0
      if (plant.health <= 0) {
        plot.plant = null;
        this.eventBus.emit('plant:died', { plotId: plot.plotId });
      }
    }
  }

  /**
   * Calculate growth stage based on progress
   */
  private calculateGrowthStage(progress: number): PlantGrowthStage {
    if (progress >= 1) return PlantGrowthStage.READY;
    if (progress >= 0.75) return PlantGrowthStage.FLOWERING;
    if (progress >= 0.4) return PlantGrowthStage.VEGETATIVE;
    if (progress >= 0.15) return PlantGrowthStage.SEEDLING;
    return PlantGrowthStage.SEED;
  }

  /**
   * Determine plant quality randomly
   */
  private determineQuality(): PlantQuality {
    const rand = Math.random();
    if (rand < 0.05) return PlantQuality.PREMIUM; // 5%
    if (rand < 0.20) return PlantQuality.HIGH; // 15%
    if (rand < 0.50) return PlantQuality.MEDIUM; // 30%
    return PlantQuality.LOW; // 50%
  }

  /**
   * Generate unique plant ID
   */
  private generatePlantId(): string {
    return `plant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
