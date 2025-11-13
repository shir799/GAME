/**
 * Default game state and configuration values
 */

import type { GameState, PlotState } from '@types';

const GAME_VERSION = '1.0.0';

/**
 * Create default game state
 */
export function createDefaultGameState(): GameState {
  return {
    player: {
      money: 100,
      cannabis: 0,
      reputation: 0,
      level: 1,
      experience: 0,
      experienceToNextLevel: 100,
      totalEarnings: 0,
      totalHarvests: 0,
      clickPower: 1,
      passiveIncome: 0,
    },
    plots: createDefaultPlots(),
    upgrades: {},
    quests: {},
    police: {
      heatLevel: 0,
      lastRaid: 0,
      totalRaids: 0,
      successfulEscapes: 0,
      bribesUsed: 0,
      events: [],
    },
    statistics: {
      totalClicks: 0,
      totalPlantedSeeds: 0,
      totalHarvests: 0,
      totalMoneyEarned: 0,
      totalMoneySpent: 0,
      totalCannabisGrown: 0,
      totalPlayTime: 0,
      totalRaids: 0,
      raidsEscaped: 0,
      raidsCaught: 0,
      totalBribesPaid: 0,
      questsCompleted: 0,
      upgradesPurchased: 0,
      prestigeLevel: 0,
      prestigePoints: 0,
    },
    settings: {
      autoSaveInterval: 60, // seconds
      showNotifications: true,
      soundEnabled: true,
      musicEnabled: false,
      showTutorial: true,
      qualitySettings: 'high',
    },
    version: GAME_VERSION,
    lastSaved: Date.now(),
    lastPlayed: Date.now(),
    playtime: 0,
  };
}

/**
 * Create default plots
 */
function createDefaultPlots(): PlotState[] {
  const plots: PlotState[] = [];

  for (let i = 0; i < 12; i++) {
    plots.push({
      plotId: i,
      isUnlocked: i < 4, // First 4 plots unlocked by default
      plant: null,
      lastWatered: 0,
      lastFertilized: 0,
    });
  }

  return plots;
}

/**
 * Game balance constants
 */
export const BALANCE = {
  // Click mechanics
  BASE_CLICK_POWER: 1,
  CLICK_POWER_UPGRADE_MULTIPLIER: 1.5,

  // Growth
  BASE_GROWTH_TIME: 300, // 5 minutes in seconds
  WATER_GROWTH_BONUS: 1.2, // 20% faster
  FERTILIZER_GROWTH_BONUS: 1.5, // 50% faster

  // Economy
  CANNABIS_BASE_PRICE: 10, // $ per gram
  PLOT_UNLOCK_BASE_COST: 100,
  PLOT_UNLOCK_COST_MULTIPLIER: 1.5,

  // Police
  HEAT_INCREASE_PER_HARVEST: 2,
  HEAT_DECREASE_PER_SECOND: 0.1,
  MAX_RAID_INTERVAL: 600, // 10 minutes
  MIN_RAID_INTERVAL: 180, // 3 minutes

  // Offline progress
  MAX_OFFLINE_TIME: 28800, // 8 hours in seconds
  OFFLINE_EFFICIENCY: 0.5, // 50% of normal rate

  // Leveling
  XP_BASE: 100,
  XP_MULTIPLIER: 1.5,
  XP_PER_HARVEST: 10,
  XP_PER_DOLLAR: 0.1,
};
