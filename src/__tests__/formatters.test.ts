/**
 * Unit tests for formatters
 */

import { describe, it, expect } from 'vitest';
import { formatMoney, formatNumber, formatTime, formatPercentage } from '@utils/formatters';

describe('Formatters', () => {
  describe('formatMoney', () => {
    it('should format small amounts with 2 decimals', () => {
      expect(formatMoney(10.5)).toBe('$10.50');
      expect(formatMoney(999.99)).toBe('$999.99');
    });

    it('should format thousands with K suffix', () => {
      expect(formatMoney(1000)).toBe('$1.00K');
      expect(formatMoney(5500)).toBe('$5.50K');
    });

    it('should format millions with M suffix', () => {
      expect(formatMoney(1_000_000)).toBe('$1.00M');
      expect(formatMoney(5_500_000)).toBe('$5.50M');
    });

    it('should format billions with B suffix', () => {
      expect(formatMoney(1_000_000_000)).toBe('$1.00B');
      expect(formatMoney(5_500_000_000)).toBe('$5.50B');
    });
  });

  describe('formatNumber', () => {
    it('should format small numbers with decimals', () => {
      expect(formatNumber(10.5)).toBe('10.5');
      expect(formatNumber(999.9)).toBe('999.9');
    });

    it('should format thousands with K suffix', () => {
      expect(formatNumber(1000)).toBe('1.0K');
      expect(formatNumber(5500)).toBe('5.5K');
    });

    it('should format millions with M suffix', () => {
      expect(formatNumber(1_000_000)).toBe('1.0M');
    });

    it('should respect decimal places parameter', () => {
      expect(formatNumber(1234, 2)).toBe('1.23K');
      expect(formatNumber(1234, 0)).toBe('1K');
    });
  });

  describe('formatTime', () => {
    it('should format seconds', () => {
      expect(formatTime(30)).toBe('30s');
      expect(formatTime(59)).toBe('59s');
    });

    it('should format minutes and seconds', () => {
      expect(formatTime(60)).toBe('1m 0s');
      expect(formatTime(125)).toBe('2m 5s');
    });

    it('should format hours and minutes', () => {
      expect(formatTime(3600)).toBe('1h 0m');
      expect(formatTime(7325)).toBe('2h 2m');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage without decimals', () => {
      expect(formatPercentage(50)).toBe('50%');
      expect(formatPercentage(75.5)).toBe('76%');
    });

    it('should format percentage with decimals', () => {
      expect(formatPercentage(75.5, 1)).toBe('75.5%');
      expect(formatPercentage(33.333, 2)).toBe('33.33%');
    });
  });
});
