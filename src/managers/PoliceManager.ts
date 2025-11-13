/**
 * PoliceManager - Manages police heat, raids, and risk mechanics
 */

import type { GameState, PoliceEvent, PoliceEventType } from '@types';
import { EventBus } from '@core/EventBus';

export class PoliceManager {
  private gameState: GameState;
  private eventBus: EventBus;
  private timeSinceLastRaidCheck = 0;
  private readonly RAID_CHECK_INTERVAL = 60; // Check every 60 seconds

  constructor(gameState: GameState) {
    this.gameState = gameState;
    this.eventBus = EventBus.getInstance();
  }

  initialize(gameState: GameState): void {
    this.gameState = gameState;
  }

  update(deltaTime: number): void {
    // Gradually decrease heat level over time
    this.decreaseHeat(deltaTime * 0.1); // 0.1 heat per second

    // Check for random raids
    this.timeSinceLastRaidCheck += deltaTime;
    if (this.timeSinceLastRaidCheck >= this.RAID_CHECK_INTERVAL) {
      this.checkForRaid();
      this.timeSinceLastRaidCheck = 0;
    }
  }

  /**
   * Increase police heat
   */
  increaseHeat(amount: number): void {
    const oldHeat = this.gameState.police.heatLevel;
    this.gameState.police.heatLevel += amount;
    this.gameState.police.heatLevel = Math.min(this.gameState.police.heatLevel, 100);

    this.eventBus.emit('police:heat_change', {
      old: oldHeat,
      new: this.gameState.police.heatLevel,
      delta: amount,
    });

    // Show warning if heat is high
    if (this.gameState.police.heatLevel >= 80) {
      console.warn('🚨 High police heat! Risk of raid is imminent!');
    }
  }

  /**
   * Decrease police heat
   */
  decreaseHeat(amount: number): void {
    const oldHeat = this.gameState.police.heatLevel;
    this.gameState.police.heatLevel -= amount;
    this.gameState.police.heatLevel = Math.max(this.gameState.police.heatLevel, 0);

    if (oldHeat !== this.gameState.police.heatLevel) {
      this.eventBus.emit('police:heat_change', {
        old: oldHeat,
        new: this.gameState.police.heatLevel,
        delta: -amount,
      });
    }
  }

  /**
   * Check for random raid based on heat level
   */
  private checkForRaid(): void {
    const heatLevel = this.gameState.police.heatLevel;

    // Calculate raid chance based on heat (0-5% at max heat)
    const raidChance = (heatLevel / 100) * 0.05;

    if (Math.random() < raidChance) {
      this.triggerRaid();
    }
  }

  /**
   * Trigger a police raid
   */
  triggerRaid(): void {
    const severity = Math.random() * this.gameState.police.heatLevel;

    console.warn('🚨 POLICE RAID!');

    // Determine outcome
    const escapeChance = 0.5 - this.gameState.police.heatLevel / 200; // Lower chance at high heat
    const outcome = Math.random() < escapeChance ? 'escaped' : 'caught';

    const event: PoliceEvent = {
      type: 'raid',
      timestamp: Date.now(),
      severity,
      outcome,
      loss: outcome === 'caught' ? this.calculateRaidLoss(severity) : undefined,
    };

    // Apply losses if caught
    if (outcome === 'caught' && event.loss) {
      this.applyRaidLoss(event.loss);
    } else {
      this.gameState.police.successfulEscapes += 1;
    }

    // Record event
    this.gameState.police.events.push(event);
    this.gameState.police.totalRaids += 1;
    this.gameState.police.lastRaid = Date.now();

    // Reduce heat after raid
    this.decreaseHeat(30);

    this.eventBus.emit('police:raid', event);
  }

  /**
   * Calculate losses from a raid
   */
  private calculateRaidLoss(severity: number): {
    money?: number;
    cannabis?: number;
    plants?: number;
  } {
    const moneyLoss = Math.floor((this.gameState.player.money * severity) / 100);
    const cannabisLoss = Math.floor((this.gameState.player.cannabis * severity) / 100);
    const plantsLoss = Math.floor((severity / 100) * this.getActivePlantCount());

    return {
      money: moneyLoss,
      cannabis: cannabisLoss,
      plants: plantsLoss,
    };
  }

  /**
   * Apply raid losses to game state
   */
  private applyRaidLoss(loss: { money?: number; cannabis?: number; plants?: number }): void {
    if (loss.money) {
      this.gameState.player.money = Math.max(0, this.gameState.player.money - loss.money);
    }

    if (loss.cannabis) {
      this.gameState.player.cannabis = Math.max(
        0,
        this.gameState.player.cannabis - loss.cannabis
      );
    }

    if (loss.plants) {
      this.confiscatePlants(loss.plants);
    }
  }

  /**
   * Confiscate random plants
   */
  private confiscatePlants(count: number): void {
    const activePlots = this.gameState.plots.filter((plot) => plot.plant !== null);

    for (let i = 0; i < Math.min(count, activePlots.length); i++) {
      const randomPlot = activePlots[Math.floor(Math.random() * activePlots.length)];
      randomPlot.plant = null;
    }
  }

  /**
   * Bribe police to reduce heat
   */
  bribe(amount: number): boolean {
    if (this.gameState.player.money < amount) return false;

    this.gameState.player.money -= amount;

    // Reduce heat based on bribe amount
    const heatReduction = Math.min(50, (amount / 1000) * 10);
    this.decreaseHeat(heatReduction);

    this.gameState.police.bribesUsed += 1;

    return true;
  }

  /**
   * Get current heat level
   */
  getHeatLevel(): number {
    return this.gameState.police.heatLevel;
  }

  /**
   * Get raid history
   */
  getRaidHistory(): PoliceEvent[] {
    return this.gameState.police.events.filter((event) => event.type === 'raid');
  }

  /**
   * Get count of active plants
   */
  private getActivePlantCount(): number {
    return this.gameState.plots.filter((plot) => plot.plant !== null).length;
  }

  /**
   * Trigger inspection (less severe than raid)
   */
  triggerInspection(): void {
    const severity = Math.random() * 50;

    const event: PoliceEvent = {
      type: 'inspection',
      timestamp: Date.now(),
      severity,
      outcome: 'escaped',
    };

    this.gameState.police.events.push(event);
    this.increaseHeat(10); // Inspections increase future heat

    this.eventBus.emit('police:inspection', event);
  }
}
