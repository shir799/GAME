/**
 * GameLoop - Manages the main game update cycle
 * Uses requestAnimationFrame for smooth 60 FPS updates
 * Handles delta time and fixed timestep for consistent game logic
 */

import { EventBus } from './EventBus';
import type { TickContext } from '@types';

export class GameLoop {
  private static instance: GameLoop;
  private isRunning = false;
  private animationFrameId: number | null = null;
  private lastTimestamp = 0;
  private accumulatedTime = 0;
  private readonly fixedDeltaTime = 1000 / 60; // 60 FPS in milliseconds
  private readonly maxDeltaTime = 1000; // Max 1 second delta to prevent spiral of death

  private eventBus: EventBus;
  private updateCallbacks: Set<(deltaTime: number) => void> = new Set();
  private fixedUpdateCallbacks: Set<(deltaTime: number) => void> = new Set();

  private constructor() {
    this.eventBus = EventBus.getInstance();
  }

  static getInstance(): GameLoop {
    if (!GameLoop.instance) {
      GameLoop.instance = new GameLoop();
    }
    return GameLoop.instance;
  }

  /**
   * Start the game loop
   */
  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.loop(this.lastTimestamp);

    console.log('🎮 Game loop started');
  }

  /**
   * Stop the game loop
   */
  stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    console.log('⏸️  Game loop stopped');
  }

  /**
   * Main loop function
   */
  private loop(timestamp: number): void {
    if (!this.isRunning) return;

    // Calculate delta time in milliseconds
    let deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    // Clamp delta time to prevent large jumps (e.g., when tab is inactive)
    deltaTime = Math.min(deltaTime, this.maxDeltaTime);

    // Variable update (for rendering, UI, etc.)
    this.update(deltaTime / 1000); // Convert to seconds

    // Fixed update (for game logic)
    this.accumulatedTime += deltaTime;
    while (this.accumulatedTime >= this.fixedDeltaTime) {
      this.fixedUpdate(this.fixedDeltaTime / 1000); // Convert to seconds
      this.accumulatedTime -= this.fixedDeltaTime;
    }

    // Schedule next frame
    this.animationFrameId = requestAnimationFrame((t) => this.loop(t));
  }

  /**
   * Variable update - called every frame
   * Use for rendering, animations, UI updates
   */
  private update(deltaTime: number): void {
    this.updateCallbacks.forEach((callback) => {
      try {
        callback(deltaTime);
      } catch (error) {
        console.error('Error in update callback:', error);
      }
    });
  }

  /**
   * Fixed update - called at fixed intervals (60 FPS)
   * Use for game logic, physics, etc.
   */
  private fixedUpdate(deltaTime: number): void {
    const tickContext: TickContext = {
      deltaTime,
      timestamp: Date.now(),
      isOffline: false,
    };

    // Emit tick event
    this.eventBus.emit('game:tick', tickContext);

    // Call fixed update callbacks
    this.fixedUpdateCallbacks.forEach((callback) => {
      try {
        callback(deltaTime);
      } catch (error) {
        console.error('Error in fixed update callback:', error);
      }
    });
  }

  /**
   * Register an update callback (runs every frame)
   */
  onUpdate(callback: (deltaTime: number) => void): () => void {
    this.updateCallbacks.add(callback);
    return () => this.updateCallbacks.delete(callback);
  }

  /**
   * Register a fixed update callback (runs at fixed intervals)
   */
  onFixedUpdate(callback: (deltaTime: number) => void): () => void {
    this.fixedUpdateCallbacks.add(callback);
    return () => this.fixedUpdateCallbacks.delete(callback);
  }

  /**
   * Get current FPS
   */
  getFPS(): number {
    return this.isRunning ? Math.round(1000 / this.fixedDeltaTime) : 0;
  }

  /**
   * Check if loop is running
   */
  getIsRunning(): boolean {
    return this.isRunning;
  }
}
