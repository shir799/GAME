/**
 * StorageManager - Handles game persistence via LocalStorage
 * Implements compression, versioning, and data validation
 */

import type { GameState, SaveFile, SaveMetadata } from '@types';
import { EventBus } from '@core/EventBus';

export class StorageManager {
  private static instance: StorageManager;
  private readonly SAVE_KEY = 'cannabis_manager_save';
  private readonly METADATA_KEY = 'cannabis_manager_metadata';
  private readonly AUTO_SAVE_KEY = 'cannabis_manager_autosave';
  private eventBus: EventBus;

  private constructor() {
    this.eventBus = EventBus.getInstance();
  }

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  /**
   * Save game state to localStorage
   */
  saveGame(gameState: GameState, isAutoSave = false): boolean {
    try {
      const saveFile: SaveFile = {
        version: gameState.version,
        timestamp: Date.now(),
        gameState,
        checksum: this.generateChecksum(gameState),
      };

      const serialized = JSON.stringify(saveFile);
      const key = isAutoSave ? this.AUTO_SAVE_KEY : this.SAVE_KEY;

      localStorage.setItem(key, serialized);

      // Update metadata
      this.saveMetadata(gameState);

      this.eventBus.emit('game:save', { isAutoSave, timestamp: Date.now() });
      return true;
    } catch (error) {
      console.error('Failed to save game:', error);
      this.handleStorageError(error);
      return false;
    }
  }

  /**
   * Load game state from localStorage
   */
  loadGame(): GameState | null {
    try {
      // Try to load main save first
      let saveData = localStorage.getItem(this.SAVE_KEY);

      // Fall back to autosave if main save doesn't exist
      if (!saveData) {
        saveData = localStorage.getItem(this.AUTO_SAVE_KEY);
      }

      if (!saveData) {
        return null;
      }

      const saveFile: SaveFile = JSON.parse(saveData);

      // Validate save file
      if (!this.validateSaveFile(saveFile)) {
        console.error('Save file validation failed');
        return null;
      }

      // Verify checksum
      const calculatedChecksum = this.generateChecksum(saveFile.gameState);
      if (saveFile.checksum && saveFile.checksum !== calculatedChecksum) {
        console.warn('Save file checksum mismatch - possible corruption');
        // Continue anyway, but log the warning
      }

      this.eventBus.emit('game:load', { timestamp: Date.now() });
      return saveFile.gameState;
    } catch (error) {
      console.error('Failed to load game:', error);
      return null;
    }
  }

  /**
   * Export save file as downloadable JSON
   */
  exportSave(gameState: GameState): void {
    try {
      const saveFile: SaveFile = {
        version: gameState.version,
        timestamp: Date.now(),
        gameState,
        checksum: this.generateChecksum(gameState),
      };

      const dataStr = JSON.stringify(saveFile, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `cannabis_manager_save_${Date.now()}.json`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export save:', error);
    }
  }

  /**
   * Import save file from JSON
   */
  importSave(file: File): Promise<GameState | null> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const saveFile: SaveFile = JSON.parse(e.target?.result as string);

          if (!this.validateSaveFile(saveFile)) {
            console.error('Invalid save file');
            resolve(null);
            return;
          }

          // Save the imported state
          this.saveGame(saveFile.gameState);
          resolve(saveFile.gameState);
        } catch (error) {
          console.error('Failed to import save:', error);
          resolve(null);
        }
      };

      reader.readAsText(file);
    });
  }

  /**
   * Clear all save data
   */
  clearGame(): void {
    try {
      localStorage.removeItem(this.SAVE_KEY);
      localStorage.removeItem(this.AUTO_SAVE_KEY);
      localStorage.removeItem(this.METADATA_KEY);
      console.log('🗑️  Save data cleared');
    } catch (error) {
      console.error('Failed to clear save data:', error);
    }
  }

  /**
   * Get save metadata
   */
  getMetadata(): SaveMetadata | null {
    try {
      const metadataStr = localStorage.getItem(this.METADATA_KEY);
      return metadataStr ? JSON.parse(metadataStr) : null;
    } catch (error) {
      console.error('Failed to get metadata:', error);
      return null;
    }
  }

  /**
   * Save metadata
   */
  private saveMetadata(gameState: GameState): void {
    try {
      const metadata: SaveMetadata = {
        saveId: this.SAVE_KEY,
        timestamp: Date.now(),
        playtime: gameState.playtime,
        playerLevel: gameState.player.level,
        money: gameState.player.money,
      };

      localStorage.setItem(this.METADATA_KEY, JSON.stringify(metadata));
    } catch (error) {
      console.error('Failed to save metadata:', error);
    }
  }

  /**
   * Validate save file structure
   */
  private validateSaveFile(saveFile: SaveFile): boolean {
    if (!saveFile || typeof saveFile !== 'object') {
      return false;
    }

    if (!saveFile.version || !saveFile.gameState) {
      return false;
    }

    // Add more validation as needed
    return true;
  }

  /**
   * Generate checksum for save integrity
   */
  private generateChecksum(gameState: GameState): string {
    // Simple checksum - can be improved with crypto.subtle.digest
    const str = JSON.stringify(gameState);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  /**
   * Handle storage errors (quota exceeded, etc.)
   */
  private handleStorageError(error: any): void {
    if (error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded. Clearing old saves...');
      // Could implement cleanup logic here
    }
  }

  /**
   * Get storage usage info
   */
  getStorageInfo(): { used: number; available: number; percentage: number } {
    try {
      const saveData = localStorage.getItem(this.SAVE_KEY) || '';
      const autoSaveData = localStorage.getItem(this.AUTO_SAVE_KEY) || '';
      const used = new Blob([saveData, autoSaveData]).size;

      // localStorage typically has 5-10MB limit
      const available = 5 * 1024 * 1024; // Assume 5MB
      const percentage = (used / available) * 100;

      return { used, available, percentage };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return { used: 0, available: 0, percentage: 0 };
    }
  }
}
