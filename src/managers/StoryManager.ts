/**
 * StoryManager - Manages story progression, dialogues, and character interactions
 * Brings the emotional narrative to life in the game
 */

import type { GameState } from '@types';
import { EventBus } from '@core/EventBus';

export interface Character {
  id: string;
  name: string;
  color: string; // Accent color for speech bubbles
  avatar: string; // Emoji or icon identifier
}

export interface DialogueLine {
  characterId: string;
  text: string;
  emotion?: 'neutral' | 'happy' | 'sad' | 'angry' | 'worried';
}

export interface StoryBeat {
  id: string;
  title: string;
  triggerLevel?: number;
  triggerMoney?: number;
  triggerEvent?: string;
  dialogues: DialogueLine[];
  rewards?: {
    money?: number;
    experience?: number;
    unlocks?: string[];
  };
  isShown?: boolean;
}

export class StoryManager {
  private gameState: GameState;
  private eventBus: EventBus;
  private characters: Map<string, Character>;
  private storyBeats: StoryBeat[];
  private currentDialogue: StoryBeat | null = null;

  constructor(gameState: GameState) {
    this.gameState = gameState;
    this.eventBus = EventBus.getInstance();
    this.characters = new Map();
    this.storyBeats = [];

    this.initializeCharacters();
    this.initializeStoryBeats();
  }

  /**
   * Initialize all characters
   */
  private initializeCharacters(): void {
    const characters: Character[] = [
      {
        id: 'alex',
        name: 'Alex (You)',
        color: '#10B981', // Green
        avatar: '👤',
      },
      {
        id: 'luna',
        name: 'Luna',
        color: '#EC4899', // Pink
        avatar: '👧',
      },
      {
        id: 'doc',
        name: 'Doc Henneberg',
        color: '#8B5CF6', // Purple
        avatar: '👨‍🔬',
      },
      {
        id: 'apex',
        name: 'Apex',
        color: '#06B6D4', // Cyan
        avatar: '🧑‍💻',
      },
      {
        id: 'enzo',
        name: 'Smooth Enzo',
        color: '#F59E0B', // Gold
        avatar: '😎',
      },
      {
        id: 'bernie',
        name: 'Kommissar Stolz',
        color: '#EF4444', // Red
        avatar: '👮',
      },
      {
        id: 'tash',
        name: 'Tash Volkov',
        color: '#6366F1', // Indigo
        avatar: '💼',
      },
    ];

    characters.forEach((char) => this.characters.set(char.id, char));
  }

  /**
   * Initialize all story beats based on STORY.md
   */
  private initializeStoryBeats(): void {
    this.storyBeats = [
      // INTRO - Level 1 (First time playing)
      {
        id: 'intro',
        title: 'Rock Bottom',
        triggerLevel: 1,
        dialogues: [
          {
            characterId: 'alex',
            text: 'Luna... she has leukemia. The therapy costs 180,000€. The insurance won\'t pay. I have 3 months.',
            emotion: 'worried',
          },
          {
            characterId: 'luna',
            text: 'Alex... I\'m scared. But whatever happens, I love you.',
            emotion: 'sad',
          },
          {
            characterId: 'doc',
            text: 'Kid, I heard about your situation. I got a proposal. You grow for me, in 6 months you\'ll have your 180k.',
            emotion: 'neutral',
          },
          {
            characterId: 'alex',
            text: 'This isn\'t a choice. It\'s survival. Let\'s do this.',
            emotion: 'angry',
          },
          {
            characterId: 'doc',
            text: 'Good. First rule: Every plant is a living being. Treat it like shit, you get shit. Now let\'s get to work.',
            emotion: 'neutral',
          },
        ],
      },

      // Level 3 - First Success
      {
        id: 'first_harvest',
        title: 'First Green',
        triggerLevel: 3,
        dialogues: [
          {
            characterId: 'doc',
            text: 'Not bad, kid. You got the touch. Keep this up and we\'ll get your sister that money.',
            emotion: 'happy',
          },
          {
            characterId: 'alex',
            text: 'I can do this. For Luna.',
            emotion: 'neutral',
          },
        ],
        rewards: {
          money: 100,
          experience: 50,
        },
      },

      // Level 5 - Doc's Teaching
      {
        id: 'docs_lesson',
        title: 'The Master Grower',
        triggerLevel: 5,
        dialogues: [
          {
            characterId: 'doc',
            text: 'Let me tell you about strains. Each one is different. Northern Lights? That\'s your relaxation queen.',
            emotion: 'neutral',
          },
          {
            characterId: 'doc',
            text: 'Sour Diesel? Energy boost. Wedding Cake? Premium shit. Know your product, respect your product.',
            emotion: 'neutral',
          },
          {
            characterId: 'alex',
            text: 'This is more complex than I thought...',
            emotion: 'neutral',
          },
          {
            characterId: 'doc',
            text: 'Everything worth doing is. But you\'re a fast learner. I see potential in you.',
            emotion: 'happy',
          },
        ],
        rewards: {
          experience: 100,
        },
      },

      // Level 8 - Meet Apex
      {
        id: 'meet_apex',
        title: 'Digital Backup',
        triggerLevel: 8,
        dialogues: [
          {
            characterId: 'apex',
            text: 'Yo. Doc told me about you. I\'m Apex. I handle... let\'s call it "digital security".',
            emotion: 'neutral',
          },
          {
            characterId: 'alex',
            text: 'You\'re a hacker?',
            emotion: 'neutral',
          },
          {
            characterId: 'apex',
            text: 'I prefer "information liberation specialist". I can help you stay off the radar. For a cut.',
            emotion: 'happy',
          },
          {
            characterId: 'doc',
            text: 'Apex is good. Non-binary, brilliant, and has a Robin Hood complex. You can trust them.',
            emotion: 'neutral',
          },
        ],
      },

      // Level 10 - Luna Update
      {
        id: 'luna_update_1',
        title: 'Sister\'s Hope',
        triggerLevel: 10,
        dialogues: [
          {
            characterId: 'luna',
            text: 'Alex... the doctors say I need to start treatment soon. Do we have the money?',
            emotion: 'worried',
          },
          {
            characterId: 'alex',
            text: 'Not yet, but we\'re getting there. I promise, Luna. Just hold on.',
            emotion: 'worried',
          },
          {
            characterId: 'luna',
            text: 'I believe in you. You\'ve always taken care of me.',
            emotion: 'sad',
          },
        ],
      },

      // Level 15 - Meet Enzo
      {
        id: 'meet_enzo',
        title: 'The Dealer',
        triggerLevel: 15,
        dialogues: [
          {
            characterId: 'enzo',
            text: 'Hola, amigo! I heard you got quality product. Name\'s Enzo. I can move your goods... for the right price.',
            emotion: 'happy',
          },
          {
            characterId: 'alex',
            text: 'Can I trust you?',
            emotion: 'neutral',
          },
          {
            characterId: 'enzo',
            text: 'Trust? That\'s a strong word. But business is business. I deliver results.',
            emotion: 'neutral',
          },
          {
            characterId: 'doc',
            text: 'Enzo is smooth. Too smooth. Watch your back with him, kid.',
            emotion: 'worried',
          },
        ],
      },

      // Level 20 - Police First Warning
      {
        id: 'bernie_intro',
        title: 'The Law',
        triggerLevel: 20,
        dialogues: [
          {
            characterId: 'bernie',
            text: 'I\'m Kommissar Stolz. I know what you\'re doing. I\'ve seen too many good people go down this path.',
            emotion: 'angry',
          },
          {
            characterId: 'alex',
            text: 'I don\'t have a choice. My sister is dying.',
            emotion: 'angry',
          },
          {
            characterId: 'bernie',
            text: 'Everyone has a choice. I lost my son to an overdose. I won\'t let more kids die because of dealers like you.',
            emotion: 'sad',
          },
          {
            characterId: 'bernie',
            text: 'This is your warning. Stop now, or I will come for you.',
            emotion: 'angry',
          },
        ],
      },

      // Level 30 - Big Money Milestone
      {
        id: 'big_money',
        title: 'The Weight of Cash',
        triggerMoney: 50000,
        dialogues: [
          {
            characterId: 'alex',
            text: 'I\'ve made 50k already. More money than I\'ve ever seen. This is working...',
            emotion: 'happy',
          },
          {
            characterId: 'doc',
            text: 'Money changes people, kid. Don\'t let it change you. Remember why you started.',
            emotion: 'neutral',
          },
        ],
      },

      // Level 50 - LUNA IS SAVED! (180k reached)
      {
        id: 'luna_saved',
        title: 'Mission Accomplished',
        triggerMoney: 180000,
        dialogues: [
          {
            characterId: 'alex',
            text: 'I did it. 180,000€. Luna can get her treatment!',
            emotion: 'happy',
          },
          {
            characterId: 'luna',
            text: 'Alex... you saved me. I don\'t know how you did it, but thank you. Thank you so much.',
            emotion: 'happy',
          },
          {
            characterId: 'doc',
            text: 'You did good, kid. Real good. So... what now? You got what you came for.',
            emotion: 'neutral',
          },
          {
            characterId: 'alex',
            text: 'I... I don\'t know. The business is running well. Maybe I should keep going?',
            emotion: 'neutral',
          },
          {
            characterId: 'doc',
            text: 'That\'s when it gets dangerous. When you stop doing it for survival and start doing it for the money.',
            emotion: 'worried',
          },
        ],
        rewards: {
          experience: 1000,
        },
      },

      // Level 60 - The Dark Turn
      {
        id: 'dark_turn',
        title: 'Who Are You Now?',
        triggerLevel: 60,
        dialogues: [
          {
            characterId: 'luna',
            text: 'Alex, I\'m better now. The treatment worked. But... you\'re different. You\'re always working. Always distant.',
            emotion: 'sad',
          },
          {
            characterId: 'alex',
            text: 'I\'m just making sure we\'re secure. That we never go through this again.',
            emotion: 'neutral',
          },
          {
            characterId: 'luna',
            text: 'You saved my life. Mission accomplished. But who are you becoming? Do you even enjoy this anymore?',
            emotion: 'worried',
          },
          {
            characterId: 'alex',
            text: '... I don\'t know.',
            emotion: 'sad',
          },
        ],
      },

      // Level 70 - THE BETRAYAL
      {
        id: 'betrayal',
        title: 'The Raid',
        triggerLevel: 70,
        dialogues: [
          {
            characterId: 'bernie',
            text: 'POLICE! On the ground! We know everything. Your operation, your partners, everything.',
            emotion: 'angry',
          },
          {
            characterId: 'alex',
            text: 'How did you... no. No, this can\'t be happening!',
            emotion: 'angry',
          },
          {
            characterId: 'enzo',
            text: 'Sorry, amigo. Nothing personal. Bernie made me a better deal. Business is business.',
            emotion: 'neutral',
          },
          {
            characterId: 'alex',
            text: 'Enzo... you bastard! I trusted you!',
            emotion: 'angry',
          },
          {
            characterId: 'bernie',
            text: 'Enzo told us everything. But listen - I\'m not here for you. I\'m here for Tash Volkov. The real threat.',
            emotion: 'neutral',
          },
          {
            characterId: 'bernie',
            text: 'Help me take her down, and I\'ll let you walk. Your sister doesn\'t need to know you went to prison.',
            emotion: 'neutral',
          },
        ],
      },

      // Level 80 - Redemption Path
      {
        id: 'redemption',
        title: 'The Way Back',
        triggerLevel: 80,
        dialogues: [
          {
            characterId: 'alex',
            text: 'I lost everything. 60% of my operation gone. Enzo betrayed me. Bernie has me on a leash.',
            emotion: 'sad',
          },
          {
            characterId: 'doc',
            text: 'Kid, you\'re not the first to fall, and you won\'t be the last. Question is: who do you want to be?',
            emotion: 'neutral',
          },
          {
            characterId: 'luna',
            text: 'Alex... I don\'t care about the money. I care about you. Come back to me. The real you.',
            emotion: 'sad',
          },
          {
            characterId: 'alex',
            text: 'You\'re right. Both of you. Time to rebuild. But this time, I do it right.',
            emotion: 'neutral',
          },
        ],
        rewards: {
          experience: 2000,
        },
      },

      // Level 100 - LEGALIZATION & ENDING
      {
        id: 'ending',
        title: 'Green Legitimacy',
        triggerLevel: 100,
        dialogues: [
          {
            characterId: 'alex',
            text: 'Breaking news: Cannabis legalization just passed! This changes everything.',
            emotion: 'happy',
          },
          {
            characterId: 'doc',
            text: 'You did it, kid. From rock bottom to legitimate businessman. I\'m proud of you.',
            emotion: 'happy',
          },
          {
            characterId: 'luna',
            text: 'I always believed in you, Alex. Now, what\'s the new company name?',
            emotion: 'happy',
          },
          {
            characterId: 'alex',
            text: 'Luna\'s Green. Premium Cannabis. Legal, ethical, and in memory of why I started.',
            emotion: 'happy',
          },
          {
            characterId: 'bernie',
            text: 'Congratulations, Alex. You helped us take down Tash. And you turned your life around. That takes guts.',
            emotion: 'neutral',
          },
          {
            characterId: 'apex',
            text: 'Guess I\'m your CTO now? Legal business needs tech too, right?',
            emotion: 'happy',
          },
          {
            characterId: 'alex',
            text: 'Hell yeah. Welcome to Luna\'s Green, everyone. Let\'s do this right.',
            emotion: 'happy',
          },
        ],
        rewards: {
          money: 100000,
          experience: 5000,
        },
      },
    ];
  }

  /**
   * Initialize story manager
   */
  initialize(gameState: GameState): void {
    this.gameState = gameState;

    // Check if this is first time playing
    if (!this.gameState.stats || this.gameState.stats.totalPlayTime < 10000) {
      // Show intro on first play
      this.checkAndTriggerStoryBeats();
    }

    // Listen for level ups
    this.eventBus.on('player:level_up', (event) => {
      this.checkAndTriggerStoryBeats();
    });

    // Listen for money changes (for money-triggered beats)
    this.eventBus.on('player:money_change', (event) => {
      this.checkAndTriggerStoryBeats();
    });
  }

  /**
   * Check and trigger appropriate story beats
   */
  private checkAndTriggerStoryBeats(): void {
    const currentLevel = this.gameState.player.level;
    const currentMoney = this.gameState.player.money;

    for (const beat of this.storyBeats) {
      if (beat.isShown) continue;

      let shouldTrigger = false;

      // Check level trigger
      if (beat.triggerLevel && currentLevel >= beat.triggerLevel) {
        shouldTrigger = true;
      }

      // Check money trigger
      if (beat.triggerMoney && currentMoney >= beat.triggerMoney) {
        shouldTrigger = true;
      }

      if (shouldTrigger) {
        this.showStoryBeat(beat);
        beat.isShown = true;
        break; // Show one at a time
      }
    }
  }

  /**
   * Show a story beat (dialogue sequence)
   */
  private showStoryBeat(beat: StoryBeat): void {
    this.currentDialogue = beat;

    // Emit event for UI to show dialogue
    this.eventBus.emit('story:dialogue_start', {
      beat,
      characters: Array.from(this.characters.values()),
    });
  }

  /**
   * Get character by ID
   */
  getCharacter(id: string): Character | undefined {
    return this.characters.get(id);
  }

  /**
   * Get all characters
   */
  getAllCharacters(): Character[] {
    return Array.from(this.characters.values());
  }

  /**
   * Update - called every frame
   */
  update(deltaTime: number): void {
    // Story manager doesn't need frame updates
  }
}
