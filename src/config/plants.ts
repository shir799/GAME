/**
 * Plant configurations
 */

import type { PlantConfig } from '@types';
import { PlantQuality } from '@types';

export const PLANT_CONFIGS: PlantConfig[] = [
  {
    id: 'basic_strain',
    name: 'Basic Strain',
    description: 'A simple, fast-growing strain perfect for beginners.',
    baseGrowTime: 180, // 3 minutes
    baseCannabisYield: 5,
    baseMoneyValue: 25,
    unlockLevel: 1,
    baseCost: 10,
    qualityMultiplier: {
      [PlantQuality.LOW]: 0.8,
      [PlantQuality.MEDIUM]: 1.0,
      [PlantQuality.HIGH]: 1.5,
      [PlantQuality.PREMIUM]: 2.0,
    },
  },
  {
    id: 'northern_lights',
    name: 'Northern Lights',
    description: 'A legendary indica strain with relaxing effects.',
    baseGrowTime: 300, // 5 minutes
    baseCannabisYield: 10,
    baseMoneyValue: 50,
    unlockLevel: 3,
    baseCost: 50,
    qualityMultiplier: {
      [PlantQuality.LOW]: 0.8,
      [PlantQuality.MEDIUM]: 1.0,
      [PlantQuality.HIGH]: 1.5,
      [PlantQuality.PREMIUM]: 2.5,
    },
  },
  {
    id: 'sour_diesel',
    name: 'Sour Diesel',
    description: 'An energizing sativa strain with a pungent aroma.',
    baseGrowTime: 420, // 7 minutes
    baseCannabisYield: 15,
    baseMoneyValue: 100,
    unlockLevel: 5,
    baseCost: 100,
    qualityMultiplier: {
      [PlantQuality.LOW]: 0.8,
      [PlantQuality.MEDIUM]: 1.0,
      [PlantQuality.HIGH]: 1.6,
      [PlantQuality.PREMIUM]: 3.0,
    },
  },
  {
    id: 'og_kush',
    name: 'OG Kush',
    description: 'A California classic with complex flavors.',
    baseGrowTime: 600, // 10 minutes
    baseCannabisYield: 25,
    baseMoneyValue: 200,
    unlockLevel: 8,
    baseCost: 200,
    qualityMultiplier: {
      [PlantQuality.LOW]: 0.9,
      [PlantQuality.MEDIUM]: 1.0,
      [PlantQuality.HIGH]: 1.8,
      [PlantQuality.PREMIUM]: 3.5,
    },
  },
  {
    id: 'white_widow',
    name: 'White Widow',
    description: 'A potent hybrid with high resin production.',
    baseGrowTime: 900, // 15 minutes
    baseCannabisYield: 40,
    baseMoneyValue: 400,
    unlockLevel: 12,
    baseCost: 400,
    qualityMultiplier: {
      [PlantQuality.LOW]: 0.9,
      [PlantQuality.MEDIUM]: 1.0,
      [PlantQuality.HIGH]: 2.0,
      [PlantQuality.PREMIUM]: 4.0,
    },
  },
  {
    id: 'gorilla_glue',
    name: 'Gorilla Glue',
    description: 'An extremely potent hybrid with massive yields.',
    baseGrowTime: 1200, // 20 minutes
    baseCannabisYield: 60,
    baseMoneyValue: 800,
    unlockLevel: 15,
    baseCost: 800,
    qualityMultiplier: {
      [PlantQuality.LOW]: 1.0,
      [PlantQuality.MEDIUM]: 1.2,
      [PlantQuality.HIGH]: 2.2,
      [PlantQuality.PREMIUM]: 5.0,
    },
  },
  {
    id: 'purple_haze',
    name: 'Purple Haze',
    description: 'A legendary sativa made famous by Jimi Hendrix.',
    baseGrowTime: 1800, // 30 minutes
    baseCannabisYield: 100,
    baseMoneyValue: 1500,
    unlockLevel: 20,
    baseCost: 1500,
    qualityMultiplier: {
      [PlantQuality.LOW]: 1.0,
      [PlantQuality.MEDIUM]: 1.5,
      [PlantQuality.HIGH]: 2.5,
      [PlantQuality.PREMIUM]: 6.0,
    },
  },
  {
    id: 'wedding_cake',
    name: 'Wedding Cake',
    description: 'A premium strain with exceptional bag appeal.',
    baseGrowTime: 3600, // 1 hour
    baseCannabisYield: 200,
    baseMoneyValue: 3000,
    unlockLevel: 25,
    baseCost: 3000,
    qualityMultiplier: {
      [PlantQuality.LOW]: 1.2,
      [PlantQuality.MEDIUM]: 1.5,
      [PlantQuality.HIGH]: 3.0,
      [PlantQuality.PREMIUM]: 8.0,
    },
  },
];
