# Architecture Documentation

## Overview

Cannabis Manager is built with a modular, event-driven architecture designed for scalability, maintainability, and performance.

## Core Principles

1. **Separation of Concerns**: Each module has a single, well-defined responsibility
2. **Event-Driven Communication**: Decoupled components communicate via EventBus
3. **Type Safety**: TypeScript ensures compile-time type checking
4. **Immutable State**: Game state updates are controlled and predictable
5. **Testability**: Modular design enables easy unit testing

## Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│                      (UIManager)                         │
│  - DOM Manipulation                                      │
│  - User Input Handling                                   │
│  - Rendering                                             │
└─────────────────────────────────────────────────────────┘
                         │
                         │ Events
                         ▼
┌─────────────────────────────────────────────────────────┐
│                      GAME LAYER                          │
│                   (Core + Managers)                      │
│  - Game Logic                                            │
│  - State Management                                      │
│  - Business Rules                                        │
└─────────────────────────────────────────────────────────┘
                         │
                         │ State Changes
                         ▼
┌─────────────────────────────────────────────────────────┐
│                      DATA LAYER                          │
│                  (StorageManager)                        │
│  - Persistence                                           │
│  - Serialization                                         │
│  - Data Validation                                       │
└─────────────────────────────────────────────────────────┘
```

## Module Breakdown

### Core Engine (`/src/core`)

#### EventBus
**Purpose**: Central event management system

**Pattern**: Singleton + Pub/Sub

**Key Methods**:
- `on(eventType, callback)`: Subscribe to events
- `emit(eventType, data)`: Publish events
- `off(eventType, callback)`: Unsubscribe
- `once(eventType, callback)`: Subscribe once

**Usage**:
```typescript
// Subscribe
const unsubscribe = eventBus.on('player:level_up', (event) => {
  console.log('Level up!', event.data);
});

// Emit
eventBus.emit('player:level_up', { level: 5 });

// Unsubscribe
unsubscribe();
```

#### GameLoop
**Purpose**: Manages game update cycle

**Pattern**: Singleton

**Features**:
- 60 FPS fixed timestep for game logic
- Variable timestep for rendering
- Delta time calculation
- Frame skipping prevention

**Update Types**:
1. **Variable Update**: Runs every frame (UI, animations)
2. **Fixed Update**: Runs at 60 FPS (game logic, physics)

**Code Flow**:
```
requestAnimationFrame
  └─> Calculate deltaTime
      ├─> Variable Update (deltaTime)
      │   └─> UI updates, animations
      │
      └─> Fixed Update (1/60s)
          └─> Game logic, plant growth, etc.
```

#### GameEngine
**Purpose**: Main orchestrator

**Pattern**: Singleton + Facade

**Responsibilities**:
- Initialize all managers
- Coordinate game lifecycle
- Handle save/load
- Calculate offline progress

**Lifecycle**:
```
initialize() → start() → [running] → pause() → resume() → save()
```

### Managers (`/src/managers`)

Each manager is responsible for a specific game system.

#### ResourceManager
**Manages**: Money, Cannabis, Reputation, XP, Level

**Key Operations**:
- `addMoney(amount)`: Add money to player
- `spendMoney(amount)`: Spend money (with validation)
- `addCannabis(amount)`: Add cannabis
- `sellCannabis(amount, price)`: Convert cannabis to money
- `addExperience(amount)`: Add XP (handles level ups)

**Events Emitted**:
- `player:money_change`
- `player:cannabis_change`
- `player:level_up`

#### FarmManager
**Manages**: Plants, Growth, Harvesting

**Key Operations**:
- `plantSeed(plotId, plantId)`: Plant a seed
- `waterPlant(plotId)`: Water a plant
- `fertilizePlant(plotId)`: Fertilize a plant
- `harvestPlant(plotId)`: Harvest ready plant
- `update(deltaTime)`: Update all plants

**Plant Growth Stages**:
1. Seed (0-15% growth)
2. Seedling (15-40%)
3. Vegetative (40-75%)
4. Flowering (75-100%)
5. Ready (100%)

**Growth Modifiers**:
- Watered: +20% speed
- Fertilized: +50% speed
- Health: Affects yield
- Quality: Random (Low/Medium/High/Premium)

**Events Emitted**:
- `plant:planted`
- `plant:stage_change`
- `plant:harvested`
- `plant:died`

#### UpgradeManager
**Manages**: Upgrades and their effects

**Key Operations**:
- `purchaseUpgrade(upgradeId)`: Buy an upgrade
- `canPurchaseUpgrade(upgradeId)`: Check if affordable
- `getUpgradeCost(upgradeId)`: Calculate cost

**Upgrade Categories**:
- Click Power
- Growth Speed
- Yield
- Quality
- Automation
- Storage
- Security

**Cost Scaling**:
```
cost = baseCost × (multiplier ^ currentLevel)
```

**Events Emitted**:
- `upgrade:purchased`

#### QuestManager
**Manages**: Quests and objectives

**Key Operations**:
- `startQuest(questId)`: Begin a quest
- `updateProgress(questId, amount)`: Update progress
- `claimRewards(questId)`: Claim rewards

**Quest Types**:
- Harvest X plants
- Earn X money
- Grow X plants
- Reach level X
- Purchase X upgrades
- Survive X raids

**Quest States**:
1. Locked → Unavailable (level requirement)
2. Available → Can be started
3. In Progress → Currently active
4. Completed → Finished, can claim rewards
5. Claimed → Rewards collected

**Events Emitted**:
- `quest:progress`
- `quest:completed`

#### PoliceManager
**Manages**: Police heat, raids, risk

**Key Operations**:
- `increaseHeat(amount)`: Raise heat level
- `decreaseHeat(amount)`: Lower heat level
- `triggerRaid()`: Force a raid
- `bribe(amount)`: Pay to reduce heat

**Heat System**:
- Heat increases with harvests
- Heat decreases over time
- Raid chance based on heat level
- Raid severity based on heat

**Raid Outcomes**:
- **Escaped**: No loss (50% base chance)
- **Caught**: Lose money, cannabis, plants

**Events Emitted**:
- `police:heat_change`
- `police:raid`
- `police:inspection`

#### TickManager
**Manages**: Idle progress, passive income

**Key Operations**:
- `update(deltaTime)`: Process idle earnings
- `calculateOfflineProgress(time)`: Calculate offline earnings

**Passive Systems**:
- Passive income ($/second)
- Auto-harvest (if unlocked)
- Auto-water (if unlocked)

**Offline Progress**:
- Capped at 8 hours
- 50% efficiency
- Calculates estimated harvests

#### StorageManager
**Manages**: Save/load, persistence

**Pattern**: Singleton

**Key Operations**:
- `saveGame(gameState)`: Save to LocalStorage
- `loadGame()`: Load from LocalStorage
- `exportSave()`: Download save file
- `importSave(file)`: Upload save file
- `clearGame()`: Delete save

**Save File Format**:
```typescript
{
  version: "1.0.0",
  timestamp: 1234567890,
  gameState: { /* full game state */ },
  checksum: "abc123" // integrity check
}
```

**Features**:
- Checksum validation
- Version compatibility
- Import/export as JSON
- Auto-save
- Backup save slot

#### UIManager
**Manages**: DOM manipulation, rendering

**Pattern**: Singleton

**Key Operations**:
- `initialize()`: Build UI structure
- `update(deltaTime)`: Render updates
- `showNotification(message)`: Display toast

**Optimization Techniques**:
1. **Element Caching**: Store references to frequently accessed elements
2. **Update Batching**: Group DOM updates in requestAnimationFrame
3. **Dirty Checking**: Only update changed values
4. **Virtual Updates**: Calculate changes before DOM manipulation

**Update Queue**:
```
State Change → Queue Update → RAF → Batch Update → DOM
```

## State Management

### GameState Structure

```typescript
interface GameState {
  player: PlayerState;          // Money, cannabis, level, etc.
  plots: PlotState[];            // Farm plots and plants
  upgrades: Record<string, UpgradeState>;  // Purchased upgrades
  quests: Record<string, QuestState>;      // Quest progress
  police: PoliceState;           // Heat, raids
  statistics: GameStatistics;    // Totals, achievements
  settings: GameSettings;        // User preferences
  version: string;               // Save version
  lastSaved: number;             // Timestamp
  lastPlayed: number;            // Timestamp
  playtime: number;              // Total seconds played
}
```

### State Updates

All state updates go through managers:

```
User Action → Manager Method → State Update → Event Emit → UI Update
```

Example:
```
Click Harvest → farmManager.harvestPlant()
  → gameState.player.cannabis += yield
  → eventBus.emit('plant:harvested')
  → uiManager.updateCannabis()
```

## Event System

### Event Flow

```
┌──────────────┐
│   Manager    │
│  (Publisher) │
└──────┬───────┘
       │ emit()
       ▼
┌──────────────┐
│   EventBus   │
└──────┬───────┘
       │ notify()
       ▼
┌──────────────┐
│   Manager    │
│ (Subscriber) │
└──────────────┘
```

### Event Types

**Player Events**:
- `player:money_change`
- `player:cannabis_change`
- `player:level_up`
- `player:reputation_change`

**Plant Events**:
- `plant:planted`
- `plant:stage_change`
- `plant:harvested`
- `plant:died`

**System Events**:
- `game:tick`
- `game:save`
- `game:load`
- `ui:update`

**Upgrade Events**:
- `upgrade:purchased`

**Quest Events**:
- `quest:progress`
- `quest:completed`

**Police Events**:
- `police:heat_change`
- `police:raid`
- `police:inspection`

## Performance Optimization

### 1. Game Loop Optimization

**Fixed Timestep**:
- Game logic runs at consistent 60 FPS
- Independent of frame rate
- Prevents timing issues

**Delta Time**:
- Smooth animations
- Frame-rate independent
- Capped to prevent large jumps

### 2. Rendering Optimization

**Batched Updates**:
```typescript
// Instead of updating immediately
element.textContent = value; // ❌

// Queue update
this.queueUpdate('money');   // ✓
// Batch render in RAF
requestAnimationFrame(() => this.render());
```

**Dirty Checking**:
```typescript
if (currentValue !== lastValue) {
  updateDOM(currentValue);
  lastValue = currentValue;
}
```

### 3. Memory Optimization

**Event Cleanup**:
```typescript
// Always return unsubscribe function
const unsubscribe = eventBus.on('event', handler);

// Clean up when done
onDestroy(() => unsubscribe());
```

**Circular Reference Prevention**:
- Avoid storing references to DOM elements in game state
- Use WeakMaps for object associations
- Clear intervals/timeouts

### 4. Storage Optimization

**Compression**:
- Remove unnecessary data before saving
- Use efficient data structures
- Implement save versioning

**Lazy Loading**:
- Load configs on demand
- Split large data files
- Cache frequently accessed data

## Testing Strategy

### Unit Tests

**Coverage Goals**:
- Core: 90%+
- Managers: 80%+
- Utils: 95%+

**Test Structure**:
```typescript
describe('Manager', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it('should do something', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Integration Tests

Test manager interactions:
```typescript
it('should harvest plant and add resources', () => {
  farmManager.plantSeed(0, 'basic_strain');
  // Fast-forward time
  farmManager.harvestPlant(0);
  expect(resourceManager.getCannabis()).toBeGreaterThan(0);
});
```

### E2E Tests

Test complete user flows:
1. Plant → Wait → Harvest → Sell
2. Complete quest → Claim reward
3. Buy upgrade → See effect

## Scalability Considerations

### Adding New Features

**New Plant Type**:
1. Add to `/src/config/plants.ts`
2. No code changes needed
3. Configuration-driven

**New Upgrade**:
1. Add to `/src/config/upgrades.ts`
2. Implement effect in manager if new type
3. Add tests

**New Quest Type**:
1. Add enum to types
2. Add to `/src/config/quests.ts`
3. Add tracking in QuestManager

### Performance at Scale

**Many Plants**:
- Update only active plots
- Batch plant updates
- Use object pooling

**Many Upgrades**:
- Cache calculated totals
- Lazy recalculation
- Efficient lookups with Maps

**Long Play Sessions**:
- Periodic garbage collection hints
- Event history pruning
- Log rotation

## Best Practices

### Code Organization

1. **One class per file**
2. **Group related functionality**
3. **Use barrel exports** (`index.ts`)
4. **Clear naming conventions**

### TypeScript Usage

1. **Strict mode enabled**
2. **Prefer interfaces over types**
3. **Use enums for constants**
4. **Avoid `any` type**

### Error Handling

1. **Try-catch in async code**
2. **Validate user input**
3. **Graceful degradation**
4. **Log errors for debugging**

### Documentation

1. **JSDoc for public APIs**
2. **README for setup**
3. **Architecture docs for design**
4. **Inline comments for complex logic**

## Security Considerations

1. **Input Sanitization**: Validate all user input
2. **Save Validation**: Checksum verification
3. **Cheat Prevention**: Server-side validation (if multiplayer)
4. **XSS Protection**: Sanitize displayed strings

## Future Enhancements

### Potential Features

1. **Prestige System**: Reset for permanent bonuses
2. **Achievements**: Track milestones
3. **Events**: Random positive/negative events
4. **Multiplayer**: Leaderboards, trading
5. **Genetics**: Breed new strains
6. **Seasons**: Time-based mechanics
7. **Weather**: Affects growth
8. **Customers**: Manage demand

### Technical Improvements

1. **Web Workers**: Offload calculations
2. **IndexedDB**: Larger storage capacity
3. **Service Worker**: Offline support
4. **WebGL**: Advanced graphics
5. **Sound System**: Audio feedback
6. **Analytics**: Track player behavior

---

**This architecture is designed to be:**
- ✅ Scalable
- ✅ Maintainable
- ✅ Testable
- ✅ Performant
- ✅ Type-safe
- ✅ Well-documented
