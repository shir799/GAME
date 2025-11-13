/**
 * UpgradeManager - Manages upgrades and their effects
 */

import type { GameState, UpgradeConfig, UpgradeState } from '@types';
import { EventBus } from '@core/EventBus';
import { UPGRADE_CONFIGS } from '@config/upgrades';

export class UpgradeManager {
  private gameState: GameState;
  private eventBus: EventBus;
  private upgradeConfigs: Map<string, UpgradeConfig>;

  constructor(gameState: GameState) {
    this.gameState = gameState;
    this.eventBus = EventBus.getInstance();
    this.upgradeConfigs = new Map();
  }

  initialize(gameState: GameState): void {
    this.gameState = gameState;

    // Load upgrade configs
    UPGRADE_CONFIGS.forEach((config) => {
      this.upgradeConfigs.set(config.id, config);

      // Initialize upgrade state if not exists
      if (!this.gameState.upgrades[config.id]) {
        this.gameState.upgrades[config.id] = {
          upgradeId: config.id,
          currentLevel: 0,
          isPurchased: false,
          totalSpent: 0,
        };
      }
    });
  }

  /**
   * Purchase an upgrade
   */
  purchaseUpgrade(upgradeId: string): boolean {
    const config = this.upgradeConfigs.get(upgradeId);
    if (!config) {
      console.error(`Upgrade config not found: ${upgradeId}`);
      return false;
    }

    const state = this.gameState.upgrades[upgradeId];
    if (!state) return false;

    // Check if can be upgraded
    if (state.currentLevel >= config.maxLevel) {
      return false; // Max level reached
    }

    // Check requirements
    if (!this.canPurchaseUpgrade(upgradeId)) {
      return false;
    }

    // Calculate cost
    const cost = this.getUpgradeCost(upgradeId);

    // Check if player can afford
    if (this.gameState.player.money < cost) {
      return false;
    }

    // Purchase upgrade
    this.gameState.player.money -= cost;
    state.currentLevel += 1;
    state.isPurchased = true;
    state.totalSpent += cost;

    // Apply upgrade effect
    this.applyUpgradeEffect(config);

    this.eventBus.emit('upgrade:purchased', {
      upgradeId,
      level: state.currentLevel,
      cost,
    });

    return true;
  }

  /**
   * Check if upgrade can be purchased
   */
  canPurchaseUpgrade(upgradeId: string): boolean {
    const config = this.upgradeConfigs.get(upgradeId);
    if (!config) return false;

    const state = this.gameState.upgrades[upgradeId];
    if (!state || state.currentLevel >= config.maxLevel) return false;

    // Check level requirement
    if (this.gameState.player.level < config.unlockLevel) return false;

    // Check other requirements
    if (config.requirements) {
      for (const req of config.requirements) {
        if (!this.checkRequirement(req)) {
          return false;
        }
      }
    }

    // Check cost
    const cost = this.getUpgradeCost(upgradeId);
    if (this.gameState.player.money < cost) return false;

    return true;
  }

  /**
   * Get upgrade cost for next level
   */
  getUpgradeCost(upgradeId: string): number {
    const config = this.upgradeConfigs.get(upgradeId);
    if (!config) return Infinity;

    const state = this.gameState.upgrades[upgradeId];
    if (!state) return Infinity;

    // Calculate cost with exponential scaling
    return Math.floor(config.baseCost * Math.pow(config.costMultiplier, state.currentLevel));
  }

  /**
   * Get upgrade state
   */
  getUpgradeState(upgradeId: string): UpgradeState | undefined {
    return this.gameState.upgrades[upgradeId];
  }

  /**
   * Get all available upgrades for current level
   */
  getAvailableUpgrades(): UpgradeConfig[] {
    return Array.from(this.upgradeConfigs.values()).filter(
      (config) => config.unlockLevel <= this.gameState.player.level
    );
  }

  /**
   * Get upgrade config
   */
  getUpgradeConfig(upgradeId: string): UpgradeConfig | undefined {
    return this.upgradeConfigs.get(upgradeId);
  }

  /**
   * Apply upgrade effect to game state
   */
  private applyUpgradeEffect(config: UpgradeConfig): void {
    const effect = config.effect;

    switch (effect.target) {
      case 'clickPower':
        if (effect.type === 'additive') {
          this.gameState.player.clickPower += effect.value;
        } else if (effect.type === 'multiplicative') {
          this.gameState.player.clickPower *= effect.value;
        }
        break;

      case 'passiveIncome':
        if (effect.type === 'additive') {
          this.gameState.player.passiveIncome += effect.value;
        } else if (effect.type === 'multiplicative') {
          this.gameState.player.passiveIncome *= effect.value;
        }
        break;

      case 'growthSpeed':
        // Handled in FarmManager through upgrade modifiers
        break;

      case 'autoHarvest':
        // Unlock auto-harvest feature
        break;

      // Add more effect targets as needed
    }
  }

  /**
   * Check if requirement is met
   */
  private checkRequirement(requirement: any): boolean {
    switch (requirement.type) {
      case 'level':
        return this.gameState.player.level >= requirement.value;

      case 'upgrade':
        const upgradeState = this.gameState.upgrades[requirement.value];
        return upgradeState?.isPurchased || false;

      case 'money':
        return this.gameState.player.money >= requirement.value;

      case 'reputation':
        return this.gameState.player.reputation >= requirement.value;

      default:
        return false;
    }
  }

  /**
   * Get total upgrade effect for a specific target
   */
  getTotalUpgradeEffect(target: string): number {
    let total = 0;

    for (const [upgradeId, state] of Object.entries(this.gameState.upgrades)) {
      if (!state.isPurchased) continue;

      const config = this.upgradeConfigs.get(upgradeId);
      if (!config || config.effect.target !== target) continue;

      if (config.effect.type === 'additive') {
        total += config.effect.value * state.currentLevel;
      } else if (config.effect.type === 'multiplicative') {
        total *= Math.pow(config.effect.value, state.currentLevel);
      }
    }

    return total;
  }

  /**
   * Get all upgrades with their configs merged with state (for UI)
   */
  getAllUpgradesWithConfig() {
    return Array.from(this.upgradeConfigs.values()).map(config => {
      const state = this.gameState.upgrades[config.id] || {
        upgradeId: config.id,
        currentLevel: 0,
        isPurchased: false,
        totalSpent: 0,
      };

      return {
        id: config.id,
        name: config.name,
        description: config.description,
        category: config.category,
        currentLevel: state.currentLevel,
        maxLevel: config.maxLevel,
        cost: this.getUpgradeCost(config.id),
        effectType: config.effect.type,
        effectValue: config.effect.value,
        effectTarget: config.effect.target,
        unlockLevel: config.unlockLevel,
        isPurchased: state.isPurchased,
      };
    });
  }

  /**
   * Buy upgrade (alias for purchaseUpgrade)
   */
  buyUpgrade(upgradeId: string): boolean {
    return this.purchaseUpgrade(upgradeId);
  }
}
