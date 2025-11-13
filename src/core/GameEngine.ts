/**
 * GameEngine - Main game controller
 * Orchestrates all managers and core systems
 * Implements Singleton pattern
 */

import { EventBus } from './EventBus';
import { GameLoop } from './GameLoop';
import { StorageManager } from '@managers/StorageManager';
import { ResourceManager } from '@managers/ResourceManager';
import { FarmManager } from '@managers/FarmManager';
import { UpgradeManager } from '@managers/UpgradeManager';
import { QuestManager } from '@managers/QuestManager';
import { PoliceManager } from '@managers/PoliceManager';
import { TickManager } from '@managers/TickManager';
import { UIManager } from '@managers/UIManager';
import { StoryManager } from '@managers/StoryManager';
import type { GameState } from '@types';
import { createDefaultGameState } from '@config/defaults';

export class GameEngine {
  private static instance: GameEngine;

  // Core systems
  private eventBus: EventBus;
  private gameLoop: GameLoop;

  // Managers
  private storageManager: StorageManager;
  private resourceManager: ResourceManager;
  private farmManager: FarmManager;
  private upgradeManager: UpgradeManager;
  private questManager: QuestManager;
  private policeManager: PoliceManager;
  private tickManager: TickManager;
  private uiManager: UIManager;
  private storyManager: StoryManager;

  // Game state
  private gameState: GameState;
  private isInitialized = false;
  private isPaused = false;

  private constructor() {
    // Initialize core systems first
    this.eventBus = EventBus.getInstance();
    this.gameLoop = GameLoop.getInstance();

    // Create default game state
    this.gameState = createDefaultGameState();

    // Initialize managers (order matters!)
    this.storageManager = StorageManager.getInstance();
    this.resourceManager = new ResourceManager(this.gameState);
    this.farmManager = new FarmManager(this.gameState);
    this.upgradeManager = new UpgradeManager(this.gameState);
    this.questManager = new QuestManager(this.gameState);
    this.policeManager = new PoliceManager(this.gameState);
    this.tickManager = new TickManager(this.gameState);
    this.uiManager = UIManager.getInstance();
    this.storyManager = new StoryManager(this.gameState);

    // Setup auto-save
    this.setupAutoSave();
  }

  static getInstance(): GameEngine {
    if (!GameEngine.instance) {
      GameEngine.instance = new GameEngine();
    }
    return GameEngine.instance;
  }

  /**
   * Initialize the game engine
   */
  initialize(): void {
    if (this.isInitialized) {
      console.warn('GameEngine already initialized');
      return;
    }

    console.log('🚀 Initializing Cannabis Manager Game...');

    // Try to load saved game
    const savedState = this.storageManager.loadGame();
    if (savedState) {
      this.gameState = savedState;
      console.log('💾 Loaded saved game');

      // Calculate offline progress
      this.calculateOfflineProgress();
    } else {
      console.log('🆕 Starting new game');
    }

    // Initialize UI first (so event listeners are ready)
    this.uiManager.initialize(this.gameState);

    // Initialize all managers with current state
    this.resourceManager.initialize(this.gameState);
    this.farmManager.initialize(this.gameState);
    this.upgradeManager.initialize(this.gameState);
    this.questManager.initialize(this.gameState);
    this.policeManager.initialize(this.gameState);
    this.tickManager.initialize(this.gameState);

    // Initialize Story Manager LAST (after UI is ready to receive events)
    this.storyManager.initialize(this.gameState);

    // Initial UI render
    this.uiManager.refreshUI();

    // Setup game loop callbacks
    this.setupGameLoop();

    // Setup tab switching with refresh
    this.setupTabSwitching();

    this.isInitialized = true;
    console.log('✅ Game initialized successfully');
  }

  /**
   * Start the game
   */
  start(): void {
    if (!this.isInitialized) {
      throw new Error('Game must be initialized before starting');
    }

    if (!this.isPaused) {
      this.gameLoop.start();
      console.log('▶️  Game started');
    } else {
      this.resume();
    }
  }

  /**
   * Pause the game
   */
  pause(): void {
    this.isPaused = true;
    this.gameLoop.stop();
    this.save();
    console.log('⏸️  Game paused');
  }

  /**
   * Resume the game
   */
  resume(): void {
    if (!this.isPaused) return;

    this.isPaused = false;
    this.gameLoop.start();
    console.log('▶️  Game resumed');
  }

  /**
   * Save the game
   */
  save(): void {
    this.gameState.lastSaved = Date.now();
    this.storageManager.saveGame(this.gameState);
    this.eventBus.emit('game:save', { timestamp: Date.now() });
    console.log('💾 Game saved');
  }

  /**
   * Reset the game
   */
  reset(): void {
    if (confirm('Are you sure you want to reset the game? All progress will be lost!')) {
      this.storageManager.clearGame();
      this.gameState = createDefaultGameState();
      this.initialize();
      console.log('🔄 Game reset');
    }
  }

  /**
   * Setup game loop callbacks
   */
  private setupGameLoop(): void {
    // Subscribe to tick events
    this.eventBus.on('game:tick', (event) => {
      const { deltaTime, timestamp, isOffline } = event.data;

      if (!isOffline && !this.isPaused) {
        // Update managers
        this.farmManager.update(deltaTime);
        this.policeManager.update(deltaTime);
        this.tickManager.update(deltaTime);

        // Update playtime
        this.gameState.playtime += deltaTime;
        this.gameState.lastPlayed = timestamp;
      }
    });

    // Update UI every frame
    this.gameLoop.onUpdate((deltaTime) => {
      if (!this.isPaused) {
        this.uiManager.update(deltaTime);
      }
    });
  }

  /**
   * Setup auto-save
   */
  private setupAutoSave(): void {
    setInterval(() => {
      if (this.isInitialized && !this.isPaused) {
        this.save();
      }
    }, this.gameState.settings.autoSaveInterval * 1000);

    // Save on page unload
    window.addEventListener('beforeunload', () => {
      this.save();
    });
  }

  /**
   * Calculate offline progress
   */
  private calculateOfflineProgress(): void {
    const now = Date.now();
    const timeSinceLastPlay = (now - this.gameState.lastPlayed) / 1000; // in seconds

    if (timeSinceLastPlay > 60) {
      // Only calculate if offline for more than 1 minute
      console.log(`⏰ You were offline for ${Math.round(timeSinceLastPlay / 60)} minutes`);

      // Calculate offline progress
      const offlineProgress = this.tickManager.calculateOfflineProgress(timeSinceLastPlay);

      // Apply offline earnings
      if (offlineProgress.money > 0 || offlineProgress.cannabis > 0) {
        this.resourceManager.addMoney(offlineProgress.money);
        this.resourceManager.addCannabis(offlineProgress.cannabis);

        // Show notification
        this.uiManager.showNotification(
          `Welcome back! You earned ${offlineProgress.money.toFixed(2)}$ and ${offlineProgress.cannabis.toFixed(1)}g while offline.`
        );
      }
    }
  }

  /**
   * Setup tab switching with refresh
   */
  private setupTabSwitching(): void {
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        // Refresh UI when tab is switched
        setTimeout(() => this.uiManager.refreshUI(), 50);
      });
    });
  }

  /**
   * Public API for accessing managers
   */
  get resources(): ResourceManager {
    return this.resourceManager;
  }

  get farm(): FarmManager {
    return this.farmManager;
  }

  get upgrades(): UpgradeManager {
    return this.upgradeManager;
  }

  get quests(): QuestManager {
    return this.questManager;
  }

  get police(): PoliceManager {
    return this.policeManager;
  }

  get ui(): UIManager {
    return this.uiManager;
  }

  get state(): GameState {
    return this.gameState;
  }

  /**
   * Public API for easy access via window.game.managers
   */
  get managers() {
    return {
      farm: this.farmManager,
      resource: this.resourceManager,
      upgrade: this.upgradeManager,
      quest: this.questManager,
      police: this.policeManager,
      ui: this.uiManager,
      story: this.storyManager,
    };
  }
}
