/**
 * Unit tests for ResourceManager
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ResourceManager } from '@managers/ResourceManager';
import { createDefaultGameState } from '@config/defaults';
import type { GameState } from '@types';

describe('ResourceManager', () => {
  let gameState: GameState;
  let resourceManager: ResourceManager;

  beforeEach(() => {
    gameState = createDefaultGameState();
    resourceManager = new ResourceManager(gameState);
  });

  describe('Money Management', () => {
    it('should add money correctly', () => {
      const initialMoney = gameState.player.money;
      resourceManager.addMoney(100);

      expect(gameState.player.money).toBe(initialMoney + 100);
      expect(gameState.player.totalEarnings).toBe(100);
    });

    it('should not add negative money', () => {
      const initialMoney = gameState.player.money;
      resourceManager.addMoney(-50);

      expect(gameState.player.money).toBe(initialMoney);
    });

    it('should spend money when affordable', () => {
      gameState.player.money = 1000;
      const result = resourceManager.spendMoney(500);

      expect(result).toBe(true);
      expect(gameState.player.money).toBe(500);
      expect(gameState.statistics.totalMoneySpent).toBe(500);
    });

    it('should not spend money when unaffordable', () => {
      gameState.player.money = 100;
      const result = resourceManager.spendMoney(500);

      expect(result).toBe(false);
      expect(gameState.player.money).toBe(100);
    });

    it('should check affordability correctly', () => {
      gameState.player.money = 1000;

      expect(resourceManager.canAfford(500)).toBe(true);
      expect(resourceManager.canAfford(1000)).toBe(true);
      expect(resourceManager.canAfford(1001)).toBe(false);
    });
  });

  describe('Cannabis Management', () => {
    it('should add cannabis correctly', () => {
      resourceManager.addCannabis(50);

      expect(gameState.player.cannabis).toBe(50);
    });

    it('should remove cannabis when available', () => {
      gameState.player.cannabis = 100;
      const result = resourceManager.removeCannabis(50);

      expect(result).toBe(true);
      expect(gameState.player.cannabis).toBe(50);
    });

    it('should not remove cannabis when unavailable', () => {
      gameState.player.cannabis = 30;
      const result = resourceManager.removeCannabis(50);

      expect(result).toBe(false);
      expect(gameState.player.cannabis).toBe(30);
    });

    it('should sell cannabis for money', () => {
      gameState.player.cannabis = 100;
      gameState.player.money = 0;

      const result = resourceManager.sellCannabis(50, 10); // 50g at $10/g

      expect(result).toBe(true);
      expect(gameState.player.cannabis).toBe(50);
      expect(gameState.player.money).toBe(500);
    });
  });

  describe('Experience and Leveling', () => {
    it('should add experience correctly', () => {
      resourceManager.addExperience(50);

      expect(gameState.player.experience).toBe(50);
    });

    it('should level up when reaching XP threshold', () => {
      const initialLevel = gameState.player.level;
      const requiredXP = gameState.player.experienceToNextLevel;

      resourceManager.addExperience(requiredXP);

      expect(gameState.player.level).toBe(initialLevel + 1);
      expect(gameState.player.experience).toBe(0);
    });

    it('should handle multiple level ups', () => {
      const initialLevel = gameState.player.level;
      resourceManager.addExperience(10000); // Enough for multiple levels

      expect(gameState.player.level).toBeGreaterThan(initialLevel);
    });

    it('should calculate XP progress correctly', () => {
      gameState.player.experience = 50;
      gameState.player.experienceToNextLevel = 100;

      const progress = resourceManager.getExperienceProgress();

      expect(progress).toBe(0.5);
    });
  });

  describe('Reputation Management', () => {
    it('should add reputation correctly', () => {
      resourceManager.addReputation(25);

      expect(gameState.player.reputation).toBe(25);
    });

    it('should cap reputation at 100', () => {
      gameState.player.reputation = 90;
      resourceManager.addReputation(20);

      expect(gameState.player.reputation).toBe(100);
    });

    it('should remove reputation correctly', () => {
      gameState.player.reputation = 50;
      resourceManager.removeReputation(20);

      expect(gameState.player.reputation).toBe(30);
    });

    it('should floor reputation at 0', () => {
      gameState.player.reputation = 10;
      resourceManager.removeReputation(20);

      expect(gameState.player.reputation).toBe(0);
    });
  });

  describe('Click Power', () => {
    it('should increase click power', () => {
      const initialPower = gameState.player.clickPower;
      resourceManager.increaseClickPower(5);

      expect(gameState.player.clickPower).toBe(initialPower + 5);
    });

    it('should get current click power', () => {
      expect(resourceManager.getClickPower()).toBe(gameState.player.clickPower);
    });
  });

  describe('Passive Income', () => {
    it('should increase passive income', () => {
      const initialIncome = gameState.player.passiveIncome;
      resourceManager.increasePassiveIncome(10);

      expect(gameState.player.passiveIncome).toBe(initialIncome + 10);
    });

    it('should get current passive income', () => {
      expect(resourceManager.getPassiveIncome()).toBe(gameState.player.passiveIncome);
    });
  });
});
