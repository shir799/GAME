/**
 * Validation utilities
 */

import type { GameState, SaveFile } from '@types';

/**
 * Validate game state structure
 */
export function validateGameState(state: any): state is GameState {
  if (!state || typeof state !== 'object') return false;

  // Check required top-level properties
  const requiredProps = ['player', 'plots', 'upgrades', 'quests', 'police', 'statistics', 'settings', 'version'];
  for (const prop of requiredProps) {
    if (!(prop in state)) return false;
  }

  // Validate player
  if (!validatePlayer(state.player)) return false;

  // Validate plots
  if (!Array.isArray(state.plots)) return false;

  // Validate police
  if (!validatePolice(state.police)) return false;

  return true;
}

/**
 * Validate player state
 */
function validatePlayer(player: any): boolean {
  if (!player || typeof player !== 'object') return false;

  const requiredProps = [
    'money',
    'cannabis',
    'reputation',
    'level',
    'experience',
    'experienceToNextLevel',
    'totalEarnings',
    'totalHarvests',
    'clickPower',
    'passiveIncome',
  ];

  for (const prop of requiredProps) {
    if (!(prop in player) || typeof player[prop] !== 'number') return false;
  }

  return true;
}

/**
 * Validate police state
 */
function validatePolice(police: any): boolean {
  if (!police || typeof police !== 'object') return false;

  const requiredProps = ['heatLevel', 'lastRaid', 'totalRaids', 'successfulEscapes', 'bribesUsed', 'events'];

  for (const prop of requiredProps) {
    if (!(prop in police)) return false;
  }

  if (!Array.isArray(police.events)) return false;

  return true;
}

/**
 * Validate save file
 */
export function validateSaveFile(saveFile: any): saveFile is SaveFile {
  if (!saveFile || typeof saveFile !== 'object') return false;

  if (!saveFile.version || typeof saveFile.version !== 'string') return false;
  if (!saveFile.timestamp || typeof saveFile.timestamp !== 'number') return false;
  if (!saveFile.gameState) return false;

  return validateGameState(saveFile.gameState);
}

/**
 * Sanitize player input (for security)
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim();
}

/**
 * Validate number is positive
 */
export function isPositiveNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}

/**
 * Validate number is within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
}

/**
 * Check if value is a valid timestamp
 */
export function isValidTimestamp(value: any): boolean {
  return typeof value === 'number' && value > 0 && value <= Date.now() + 86400000; // Allow up to 1 day in future
}
