/**
 * Core Type Definitions for Cannabis Manager Game
 * This file contains all TypeScript interfaces and types used throughout the game
 */

// ==================== PLAYER STATE ====================

export interface PlayerState {
  money: number;
  cannabis: number;
  reputation: number;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  totalEarnings: number;
  totalHarvests: number;
  clickPower: number;
  passiveIncome: number;
}

// ==================== PLANT SYSTEM ====================

export enum PlantGrowthStage {
  SEED = 'seed',
  SEEDLING = 'seedling',
  VEGETATIVE = 'vegetative',
  FLOWERING = 'flowering',
  READY = 'ready',
}

export enum PlantQuality {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  PREMIUM = 'premium',
}

export interface PlantConfig {
  id: string;
  name: string;
  description: string;
  baseGrowTime: number; // in seconds
  baseCannabisYield: number;
  baseMoneyValue: number;
  unlockLevel: number;
  baseCost: number;
  qualityMultiplier: Record<PlantQuality, number>;
}

export interface PlantInstance {
  id: string;
  plantConfigId: string;
  stage: PlantGrowthStage;
  quality: PlantQuality;
  plantedAt: number; // timestamp
  growthProgress: number; // 0-1
  isWatered: boolean;
  isFertilized: boolean;
  health: number; // 0-100
  yieldMultiplier: number;
}

export interface PlotState {
  plotId: number;
  isUnlocked: boolean;
  plant: PlantInstance | null;
  lastWatered: number;
  lastFertilized: number;
}

// ==================== UPGRADE SYSTEM ====================

export enum UpgradeCategory {
  CLICK_POWER = 'click_power',
  GROWTH_SPEED = 'growth_speed',
  YIELD = 'yield',
  QUALITY = 'quality',
  AUTOMATION = 'automation',
  STORAGE = 'storage',
  SECURITY = 'security',
}

export interface UpgradeConfig {
  id: string;
  name: string;
  description: string;
  category: UpgradeCategory;
  baseCost: number;
  costMultiplier: number;
  maxLevel: number;
  effect: UpgradeEffect;
  unlockLevel: number;
  requirements?: UpgradeRequirement[];
}

export interface UpgradeEffect {
  type: 'additive' | 'multiplicative' | 'unlock';
  value: number;
  target: string; // e.g., 'clickPower', 'growthSpeed', 'autoHarvest'
}

export interface UpgradeRequirement {
  type: 'level' | 'upgrade' | 'money' | 'reputation';
  value: number | string;
}

export interface UpgradeState {
  upgradeId: string;
  currentLevel: number;
  isPurchased: boolean;
  totalSpent: number;
}

// ==================== QUEST SYSTEM ====================

export enum QuestType {
  HARVEST = 'harvest',
  EARN_MONEY = 'earn_money',
  GROW_PLANTS = 'grow_plants',
  REACH_LEVEL = 'reach_level',
  UPGRADE = 'upgrade',
  SURVIVE_RAID = 'survive_raid',
}

export enum QuestStatus {
  LOCKED = 'locked',
  AVAILABLE = 'available',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CLAIMED = 'claimed',
}

export interface QuestConfig {
  id: string;
  name: string;
  description: string;
  type: QuestType;
  target: number;
  rewards: QuestReward[];
  unlockLevel: number;
  isRepeatable: boolean;
  cooldown?: number; // in seconds, for repeatable quests
}

export interface QuestReward {
  type: 'money' | 'cannabis' | 'experience' | 'reputation' | 'unlock';
  value: number | string;
}

export interface QuestState {
  questId: string;
  status: QuestStatus;
  progress: number;
  completedCount: number;
  lastCompletedAt?: number;
  nextAvailableAt?: number;
}

// ==================== POLICE/RISK SYSTEM ====================

export enum PoliceEventType {
  INSPECTION = 'inspection',
  RAID = 'raid',
  FINE = 'fine',
  CONFISCATION = 'confiscation',
}

export interface PoliceEvent {
  type: PoliceEventType;
  timestamp: number;
  severity: number; // 0-100
  outcome: 'escaped' | 'caught' | 'bribed';
  loss?: {
    money?: number;
    cannabis?: number;
    plants?: number;
  };
}

export interface PoliceState {
  heatLevel: number; // 0-100
  lastRaid: number;
  totalRaids: number;
  successfulEscapes: number;
  bribesUsed: number;
  events: PoliceEvent[];
}

// ==================== GAME STATE ====================

export interface GameState {
  player: PlayerState;
  plots: PlotState[];
  upgrades: Record<string, UpgradeState>;
  quests: Record<string, QuestState>;
  police: PoliceState;
  statistics: GameStatistics;
  settings: GameSettings;
  version: string;
  lastSaved: number;
  lastPlayed: number;
  playtime: number; // total playtime in seconds
}

export interface GameStatistics {
  totalClicks: number;
  totalPlantedSeeds: number;
  totalHarvests: number;
  totalMoneyEarned: number;
  totalMoneySpent: number;
  totalCannabisGrown: number;
  totalPlayTime: number;
  totalRaids: number;
  raidsEscaped: number;
  raidsCaught: number;
  totalBribesPaid: number;
  questsCompleted: number;
  upgradesPurchased: number;
  prestigeLevel: number;
  prestigePoints: number;
}

export interface GameSettings {
  autoSaveInterval: number; // in seconds
  showNotifications: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  showTutorial: boolean;
  qualitySettings: 'low' | 'medium' | 'high';
}

// ==================== EVENT SYSTEM ====================

export type GameEventType =
  | 'player:level_up'
  | 'player:money_change'
  | 'player:cannabis_change'
  | 'player:experience_change'
  | 'player:reputation_change'
  | 'plant:planted'
  | 'plant:harvested'
  | 'plant:stage_change'
  | 'plant:died'
  | 'upgrade:purchased'
  | 'quest:completed'
  | 'quest:progress'
  | 'police:raid'
  | 'police:inspection'
  | 'police:heat_change'
  | 'story:dialogue_start'
  | 'game:tick'
  | 'game:save'
  | 'game:load'
  | 'ui:update';

export interface GameEvent<T = any> {
  type: GameEventType;
  timestamp: number;
  data: T;
}

export type GameEventCallback<T = any> = (event: GameEvent<T>) => void;

// ==================== SAVE/LOAD SYSTEM ====================

export interface SaveFile {
  version: string;
  timestamp: number;
  gameState: GameState;
  checksum?: string; // for save integrity validation
}

export interface SaveMetadata {
  saveId: string;
  timestamp: number;
  playtime: number;
  playerLevel: number;
  money: number;
}

// ==================== TICK SYSTEM ====================

export interface TickContext {
  deltaTime: number; // time since last tick in seconds
  timestamp: number; // current timestamp
  isOffline: boolean; // true if processing offline progress
}

// ==================== UTILITY TYPES ====================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };
