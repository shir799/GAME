/**
 * Quest configurations
 */

import type { QuestConfig } from '@types';
import { QuestType } from '@types';

export const QUEST_CONFIGS: QuestConfig[] = [
  // ==================== TUTORIAL QUESTS ====================
  {
    id: 'first_plant',
    name: 'Green Thumb',
    description: 'Plant your first seed.',
    type: QuestType.GROW_PLANTS,
    target: 1,
    rewards: [
      { type: 'money', value: 50 },
      { type: 'experience', value: 20 },
    ],
    unlockLevel: 1,
    isRepeatable: false,
  },
  {
    id: 'first_harvest',
    name: 'First Harvest',
    description: 'Harvest your first plant.',
    type: QuestType.HARVEST,
    target: 1,
    rewards: [
      { type: 'money', value: 100 },
      { type: 'experience', value: 50 },
    ],
    unlockLevel: 1,
    isRepeatable: false,
  },
  {
    id: 'earn_first_100',
    name: 'Making Money',
    description: 'Earn your first $100.',
    type: QuestType.EARN_MONEY,
    target: 100,
    rewards: [
      { type: 'money', value: 50 },
      { type: 'experience', value: 30 },
    ],
    unlockLevel: 1,
    isRepeatable: false,
  },

  // ==================== EARLY GAME QUESTS ====================
  {
    id: 'harvest_5_plants',
    name: 'Budding Entrepreneur',
    description: 'Harvest 5 plants.',
    type: QuestType.HARVEST,
    target: 5,
    rewards: [
      { type: 'money', value: 200 },
      { type: 'experience', value: 100 },
    ],
    unlockLevel: 2,
    isRepeatable: false,
  },
  {
    id: 'reach_level_3',
    name: 'Growing Skills',
    description: 'Reach level 3.',
    type: QuestType.REACH_LEVEL,
    target: 3,
    rewards: [
      { type: 'money', value: 300 },
      { type: 'reputation', value: 10 },
    ],
    unlockLevel: 1,
    isRepeatable: false,
  },
  {
    id: 'purchase_upgrade',
    name: 'Self Improvement',
    description: 'Purchase your first upgrade.',
    type: QuestType.UPGRADE,
    target: 1,
    rewards: [
      { type: 'money', value: 150 },
      { type: 'experience', value: 75 },
    ],
    unlockLevel: 2,
    isRepeatable: false,
  },

  // ==================== MID GAME QUESTS ====================
  {
    id: 'harvest_25_plants',
    name: 'Experienced Grower',
    description: 'Harvest 25 plants.',
    type: QuestType.HARVEST,
    target: 25,
    rewards: [
      { type: 'money', value: 1000 },
      { type: 'experience', value: 500 },
      { type: 'reputation', value: 20 },
    ],
    unlockLevel: 5,
    isRepeatable: false,
  },
  {
    id: 'earn_5000',
    name: 'Big Money',
    description: 'Earn $5,000 total.',
    type: QuestType.EARN_MONEY,
    target: 5000,
    rewards: [
      { type: 'money', value: 1000 },
      { type: 'experience', value: 300 },
    ],
    unlockLevel: 5,
    isRepeatable: false,
  },
  {
    id: 'reach_level_10',
    name: 'Expert Status',
    description: 'Reach level 10.',
    type: QuestType.REACH_LEVEL,
    target: 10,
    rewards: [
      { type: 'money', value: 2000 },
      { type: 'reputation', value: 50 },
    ],
    unlockLevel: 5,
    isRepeatable: false,
  },

  // ==================== REPEATABLE QUESTS ====================
  {
    id: 'daily_harvest',
    name: 'Daily Harvest',
    description: 'Harvest 10 plants.',
    type: QuestType.HARVEST,
    target: 10,
    rewards: [
      { type: 'money', value: 500 },
      { type: 'experience', value: 200 },
    ],
    unlockLevel: 3,
    isRepeatable: true,
    cooldown: 86400, // 24 hours
  },
  {
    id: 'daily_income',
    name: 'Daily Earnings',
    description: 'Earn $1,000.',
    type: QuestType.EARN_MONEY,
    target: 1000,
    rewards: [
      { type: 'money', value: 200 },
      { type: 'experience', value: 100 },
    ],
    unlockLevel: 5,
    isRepeatable: true,
    cooldown: 86400, // 24 hours
  },

  // ==================== LATE GAME QUESTS ====================
  {
    id: 'harvest_100_plants',
    name: 'Master Grower',
    description: 'Harvest 100 plants.',
    type: QuestType.HARVEST,
    target: 100,
    rewards: [
      { type: 'money', value: 5000 },
      { type: 'experience', value: 2000 },
      { type: 'reputation', value: 100 },
    ],
    unlockLevel: 10,
    isRepeatable: false,
  },
  {
    id: 'earn_50000',
    name: 'Cannabis Tycoon',
    description: 'Earn $50,000 total.',
    type: QuestType.EARN_MONEY,
    target: 50000,
    rewards: [
      { type: 'money', value: 10000 },
      { type: 'experience', value: 3000 },
      { type: 'reputation', value: 150 },
    ],
    unlockLevel: 12,
    isRepeatable: false,
  },
  {
    id: 'survive_first_raid',
    name: 'Close Call',
    description: 'Survive a police raid.',
    type: QuestType.SURVIVE_RAID,
    target: 1,
    rewards: [
      { type: 'money', value: 1000 },
      { type: 'experience', value: 500 },
      { type: 'reputation', value: 50 },
    ],
    unlockLevel: 8,
    isRepeatable: false,
  },
  {
    id: 'reach_level_25',
    name: 'Legendary Status',
    description: 'Reach level 25.',
    type: QuestType.REACH_LEVEL,
    target: 25,
    rewards: [
      { type: 'money', value: 25000 },
      { type: 'reputation', value: 500 },
    ],
    unlockLevel: 15,
    isRepeatable: false,
  },
];
