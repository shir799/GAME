/**
 * UIManager - Manages DOM manipulation and UI updates
 * Uses a virtual DOM-like pattern to minimize actual DOM updates
 */

import type { GameState } from '@types';
import { EventBus } from '@core/EventBus';
import { formatMoney, formatNumber, formatTime } from '@utils/formatters';
import type { StoryBeat, Character } from '@managers/StoryManager';

interface UIState {
  lastMoney: number;
  lastCannabis: number;
  lastLevel: number;
  lastExperience: number;
  lastHeatLevel: number;
  needsUpdate: boolean;
}

export class UIManager {
  private static instance: UIManager;
  private gameState: GameState | null = null;
  private eventBus: EventBus;
  private uiState: UIState;
  private elements: Map<string, HTMLElement> = new Map();
  private updateQueue: Set<string> = new Set();
  private rafId: number | null = null;

  private constructor() {
    this.eventBus = EventBus.getInstance();
    this.uiState = {
      lastMoney: 0,
      lastCannabis: 0,
      lastLevel: 1,
      lastExperience: 0,
      lastHeatLevel: 0,
      needsUpdate: false,
    };
  }

  static getInstance(): UIManager {
    if (!UIManager.instance) {
      UIManager.instance = new UIManager();
    }
    return UIManager.instance;
  }

  /**
   * Initialize UI
   */
  initialize(gameState: GameState): void {
    this.gameState = gameState;

    // Build initial UI
    this.buildUI();

    // Cache DOM elements
    this.cacheElements();

    // Setup event listeners
    this.setupEventListeners();

    // Initial render
    this.render();
  }

  /**
   * Update UI (called every frame)
   */
  update(_deltaTime: number): void {
    if (!this.gameState) return;

    // Check what needs updating
    this.checkForUpdates();

    // Batch update if needed
    if (this.updateQueue.size > 0 && this.rafId === null) {
      this.rafId = requestAnimationFrame(() => {
        this.render();
        this.rafId = null;
      });
    }
  }

  /**
   * Build the UI structure
   */
  private buildUI(): void {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="min-h-screen bg-gray-900 text-white">
        <!-- Header -->
        <header class="bg-gray-800 border-b border-gray-700 p-4">
          <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-3xl font-bold text-cannabis-400 text-shadow">🌿 Cannabis Manager</h1>
            <div class="flex gap-4">
              <button id="btn-save" class="btn-secondary">💾 Save</button>
              <button id="btn-settings" class="btn-secondary">⚙️ Settings</button>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto p-4">
          <!-- Stats Bar -->
          <div id="stats-bar" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="stat-card">
              <div class="text-sm text-gray-400">Money</div>
              <div id="stat-money" class="text-2xl font-bold text-green-400">$0.00</div>
            </div>
            <div class="stat-card">
              <div class="text-sm text-gray-400">Cannabis</div>
              <div id="stat-cannabis" class="text-2xl font-bold text-cannabis-400">0g</div>
            </div>
            <div class="stat-card">
              <div class="text-sm text-gray-400">Level</div>
              <div id="stat-level" class="text-2xl font-bold text-blue-400">1</div>
              <div class="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div id="xp-bar" class="bg-blue-400 h-2 rounded-full" style="width: 0%"></div>
              </div>
            </div>
            <div class="stat-card">
              <div class="text-sm text-gray-400">Police Heat</div>
              <div id="stat-heat" class="text-2xl font-bold text-red-400">0%</div>
              <div class="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div id="heat-bar" class="bg-red-400 h-2 rounded-full" style="width: 0%"></div>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="mb-4">
            <div class="flex gap-2 border-b border-gray-700">
              <button class="tab-btn active" data-tab="farm">🌱 Farm</button>
              <button class="tab-btn" data-tab="upgrades">⬆️ Upgrades</button>
              <button class="tab-btn" data-tab="quests">📋 Quests</button>
              <button class="tab-btn" data-tab="stats">📊 Statistics</button>
            </div>
          </div>

          <!-- Tab Content -->
          <div id="tab-content">
            <div id="tab-farm" class="tab-panel active">
              <div id="plots-container" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <!-- Plots will be rendered here -->
              </div>
            </div>

            <div id="tab-upgrades" class="tab-panel hidden">
              <div id="upgrades-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Upgrades will be rendered here -->
              </div>
            </div>

            <div id="tab-quests" class="tab-panel hidden">
              <div id="quests-container" class="space-y-4">
                <!-- Quests will be rendered here -->
              </div>
            </div>

            <div id="tab-stats" class="tab-panel hidden">
              <div id="stats-container" class="space-y-4">
                <!-- Stats will be rendered here -->
              </div>
            </div>
          </div>
        </main>

        <!-- Notification Container -->
        <div id="notifications" class="fixed bottom-4 right-4 space-y-2 pointer-events-none">
          <!-- Notifications will appear here -->
        </div>
      </div>
    `;
  }

  /**
   * Cache frequently accessed DOM elements
   */
  private cacheElements(): void {
    const ids = [
      'stat-money',
      'stat-cannabis',
      'stat-level',
      'stat-heat',
      'xp-bar',
      'heat-bar',
      'plots-container',
      'upgrades-container',
      'quests-container',
      'stats-container',
      'notifications',
    ];

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        this.elements.set(id, element);
      }
    });
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const tab = target.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    // Save button
    const saveBtn = document.getElementById('btn-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.eventBus.emit('game:save', {});
        this.showNotification('Game saved!', 'success');
      });
    }

    // Listen to game events
    this.eventBus.on('player:money_change', () => this.queueUpdate('money'));
    this.eventBus.on('player:cannabis_change', () => this.queueUpdate('cannabis'));
    this.eventBus.on('player:level_up', () => this.queueUpdate('level'));
    this.eventBus.on('police:heat_change', () => this.queueUpdate('heat'));

    // Listen to story events
    this.eventBus.on('story:dialogue_start', (event) => {
      const { beat, characters } = event.data;
      this.showDialogue(beat, characters);
    });
  }

  /**
   * Check what needs updating
   */
  private checkForUpdates(): void {
    if (!this.gameState) return;

    if (this.gameState.player.money !== this.uiState.lastMoney) {
      this.queueUpdate('money');
    }

    if (this.gameState.player.cannabis !== this.uiState.lastCannabis) {
      this.queueUpdate('cannabis');
    }

    if (this.gameState.player.level !== this.uiState.lastLevel) {
      this.queueUpdate('level');
    }

    if (this.gameState.police.heatLevel !== this.uiState.lastHeatLevel) {
      this.queueUpdate('heat');
    }
  }

  /**
   * Queue an update
   */
  private queueUpdate(section: string): void {
    this.updateQueue.add(section);
  }

  /**
   * Render updates
   */
  private render(): void {
    if (!this.gameState) return;

    this.updateQueue.forEach((section) => {
      switch (section) {
        case 'money':
          this.updateMoney();
          break;
        case 'cannabis':
          this.updateCannabis();
          break;
        case 'level':
          this.updateLevel();
          break;
        case 'heat':
          this.updateHeat();
          break;
      }
    });

    this.updateQueue.clear();
  }

  /**
   * Update money display
   */
  private updateMoney(): void {
    if (!this.gameState) return;

    const element = this.elements.get('stat-money');
    if (element) {
      element.textContent = formatMoney(this.gameState.player.money);
      this.uiState.lastMoney = this.gameState.player.money;
    }
  }

  /**
   * Update cannabis display
   */
  private updateCannabis(): void {
    if (!this.gameState) return;

    const element = this.elements.get('stat-cannabis');
    if (element) {
      element.textContent = `${formatNumber(this.gameState.player.cannabis)}g`;
      this.uiState.lastCannabis = this.gameState.player.cannabis;
    }
  }

  /**
   * Update level display
   */
  private updateLevel(): void {
    if (!this.gameState) return;

    const levelElement = this.elements.get('stat-level');
    const xpBarElement = this.elements.get('xp-bar');

    if (levelElement) {
      levelElement.textContent = this.gameState.player.level.toString();
      this.uiState.lastLevel = this.gameState.player.level;
    }

    if (xpBarElement) {
      const progress =
        (this.gameState.player.experience / this.gameState.player.experienceToNextLevel) * 100;
      xpBarElement.style.width = `${progress}%`;
    }
  }

  /**
   * Update heat display
   */
  private updateHeat(): void {
    if (!this.gameState) return;

    const heatElement = this.elements.get('stat-heat');
    const heatBarElement = this.elements.get('heat-bar');

    if (heatElement) {
      heatElement.textContent = `${Math.round(this.gameState.police.heatLevel)}%`;
      this.uiState.lastHeatLevel = this.gameState.police.heatLevel;
    }

    if (heatBarElement) {
      heatBarElement.style.width = `${this.gameState.police.heatLevel}%`;
    }
  }

  /**
   * Switch tab
   */
  private switchTab(tabName: string): void {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');

    // Update panels
    document.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.add('hidden');
      panel.classList.remove('active');
    });
    const targetPanel = document.getElementById(`tab-${tabName}`);
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
      targetPanel.classList.add('active');
    }
  }

  /**
   * Show notification
   */
  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const container = this.elements.get('notifications');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `
      pointer-events-auto px-4 py-3 rounded-lg shadow-lg
      transition-all duration-300 transform translate-x-0
      ${type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600'}
    `;
    notification.textContent = message;

    container.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  /**
   * Render all plots
   */
  renderPlots(): void {
    if (!this.gameState) return;

    const container = this.elements.get('plots-container');
    if (!container) return;

    container.innerHTML = this.gameState.plots
      .map((plot, index) => {
        if (!plot.isUnlocked) {
          return `
            <div class="stat-card opacity-50">
              <div class="text-center">
                <div class="text-4xl mb-2">🔒</div>
                <div class="text-sm text-gray-400">Locked</div>
                <div class="text-xs text-gray-500">Unlock at higher level</div>
              </div>
            </div>
          `;
        }

        if (!plot.plant) {
          return `
            <div class="stat-card hover:bg-gray-750 cursor-pointer transition-colors" data-plot="${index}">
              <div class="text-center">
                <div class="text-4xl mb-2">➕</div>
                <div class="text-sm text-gray-400">Empty Plot</div>
                <button class="btn-primary btn-sm mt-2" onclick="window.game.managers.farm.plantSeed(${index}, 'basic_strain')">
                  Plant Seed
                </button>
              </div>
            </div>
          `;
        }

        const plant = plot.plant;
        // Assume 3 minutes growth time for now (180000 ms) - TODO: get from config
        const growthTime = 180000;
        const progress = ((Date.now() - plant.plantedAt) / growthTime) * 100;
        const isReady = progress >= 100 || plant.stage === 'ready';
        const timeLeft = Math.max(0, growthTime - (Date.now() - plant.plantedAt));

        return `
          <div class="stat-card ${isReady ? 'border-2 border-green-500 animate-pulse' : ''}">
            <div class="text-center">
              <div class="text-4xl mb-2">${isReady ? '🌿' : '🌱'}</div>
              <div class="text-sm font-semibold">${plant.plantConfigId}</div>
              <div class="text-xs text-gray-400 mb-2">${plant.stage}</div>

              ${!isReady ? `
                <div class="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div class="bg-green-500 h-2 rounded-full transition-all" style="width: ${Math.min(progress, 100)}%"></div>
                </div>
                <div class="text-xs text-gray-400">${formatTime(timeLeft / 1000)}</div>
              ` : `
                <button class="btn-primary btn-sm" onclick="window.game.managers.farm.harvestPlant(${index})">
                  🌿 Harvest
                </button>
              `}
            </div>
          </div>
        `;
      })
      .join('');
  }

  /**
   * Render all upgrades
   */
  renderUpgrades(): void {
    if (!this.gameState) return;

    const container = this.elements.get('upgrades-container');
    if (!container) return;

    // Get upgrades from UpgradeManager (merged config + state)
    const upgrades = (window as any).game?.managers?.upgrade?.getAllUpgradesWithConfig() || [];

    container.innerHTML = upgrades
      .map((upgrade: any) => {
        const canAfford = this.gameState!.player.money >= upgrade.cost;
        const isMaxLevel = upgrade.currentLevel >= upgrade.maxLevel;

        return `
          <div class="stat-card ${canAfford && !isMaxLevel ? 'hover:bg-gray-750' : 'opacity-75'}">
            <div class="flex justify-between items-start mb-2">
              <div class="text-lg font-semibold">${upgrade.name}</div>
              <div class="text-sm px-2 py-1 bg-gray-700 rounded">Lv ${upgrade.currentLevel}/${upgrade.maxLevel}</div>
            </div>

            <div class="text-sm text-gray-400 mb-3">${upgrade.description}</div>

            <div class="text-xs text-gray-500 mb-2">
              Effect: ${upgrade.effectType} ${upgrade.effectValue > 0 ? '+' : ''}${upgrade.effectValue}${upgrade.effectType.includes('multi') ? 'x' : ''}
            </div>

            ${!isMaxLevel ? `
              <button
                class="btn-primary w-full btn-sm ${!canAfford ? 'opacity-50 cursor-not-allowed' : ''}"
                onclick="window.game.managers.upgrade.buyUpgrade('${upgrade.id}')"
                ${!canAfford ? 'disabled' : ''}
              >
                Buy - ${formatMoney(upgrade.cost)}
              </button>
            ` : `
              <div class="text-center text-sm text-green-500">✓ Maxed</div>
            `}
          </div>
        `;
      })
      .join('');
  }

  /**
   * Render all quests
   */
  renderQuests(): void {
    if (!this.gameState) return;

    const container = this.elements.get('quests-container');
    if (!container) return;

    const quests = (window as any).game?.managers?.quest?.getAllQuestsWithConfig() || [];

    if (quests.length === 0) {
      container.innerHTML = `
        <div class="stat-card text-center text-gray-400">
          <div class="text-4xl mb-2">📋</div>
          <div>No quests available</div>
        </div>
      `;
      return;
    }

    container.innerHTML = quests
      .map((quest: any) => {
        const progress = (quest.currentProgress / quest.targetProgress) * 100;
        const isComplete = quest.currentProgress >= quest.targetProgress;

        return `
          <div class="stat-card ${isComplete && !quest.completed ? 'border-2 border-green-500' : ''}">
            <div class="flex justify-between items-start mb-2">
              <div>
                <div class="text-lg font-semibold">${quest.name}</div>
                <div class="text-xs px-2 py-1 bg-gray-700 rounded inline-block mt-1">${quest.type}</div>
              </div>
              ${quest.completed ? `
                <div class="text-green-500 text-2xl">✓</div>
              ` : ''}
            </div>

            <div class="text-sm text-gray-400 mb-3">${quest.description}</div>

            ${!quest.completed ? `
              <div class="mb-2">
                <div class="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>${quest.currentProgress}/${quest.targetProgress}</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div class="bg-blue-500 h-2 rounded-full transition-all" style="width: ${Math.min(progress, 100)}%"></div>
                </div>
              </div>
            ` : ''}

            <div class="text-xs text-gray-500">
              Rewards: ${quest.rewards.map((r: any) => {
                if (r.type === 'money') return formatMoney(r.value);
                if (r.type === 'experience') return `${r.value} XP`;
                if (r.type === 'cannabis') return `${r.value}g`;
                if (r.type === 'reputation') return `${r.value} Rep`;
                return '';
              }).filter((r: string) => r).join(', ')}
            </div>

            ${isComplete && !quest.completed ? `
              <button class="btn-primary w-full btn-sm mt-2" onclick="window.game.managers.quest.claimRewards('${quest.id}')">
                Claim Reward
              </button>
            ` : ''}
          </div>
        `;
      })
      .join('');
  }

  /**
   * Render statistics
   */
  renderStats(): void {
    if (!this.gameState) return;

    const container = this.elements.get('stats-container');
    if (!container) return;

    const stats = this.gameState.statistics;

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="stat-card">
          <h3 class="text-xl font-semibold mb-4">📊 Game Statistics</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Total Money Earned:</span>
              <span class="font-semibold">${formatMoney(stats.totalMoneyEarned)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Total Cannabis Grown:</span>
              <span class="font-semibold">${formatNumber(stats.totalCannabisGrown)}g</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Total Harvests:</span>
              <span class="font-semibold">${formatNumber(stats.totalHarvests)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Total Clicks:</span>
              <span class="font-semibold">${formatNumber(stats.totalClicks)}</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <h3 class="text-xl font-semibold mb-4">👮 Police Encounters</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Total Raids:</span>
              <span class="font-semibold">${formatNumber(stats.totalRaids)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Successful Escapes:</span>
              <span class="font-semibold text-green-500">${formatNumber(stats.raidsEscaped)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Times Caught:</span>
              <span class="font-semibold text-red-500">${formatNumber(stats.raidsCaught)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Total Bribes Paid:</span>
              <span class="font-semibold">${formatMoney(stats.totalBribesPaid)}</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <h3 class="text-xl font-semibold mb-4">⏱️ Time Statistics</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Total Play Time:</span>
              <span class="font-semibold">${formatTime(stats.totalPlayTime / 1000)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Quests Completed:</span>
              <span class="font-semibold">${formatNumber(stats.questsCompleted)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Upgrades Purchased:</span>
              <span class="font-semibold">${formatNumber(stats.upgradesPurchased)}</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <h3 class="text-xl font-semibold mb-4">💎 Current Status</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Current Level:</span>
              <span class="font-semibold">${this.gameState.player.level}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Money:</span>
              <span class="font-semibold">${formatMoney(this.gameState.player.money)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Cannabis:</span>
              <span class="font-semibold">${formatNumber(this.gameState.player.cannabis)}g</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Click Power:</span>
              <span class="font-semibold">${formatMoney(this.gameState.player.clickPower)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Passive Income:</span>
              <span class="font-semibold">${formatMoney(this.gameState.player.passiveIncome)}/s</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Show story dialogue
   */
  showDialogue(beat: StoryBeat, characters: Character[]): void {
    const characterMap = new Map(characters.map(c => [c.id, c]));

    // Create dialogue modal
    const modal = document.createElement('div');
    modal.id = 'story-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in';

    let currentDialogueIndex = 0;

    const renderDialogue = () => {
      if (currentDialogueIndex >= beat.dialogues.length) {
        // Dialogue finished
        modal.remove();

        // Give rewards if any
        if (beat.rewards) {
          if (beat.rewards.money) {
            this.eventBus.emit('player:money_change', { amount: beat.rewards.money });
            this.showNotification(`+${formatMoney(beat.rewards.money)}!`, 'success');
          }
          if (beat.rewards.experience) {
            this.eventBus.emit('player:experience_change', { amount: beat.rewards.experience });
            this.showNotification(`+${beat.rewards.experience} XP!`, 'success');
          }
        }

        return;
      }

      const dialogue = beat.dialogues[currentDialogueIndex];
      const character = characterMap.get(dialogue.characterId);

      if (!character) return;

      modal.innerHTML = `
        <div class="relative max-w-2xl w-full mx-4 bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-700 overflow-hidden animate-scale-in">
          <!-- Header -->
          <div class="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 border-b border-gray-700">
            <h3 class="text-xl font-bold text-white">${beat.title}</h3>
            <div class="text-sm text-gray-400">Chapter ${Math.floor(this.gameState!.player.level / 10) + 1}</div>
          </div>

          <!-- Dialogue Content -->
          <div class="p-6">
            <!-- Character Info -->
            <div class="flex items-center gap-4 mb-4">
              <div class="text-5xl">${character.avatar}</div>
              <div>
                <div class="text-lg font-semibold" style="color: ${character.color}">${character.name}</div>
                <div class="text-sm text-gray-400">${dialogue.emotion || 'neutral'}</div>
              </div>
            </div>

            <!-- Dialogue Text -->
            <div class="bg-gray-900 rounded-lg p-4 mb-6 border-l-4" style="border-color: ${character.color}">
              <p class="text-white text-base leading-relaxed">${dialogue.text}</p>
            </div>

            <!-- Progress Indicator -->
            <div class="flex justify-center gap-2 mb-4">
              ${beat.dialogues.map((_, i) => `
                <div class="w-2 h-2 rounded-full ${i === currentDialogueIndex ? 'bg-green-500' : i < currentDialogueIndex ? 'bg-green-700' : 'bg-gray-700'}"></div>
              `).join('')}
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-gray-900 px-6 py-4 flex justify-between items-center border-t border-gray-700">
            <div class="text-sm text-gray-400">
              ${currentDialogueIndex + 1} / ${beat.dialogues.length}
            </div>
            <button
              id="dialogue-next-btn"
              class="btn-primary"
            >
              ${currentDialogueIndex === beat.dialogues.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      `;

      // Add click handler
      const nextBtn = modal.querySelector('#dialogue-next-btn');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          currentDialogueIndex++;
          renderDialogue();
        });
      }

      // Allow space/enter to advance
      const keyHandler = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          currentDialogueIndex++;
          renderDialogue();
          if (currentDialogueIndex >= beat.dialogues.length) {
            document.removeEventListener('keydown', keyHandler);
          }
        }
      };
      document.addEventListener('keydown', keyHandler);
    };

    document.body.appendChild(modal);
    renderDialogue();
  }

  /**
   * Full UI refresh (for tab changes)
   */
  refreshUI(): void {
    this.renderPlots();
    this.renderUpgrades();
    this.renderQuests();
    this.renderStats();
  }
}
