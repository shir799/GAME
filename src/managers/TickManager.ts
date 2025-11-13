/**
 * TickManager - Manages idle/passive income and offline progress
 */

import type { GameState, TickContext } from '@types';
import { EventBus } from '@core/EventBus';

export class TickManager {
  private gameState: GameState;
  private eventBus: EventBus;
  private accumulatedTime = 0;

  constructor(gameState: GameState) {
    this.gameState = gameState;
    this.eventBus = EventBus.getInstance();
  }

  initialize(gameState: GameState): void {
    this.gameState = gameState;

    // Subscribe to tick events
    this.eventBus.on('game:tick', (event) => {
      this.onTick(event.data);
    });
  }

  update(deltaTime: number): void {
    this.accumulatedTime += deltaTime;

    // Process tick every second
    if (this.accumulatedTime >= 1) {
      this.processTick(this.accumulatedTime);
      this.accumulatedTime = 0;
    }
  }

  /**
   * Process a game tick
   */
  private onTick(context: TickContext): void {
    if (!context.isOffline) {
      this.processTick(context.deltaTime);
    }
  }

  /**
   * Process passive income and idle mechanics
   */
  private processTick(deltaTime: number): void {
    // Calculate passive income
    const passiveIncome = this.gameState.player.passiveIncome * deltaTime;

    if (passiveIncome > 0) {
      this.gameState.player.money += passiveIncome;
      this.gameState.player.totalEarnings += passiveIncome;
    }

    // Auto-harvest ready plants (if upgrade is unlocked)
    if (this.hasAutoHarvest()) {
      this.autoHarvestPlants();
    }

    // Auto-water plants (if upgrade is unlocked)
    if (this.hasAutoWater()) {
      this.autoWaterPlants();
    }
  }

  /**
   * Calculate offline progress
   */
  calculateOfflineProgress(offlineTime: number): { money: number; cannabis: number } {
    // Cap offline time to prevent abuse (max 8 hours)
    const maxOfflineTime = 8 * 60 * 60; // 8 hours in seconds
    const cappedTime = Math.min(offlineTime, maxOfflineTime);

    // Calculate passive income
    const offlineMoney = this.gameState.player.passiveIncome * cappedTime;

    // Calculate offline plant growth and harvests
    let offlineCannabis = 0;

    // Simulate plant growth
    const activeGrowingPlants = this.gameState.plots.filter(
      (plot) => plot.plant && plot.plant.stage !== 'ready'
    ).length;

    // Estimate harvests (simplified calculation)
    const averageGrowTime = 300; // 5 minutes average
    const estimatedHarvests = Math.floor((cappedTime / averageGrowTime) * activeGrowingPlants);
    offlineCannabis = estimatedHarvests * 10; // Assume 10g per harvest

    return {
      money: offlineMoney,
      cannabis: offlineCannabis,
    };
  }

  /**
   * Auto-harvest ready plants
   */
  private autoHarvestPlants(): void {
    // This would be implemented in FarmManager
    // For now, just a placeholder
  }

  /**
   * Auto-water plants
   */
  private autoWaterPlants(): void {
    // This would be implemented in FarmManager
    // For now, just a placeholder
  }

  /**
   * Check if auto-harvest is unlocked
   */
  private hasAutoHarvest(): boolean {
    return this.gameState.upgrades['auto_harvest']?.isPurchased || false;
  }

  /**
   * Check if auto-water is unlocked
   */
  private hasAutoWater(): boolean {
    return this.gameState.upgrades['auto_water']?.isPurchased || false;
  }

  /**
   * Get passive income per second
   */
  getPassiveIncomePerSecond(): number {
    return this.gameState.player.passiveIncome;
  }

  /**
   * Get passive income per hour
   */
  getPassiveIncomePerHour(): number {
    return this.gameState.player.passiveIncome * 3600;
  }
}
