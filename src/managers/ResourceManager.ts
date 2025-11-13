/**
 * ResourceManager - Manages game resources (money, cannabis, reputation, etc.)
 */

import type { GameState, PlayerState } from '@types';
import { EventBus } from '@core/EventBus';

export class ResourceManager {
  private gameState: GameState;
  private eventBus: EventBus;

  constructor(gameState: GameState) {
    this.gameState = gameState;
    this.eventBus = EventBus.getInstance();
  }

  initialize(gameState: GameState): void {
    this.gameState = gameState;
  }

  // ==================== MONEY ====================

  /**
   * Add money to player
   */
  addMoney(amount: number): void {
    if (amount <= 0) return;

    const oldAmount = this.gameState.player.money;
    this.gameState.player.money += amount;
    this.gameState.player.totalEarnings += amount;
    this.gameState.statistics.totalMoneyEarned += amount;

    this.eventBus.emit('player:money_change', {
      old: oldAmount,
      new: this.gameState.player.money,
      delta: amount,
    });
  }

  /**
   * Spend money
   */
  spendMoney(amount: number): boolean {
    if (amount <= 0) return false;
    if (!this.canAfford(amount)) return false;

    const oldAmount = this.gameState.player.money;
    this.gameState.player.money -= amount;
    this.gameState.statistics.totalMoneySpent += amount;

    this.eventBus.emit('player:money_change', {
      old: oldAmount,
      new: this.gameState.player.money,
      delta: -amount,
    });

    return true;
  }

  /**
   * Check if player can afford amount
   */
  canAfford(amount: number): boolean {
    return this.gameState.player.money >= amount;
  }

  /**
   * Get current money
   */
  getMoney(): number {
    return this.gameState.player.money;
  }

  // ==================== CANNABIS ====================

  /**
   * Add cannabis to player
   */
  addCannabis(amount: number): void {
    if (amount <= 0) return;

    const oldAmount = this.gameState.player.cannabis;
    this.gameState.player.cannabis += amount;

    this.eventBus.emit('player:cannabis_change', {
      old: oldAmount,
      new: this.gameState.player.cannabis,
      delta: amount,
    });
  }

  /**
   * Remove cannabis from player
   */
  removeCannabis(amount: number): boolean {
    if (amount <= 0) return false;
    if (this.gameState.player.cannabis < amount) return false;

    const oldAmount = this.gameState.player.cannabis;
    this.gameState.player.cannabis -= amount;

    this.eventBus.emit('player:cannabis_change', {
      old: oldAmount,
      new: this.gameState.player.cannabis,
      delta: -amount,
    });

    return true;
  }

  /**
   * Sell cannabis for money
   */
  sellCannabis(amount: number, pricePerGram: number): boolean {
    if (!this.removeCannabis(amount)) return false;

    const earnings = amount * pricePerGram;
    this.addMoney(earnings);

    return true;
  }

  /**
   * Get current cannabis
   */
  getCannabis(): number {
    return this.gameState.player.cannabis;
  }

  // ==================== REPUTATION ====================

  /**
   * Add reputation
   */
  addReputation(amount: number): void {
    if (amount <= 0) return;

    const oldAmount = this.gameState.player.reputation;
    this.gameState.player.reputation += amount;
    this.gameState.player.reputation = Math.min(this.gameState.player.reputation, 100);

    this.eventBus.emit('player:reputation_change', {
      old: oldAmount,
      new: this.gameState.player.reputation,
      delta: amount,
    });
  }

  /**
   * Remove reputation
   */
  removeReputation(amount: number): void {
    if (amount <= 0) return;

    const oldAmount = this.gameState.player.reputation;
    this.gameState.player.reputation -= amount;
    this.gameState.player.reputation = Math.max(this.gameState.player.reputation, 0);

    this.eventBus.emit('player:reputation_change', {
      old: oldAmount,
      new: this.gameState.player.reputation,
      delta: -amount,
    });
  }

  /**
   * Get current reputation
   */
  getReputation(): number {
    return this.gameState.player.reputation;
  }

  // ==================== EXPERIENCE & LEVEL ====================

  /**
   * Add experience
   */
  addExperience(amount: number): void {
    if (amount <= 0) return;

    this.gameState.player.experience += amount;

    // Check for level up
    while (this.gameState.player.experience >= this.gameState.player.experienceToNextLevel) {
      this.levelUp();
    }
  }

  /**
   * Level up player
   */
  private levelUp(): void {
    const oldLevel = this.gameState.player.level;

    this.gameState.player.experience -= this.gameState.player.experienceToNextLevel;
    this.gameState.player.level += 1;

    // Calculate next level XP requirement (exponential scaling)
    this.gameState.player.experienceToNextLevel = Math.floor(
      100 * Math.pow(1.5, this.gameState.player.level)
    );

    this.eventBus.emit('player:level_up', {
      oldLevel,
      newLevel: this.gameState.player.level,
    });

    console.log(`🎉 Level Up! Now level ${this.gameState.player.level}`);
  }

  /**
   * Get current level
   */
  getLevel(): number {
    return this.gameState.player.level;
  }

  /**
   * Get experience progress to next level (0-1)
   */
  getExperienceProgress(): number {
    return this.gameState.player.experience / this.gameState.player.experienceToNextLevel;
  }

  // ==================== CLICK POWER ====================

  /**
   * Increase click power
   */
  increaseClickPower(amount: number): void {
    this.gameState.player.clickPower += amount;
  }

  /**
   * Get current click power
   */
  getClickPower(): number {
    return this.gameState.player.clickPower;
  }

  // ==================== PASSIVE INCOME ====================

  /**
   * Increase passive income
   */
  increasePassiveIncome(amount: number): void {
    this.gameState.player.passiveIncome += amount;
  }

  /**
   * Get current passive income per second
   */
  getPassiveIncome(): number {
    return this.gameState.player.passiveIncome;
  }

  // ==================== STATISTICS ====================

  /**
   * Get player statistics
   */
  getStatistics(): PlayerState {
    return { ...this.gameState.player };
  }
}
