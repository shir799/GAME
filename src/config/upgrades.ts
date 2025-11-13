/**
 * Upgrade configurations
 */

import type { UpgradeConfig } from '@types';
import { UpgradeCategory } from '@types';

export const UPGRADE_CONFIGS: UpgradeConfig[] = [
  // ==================== CLICK POWER ====================
  {
    id: 'better_hands',
    name: 'Better Hands',
    description: 'Improve your clicking power.',
    category: UpgradeCategory.CLICK_POWER,
    baseCost: 50,
    costMultiplier: 1.5,
    maxLevel: 20,
    effect: {
      type: 'additive',
      value: 1,
      target: 'clickPower',
    },
    unlockLevel: 1,
  },
  {
    id: 'gloves',
    name: 'Professional Gloves',
    description: 'Work faster and more efficiently.',
    category: UpgradeCategory.CLICK_POWER,
    baseCost: 200,
    costMultiplier: 1.8,
    maxLevel: 10,
    effect: {
      type: 'multiplicative',
      value: 1.25,
      target: 'clickPower',
    },
    unlockLevel: 3,
  },

  // ==================== GROWTH SPEED ====================
  {
    id: 'better_soil',
    name: 'Better Soil',
    description: 'Plants grow 10% faster.',
    category: UpgradeCategory.GROWTH_SPEED,
    baseCost: 100,
    costMultiplier: 1.6,
    maxLevel: 15,
    effect: {
      type: 'multiplicative',
      value: 1.1,
      target: 'growthSpeed',
    },
    unlockLevel: 2,
  },
  {
    id: 'grow_lights',
    name: 'LED Grow Lights',
    description: 'Professional lighting increases growth speed by 25%.',
    category: UpgradeCategory.GROWTH_SPEED,
    baseCost: 500,
    costMultiplier: 2.0,
    maxLevel: 5,
    effect: {
      type: 'multiplicative',
      value: 1.25,
      target: 'growthSpeed',
    },
    unlockLevel: 5,
  },
  {
    id: 'hydroponics',
    name: 'Hydroponic System',
    description: 'Advanced growing system doubles growth speed!',
    category: UpgradeCategory.GROWTH_SPEED,
    baseCost: 5000,
    costMultiplier: 2.5,
    maxLevel: 1,
    effect: {
      type: 'multiplicative',
      value: 2.0,
      target: 'growthSpeed',
    },
    unlockLevel: 10,
  },

  // ==================== YIELD ====================
  {
    id: 'fertilizer',
    name: 'Premium Fertilizer',
    description: 'Increase yield by 15%.',
    category: UpgradeCategory.YIELD,
    baseCost: 150,
    costMultiplier: 1.7,
    maxLevel: 10,
    effect: {
      type: 'multiplicative',
      value: 1.15,
      target: 'yieldMultiplier',
    },
    unlockLevel: 2,
  },
  {
    id: 'nutrients',
    name: 'Advanced Nutrients',
    description: 'Professional nutrient mix increases yield by 30%.',
    category: UpgradeCategory.YIELD,
    baseCost: 800,
    costMultiplier: 2.0,
    maxLevel: 5,
    effect: {
      type: 'multiplicative',
      value: 1.3,
      target: 'yieldMultiplier',
    },
    unlockLevel: 6,
  },

  // ==================== QUALITY ====================
  {
    id: 'quality_control',
    name: 'Quality Control',
    description: 'Increase chance of higher quality plants.',
    category: UpgradeCategory.QUALITY,
    baseCost: 300,
    costMultiplier: 1.8,
    maxLevel: 10,
    effect: {
      type: 'additive',
      value: 0.05,
      target: 'qualityChance',
    },
    unlockLevel: 4,
  },

  // ==================== AUTOMATION ====================
  {
    id: 'auto_water',
    name: 'Auto-Watering System',
    description: 'Automatically water plants.',
    category: UpgradeCategory.AUTOMATION,
    baseCost: 1000,
    costMultiplier: 1.0,
    maxLevel: 1,
    effect: {
      type: 'unlock',
      value: 1,
      target: 'autoWater',
    },
    unlockLevel: 7,
  },
  {
    id: 'auto_harvest',
    name: 'Auto-Harvest',
    description: 'Automatically harvest ready plants.',
    category: UpgradeCategory.AUTOMATION,
    baseCost: 5000,
    costMultiplier: 1.0,
    maxLevel: 1,
    effect: {
      type: 'unlock',
      value: 1,
      target: 'autoHarvest',
    },
    unlockLevel: 10,
  },
  {
    id: 'passive_income_1',
    name: 'Delivery Service',
    description: 'Earn $1 per second passively.',
    category: UpgradeCategory.AUTOMATION,
    baseCost: 2000,
    costMultiplier: 1.8,
    maxLevel: 10,
    effect: {
      type: 'additive',
      value: 1,
      target: 'passiveIncome',
    },
    unlockLevel: 8,
  },

  // ==================== STORAGE ====================
  {
    id: 'storage_upgrade',
    name: 'Storage Expansion',
    description: 'Increase storage capacity.',
    category: UpgradeCategory.STORAGE,
    baseCost: 500,
    costMultiplier: 1.5,
    maxLevel: 5,
    effect: {
      type: 'additive',
      value: 100,
      target: 'maxStorage',
    },
    unlockLevel: 5,
  },

  // ==================== SECURITY ====================
  {
    id: 'security_camera',
    name: 'Security Cameras',
    description: 'Reduce police heat gain by 20%.',
    category: UpgradeCategory.SECURITY,
    baseCost: 1000,
    costMultiplier: 1.5,
    maxLevel: 5,
    effect: {
      type: 'multiplicative',
      value: 0.8,
      target: 'heatGain',
    },
    unlockLevel: 6,
  },
  {
    id: 'fake_business',
    name: 'Front Business',
    description: 'Reduce police heat by 50%.',
    category: UpgradeCategory.SECURITY,
    baseCost: 10000,
    costMultiplier: 1.0,
    maxLevel: 1,
    effect: {
      type: 'multiplicative',
      value: 0.5,
      target: 'heatGain',
    },
    unlockLevel: 15,
  },
  {
    id: 'lawyer',
    name: 'Lawyer on Retainer',
    description: 'Reduce raid losses by 50%.',
    category: UpgradeCategory.SECURITY,
    baseCost: 15000,
    costMultiplier: 1.0,
    maxLevel: 1,
    effect: {
      type: 'multiplicative',
      value: 0.5,
      target: 'raidLoss',
    },
    unlockLevel: 18,
  },
];
