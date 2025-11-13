/**
 * EventBus - Central event management system
 * Implements publish-subscribe pattern for decoupled communication
 */

import type { GameEvent, GameEventCallback, GameEventType } from '@types';

export class EventBus {
  private static instance: EventBus;
  private listeners: Map<GameEventType, Set<GameEventCallback>>;
  private eventHistory: GameEvent[];
  private readonly maxHistorySize = 100;

  private constructor() {
    this.listeners = new Map();
    this.eventHistory = [];
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  /**
   * Subscribe to an event type
   */
  on<T = any>(eventType: GameEventType, callback: GameEventCallback<T>): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }

    this.listeners.get(eventType)!.add(callback as GameEventCallback);

    // Return unsubscribe function
    return () => this.off(eventType, callback);
  }

  /**
   * Subscribe to an event type once
   */
  once<T = any>(eventType: GameEventType, callback: GameEventCallback<T>): void {
    const wrappedCallback: GameEventCallback<T> = (event) => {
      callback(event);
      this.off(eventType, wrappedCallback);
    };

    this.on(eventType, wrappedCallback);
  }

  /**
   * Unsubscribe from an event type
   */
  off<T = any>(eventType: GameEventType, callback: GameEventCallback<T>): void {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.delete(callback as GameEventCallback);
    }
  }

  /**
   * Emit an event
   */
  emit<T = any>(eventType: GameEventType, data: T): void {
    const event: GameEvent<T> = {
      type: eventType,
      timestamp: Date.now(),
      data,
    };

    // Add to history
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }

    // Notify listeners
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.forEach((callback) => {
        try {
          callback(event);
        } catch (error) {
          console.error(`Error in event listener for ${eventType}:`, error);
        }
      });
    }
  }

  /**
   * Remove all listeners for a specific event type
   */
  clear(eventType?: GameEventType): void {
    if (eventType) {
      this.listeners.delete(eventType);
    } else {
      this.listeners.clear();
    }
  }

  /**
   * Get event history
   */
  getHistory(eventType?: GameEventType, limit = 10): GameEvent[] {
    let history = [...this.eventHistory];

    if (eventType) {
      history = history.filter((event) => event.type === eventType);
    }

    return history.slice(-limit);
  }

  /**
   * Get all active event types
   */
  getActiveEventTypes(): GameEventType[] {
    return Array.from(this.listeners.keys());
  }

  /**
   * Get listener count for an event type
   */
  getListenerCount(eventType: GameEventType): number {
    return this.listeners.get(eventType)?.size ?? 0;
  }
}
