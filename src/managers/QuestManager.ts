/**
 * QuestManager - Manages quests and objectives
 */

import type { GameState, QuestConfig, QuestState } from '@types';
import { QuestStatus } from '@types';
import { EventBus } from '@core/EventBus';
import { QUEST_CONFIGS } from '@config/quests';

export class QuestManager {
  private gameState: GameState;
  private eventBus: EventBus;
  private questConfigs: Map<string, QuestConfig>;

  constructor(gameState: GameState) {
    this.gameState = gameState;
    this.eventBus = EventBus.getInstance();
    this.questConfigs = new Map();
  }

  initialize(gameState: GameState): void {
    this.gameState = gameState;

    // Load quest configs
    QUEST_CONFIGS.forEach((config) => {
      this.questConfigs.set(config.id, config);

      // Initialize quest state if not exists
      if (!this.gameState.quests[config.id]) {
        this.gameState.quests[config.id] = {
          questId: config.id,
          status: config.unlockLevel <= gameState.player.level ? QuestStatus.AVAILABLE : QuestStatus.LOCKED,
          progress: 0,
          completedCount: 0,
        };
      }
    });

    // Subscribe to relevant events for quest progress
    this.setupEventListeners();
  }

  /**
   * Update quest progress
   */
  updateProgress(questId: string, amount: number): void {
    const config = this.questConfigs.get(questId);
    const state = this.gameState.quests[questId];

    if (!config || !state || state.status !== QuestStatus.IN_PROGRESS) return;

    const oldProgress = state.progress;
    state.progress += amount;

    // Check if quest is completed
    if (state.progress >= config.target && state.status === QuestStatus.IN_PROGRESS) {
      this.completeQuest(questId);
    }

    this.eventBus.emit('quest:progress', {
      questId,
      oldProgress,
      newProgress: state.progress,
      target: config.target,
    });
  }

  /**
   * Start a quest
   */
  startQuest(questId: string): boolean {
    const state = this.gameState.quests[questId];
    if (!state || state.status !== QuestStatus.AVAILABLE) return false;

    state.status = QuestStatus.IN_PROGRESS;
    state.progress = 0;

    return true;
  }

  /**
   * Complete a quest
   */
  private completeQuest(questId: string): void {
    const state = this.gameState.quests[questId];
    if (!state) return;

    state.status = QuestStatus.COMPLETED;
    state.completedCount += 1;
    state.lastCompletedAt = Date.now();

    this.eventBus.emit('quest:completed', { questId });
  }

  /**
   * Claim quest rewards
   */
  claimRewards(questId: string): boolean {
    const config = this.questConfigs.get(questId);
    const state = this.gameState.quests[questId];

    if (!config || !state || state.status !== QuestStatus.COMPLETED) return false;

    // Give rewards
    config.rewards.forEach((reward) => {
      this.applyReward(reward);
    });

    // Handle repeatable quests
    if (config.isRepeatable) {
      state.status = QuestStatus.AVAILABLE;
      state.progress = 0;

      // Apply cooldown if exists
      if (config.cooldown) {
        state.nextAvailableAt = Date.now() + config.cooldown * 1000;
      }
    } else {
      state.status = QuestStatus.CLAIMED;
    }

    return true;
  }

  /**
   * Get quest state
   */
  getQuestState(questId: string): QuestState | undefined {
    return this.gameState.quests[questId];
  }

  /**
   * Get all available quests
   */
  getAvailableQuests(): QuestConfig[] {
    return Array.from(this.questConfigs.values()).filter((config) => {
      const state = this.gameState.quests[config.id];
      return (
        state &&
        config.unlockLevel <= this.gameState.player.level &&
        (state.status === QuestStatus.AVAILABLE || state.status === QuestStatus.IN_PROGRESS)
      );
    });
  }

  /**
   * Get all quests with merged config and state data (for UI)
   */
  getAllQuestsWithConfig() {
    return Array.from(this.questConfigs.values()).map((config) => {
      const state = this.gameState.quests[config.id];
      return {
        id: config.id,
        name: config.name,
        description: config.description,
        type: config.type,
        status: state.status,
        currentProgress: state.progress,
        targetProgress: config.target,
        rewards: config.rewards,
        completed: state.status === QuestStatus.COMPLETED || state.status === QuestStatus.CLAIMED,
        isRepeatable: config.isRepeatable,
        completedCount: state.completedCount,
      };
    });
  }

  /**
   * Apply quest reward
   */
  private applyReward(reward: any): void {
    switch (reward.type) {
      case 'money':
        this.gameState.player.money += reward.value;
        break;

      case 'cannabis':
        this.gameState.player.cannabis += reward.value;
        break;

      case 'experience':
        this.gameState.player.experience += reward.value;
        break;

      case 'reputation':
        this.gameState.player.reputation += reward.value;
        break;

      case 'unlock':
        // Handle unlocks (plots, upgrades, etc.)
        break;
    }
  }

  /**
   * Setup event listeners for quest progress tracking
   */
  private setupEventListeners(): void {
    // Track harvests
    this.eventBus.on('plant:harvested', () => {
      this.updateQuestsOfType('harvest', 1);
    });

    // Track money earned
    this.eventBus.on('player:money_change', (event) => {
      if (event.data.delta > 0) {
        this.updateQuestsOfType('earn_money', event.data.delta);
      }
    });

    // Track level ups
    this.eventBus.on('player:level_up', () => {
      this.updateQuestsOfType('reach_level', 1);
      this.checkForNewQuests();
    });

    // Track upgrades
    this.eventBus.on('upgrade:purchased', () => {
      this.updateQuestsOfType('upgrade', 1);
    });

    // Track police raids
    this.eventBus.on('police:raid', (event) => {
      if (event.data.outcome === 'escaped') {
        this.updateQuestsOfType('survive_raid', 1);
      }
    });
  }

  /**
   * Update all quests of a specific type
   */
  private updateQuestsOfType(type: string, amount: number): void {
    this.questConfigs.forEach((config, questId) => {
      if (config.type === type) {
        this.updateProgress(questId, amount);
      }
    });
  }

  /**
   * Check for newly unlocked quests
   */
  private checkForNewQuests(): void {
    this.questConfigs.forEach((config, questId) => {
      const state = this.gameState.quests[questId];
      if (
        state &&
        state.status === QuestStatus.LOCKED &&
        config.unlockLevel <= this.gameState.player.level
      ) {
        state.status = QuestStatus.AVAILABLE;
      }
    });
  }
}
