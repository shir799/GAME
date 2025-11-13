# Cannabis Manager - Idle/Clicker Game

A professional, scalable idle/clicker game built with TypeScript, Vite, and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
- [Development](#development)
- [Testing](#testing)
- [Build & Deploy](#build--deploy)
- [Game Mechanics](#game-mechanics)
- [Contributing](#contributing)

## Features

- **Idle/Clicker Gameplay**: Plant, grow, and harvest cannabis plants
- **Progression System**: Level up, unlock upgrades, and complete quests
- **Risk Management**: Avoid police raids and manage heat levels
- **Offline Progress**: Earn money even when the game is closed
- **Save System**: LocalStorage persistence with import/export
- **Responsive UI**: Works on desktop and mobile
- **Type-Safe**: Built with TypeScript for reliability
- **Performant**: Optimized game loop and rendering

## Tech Stack

- **Language**: TypeScript 5.3+
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4
- **Testing**: Vitest 1.1
- **Code Quality**: ESLint + Prettier
- **Storage**: LocalStorage API

## Design System

Ein komplettes, modernes UI/UX Design System speziell für Cannabis Manager entwickelt.

### Features

- **Modern & Clean**: Inspiriert von Clash Royale und modernen Web-Apps
- **Cannabis-Thematisch**: Elegante Grün-Töne ohne Kitsch
- **Mobile-First**: Optimiert für Touch-Interaktion
- **Dark Mode**: Vollständige Dark Mode Unterstützung
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: CSS-optimiert, nur `transform` und `opacity` Animationen

### Dokumentation

- **[Design System Docs](/home/user/GAME/docs/design-system.md)**: Komplette Design-Dokumentation
  - Color Palette (Primary, Secondary, Accent, Success, Danger, Neutral)
  - Typography (Inter, Montserrat, JetBrains Mono)
  - Layout System (Mobile-First, Responsive Breakpoints)
  - Component Library (Buttons, Cards, Modals, Forms, etc.)
  - Animations & Transitions
  - Accessibility Guidelines

- **[Icon System](/home/user/GAME/docs/icons.md)**: Icon-Dokumentation
  - 40+ Lucide Icons
  - Verwendungs-Guidelines
  - Accessibility Best Practices

- **[Components Examples](/home/user/GAME/components-examples/)**: Live HTML-Beispiele
  - `complete-demo.html`: Vollständige Demo aller Components
  - `farm-ui.html`: Farm-Interface mit Pflanzen-Grid
  - Weitere game-spezifische UI-Components

### Quick Start

```bash
# 1. Google Fonts einbinden (in index.html <head>)
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

# 2. Lucide Icons installieren
npm install lucide-react
# oder CDN:
<script src="https://unpkg.com/lucide@latest"></script>

# 3. Tailwind Config verwenden
# Siehe tailwind.config.js im Root

# 4. Global Styles einbinden
# Siehe src/styles.css
```

### Color Palette

```css
/* Primary - Emerald Green */
primary-500: #10b981

/* Secondary - Deep Purple */
secondary-500: #a855f7

/* Accent - Amber/Gold */
accent-500: #f59e0b

/* Success, Danger, Warning */
success-500: #22c55e
danger-500: #ef4444
warning-500: #f97316
```

### Component Examples

```html
<!-- Primary Button -->
<button class="btn-primary">
  Aktion
</button>

<!-- Plant Card -->
<div class="card-plant">
  <!-- Plant content -->
</div>

<!-- Resource Display -->
<div class="resource-coins">
  <i data-lucide="dollar-sign" class="w-4 h-4"></i>
  <span class="number-display">12,500</span>
</div>
```

### Demo ansehen

Öffne `/home/user/GAME/components-examples/complete-demo.html` im Browser für eine Live-Demo aller Components.

## Project Structure

```
cannabis-manager-game/
├── src/
│   ├── core/                    # Core game engine
│   │   ├── EventBus.ts         # Event system
│   │   ├── GameLoop.ts         # Game loop (60 FPS)
│   │   └── GameEngine.ts       # Main engine orchestrator
│   │
│   ├── managers/                # Game systems managers
│   │   ├── ResourceManager.ts  # Money, cannabis, XP
│   │   ├── FarmManager.ts      # Plants & harvesting
│   │   ├── UpgradeManager.ts   # Upgrades system
│   │   ├── QuestManager.ts     # Quests & objectives
│   │   ├── PoliceManager.ts    # Risk & raids
│   │   ├── TickManager.ts      # Idle & offline progress
│   │   ├── StorageManager.ts   # Save/load system
│   │   └── UIManager.ts        # DOM manipulation
│   │
│   ├── types/                   # TypeScript definitions
│   │   └── index.ts            # All game types & interfaces
│   │
│   ├── config/                  # Game configuration
│   │   ├── defaults.ts         # Default game state
│   │   ├── plants.ts           # Plant configurations
│   │   ├── upgrades.ts         # Upgrade configurations
│   │   └── quests.ts           # Quest configurations
│   │
│   ├── utils/                   # Utility functions
│   │   ├── formatters.ts       # Number/currency formatting
│   │   ├── logger.ts           # Development logger
│   │   └── validators.ts       # Input validation
│   │
│   ├── __tests__/              # Unit tests
│   │   ├── ResourceManager.test.ts
│   │   └── formatters.test.ts
│   │
│   ├── main.ts                 # Entry point
│   └── style.css               # Global styles
│
├── public/                      # Static assets
├── dist/                        # Build output
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
├── vitest.config.ts            # Test config
├── tailwind.config.js          # Tailwind config
├── .eslintrc.json              # ESLint config
├── .prettierrc.json            # Prettier config
└── README.md                   # This file
```

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         GAME ENGINE                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   EventBus   │  │   GameLoop   │  │  GameEngine  │          │
│  │  (Pub/Sub)   │  │  (60 FPS)    │  │ (Singleton)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Manages
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         MANAGERS                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Resource    │  │     Farm     │  │   Upgrade    │          │
│  │   Manager    │  │   Manager    │  │   Manager    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    Quest     │  │    Police    │  │     Tick     │          │
│  │   Manager    │  │   Manager    │  │   Manager    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐                             │
│  │   Storage    │  │      UI      │                             │
│  │   Manager    │  │   Manager    │                             │
│  └──────────────┘  └──────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Uses
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        GAME STATE                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Player, Plots, Upgrades, Quests, Police, Statistics   │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Persisted to
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LOCAL STORAGE                               │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Input** → EventBus → Manager → GameState → UIManager → DOM
2. **Game Loop** → Managers (update) → GameState → EventBus → UIManager
3. **Save System** → GameState → StorageManager → LocalStorage
4. **Load System** → LocalStorage → StorageManager → GameState → Managers

### Key Design Patterns

#### 1. Singleton Pattern
Used for core systems that should only have one instance:
- `GameEngine`
- `EventBus`
- `GameLoop`
- `StorageManager`
- `UIManager`

#### 2. Publish-Subscribe Pattern
`EventBus` implements pub/sub for decoupled communication:
```typescript
// Publisher
eventBus.emit('player:level_up', { level: 5 });

// Subscriber
eventBus.on('player:level_up', (event) => {
  console.log(`Level up! New level: ${event.data.level}`);
});
```

#### 3. Manager Pattern
Each game system has a dedicated manager:
- Single responsibility
- Clear interfaces
- Easy to test
- Scalable

#### 4. State Management
Centralized game state with immutable updates:
```typescript
interface GameState {
  player: PlayerState;
  plots: PlotState[];
  upgrades: Record<string, UpgradeState>;
  // ...
}
```

### Game Loop Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     requestAnimationFrame                        │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────┐      │
│  │              Calculate Delta Time                     │      │
│  │            (time since last frame)                    │      │
│  └──────────────────────────────────────────────────────┘      │
│                              │                                   │
│                    ┌─────────┴─────────┐                        │
│                    ▼                   ▼                         │
│  ┌─────────────────────────┐  ┌─────────────────────────┐      │
│  │    Variable Update      │  │    Fixed Update         │      │
│  │  (every frame)          │  │  (60 FPS fixed)         │      │
│  │  - UI updates           │  │  - Game logic           │      │
│  │  - Animations           │  │  - Plant growth         │      │
│  │  - Rendering            │  │  - Police system        │      │
│  └─────────────────────────┘  │  - Tick manager         │      │
│                                └─────────────────────────┘      │
│                                          │                       │
│                                          ▼                       │
│                              ┌──────────────────────┐           │
│                              │   Emit Tick Event    │           │
│                              │   to all managers    │           │
│                              └──────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GAME
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Development Workflow

1. **Hot Module Replacement**: Changes reflect instantly
2. **Type Checking**: TypeScript validates in real-time
3. **Linting**: ESLint catches issues automatically
4. **Testing**: Vitest runs tests in watch mode

### Adding New Features

#### 1. Add New Plant Type
Edit `/src/config/plants.ts`:
```typescript
{
  id: 'new_strain',
  name: 'New Strain',
  baseGrowTime: 600,
  baseCannabisYield: 30,
  // ...
}
```

#### 2. Add New Upgrade
Edit `/src/config/upgrades.ts`:
```typescript
{
  id: 'new_upgrade',
  name: 'New Upgrade',
  category: UpgradeCategory.GROWTH_SPEED,
  effect: { type: 'multiplicative', value: 1.5, target: 'growthSpeed' },
  // ...
}
```

#### 3. Add New Quest
Edit `/src/config/quests.ts`:
```typescript
{
  id: 'new_quest',
  name: 'New Quest',
  type: QuestType.HARVEST,
  target: 10,
  rewards: [{ type: 'money', value: 500 }],
  // ...
}
```

## Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Run specific test file
npm run test ResourceManager.test.ts

# Run with coverage
npm run test:coverage
```

### Test Structure

```typescript
describe('ResourceManager', () => {
  let gameState: GameState;
  let resourceManager: ResourceManager;

  beforeEach(() => {
    gameState = createDefaultGameState();
    resourceManager = new ResourceManager(gameState);
  });

  it('should add money correctly', () => {
    resourceManager.addMoney(100);
    expect(gameState.player.money).toBe(200);
  });
});
```

### Coverage Goals

- **Core Systems**: 90%+ coverage
- **Managers**: 80%+ coverage
- **Utils**: 95%+ coverage

## Build & Deploy

### Production Build

```bash
# Build optimized production bundle
npm run build
```

Output in `/dist` folder:
- Minified JavaScript
- Optimized CSS
- Source maps
- Asset optimization

### Deployment

The game is a static site and can be deployed to:

#### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

#### Vercel
```bash
vercel --prod
```

#### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

#### Any Static Host
Just upload the `dist` folder contents.

### Performance Optimization

- **Code Splitting**: Automatic via Vite
- **Tree Shaking**: Dead code elimination
- **Minification**: Terser compression
- **Asset Optimization**: Image and font optimization
- **Lazy Loading**: Dynamic imports for large features

## Game Mechanics

### Core Loop

1. **Plant Seeds** → Wait for growth
2. **Water & Fertilize** → Increase yield
3. **Harvest Plants** → Get cannabis + money
4. **Buy Upgrades** → Improve efficiency
5. **Complete Quests** → Earn rewards
6. **Avoid Police** → Manage heat level

### Progression Systems

#### Experience & Leveling
- Gain XP from harvests and earnings
- Level up unlocks new plants, upgrades, and quests
- Exponential XP scaling

#### Upgrades
Categories:
- **Click Power**: Increase manual earnings
- **Growth Speed**: Plants grow faster
- **Yield**: More cannabis per harvest
- **Quality**: Better plant quality
- **Automation**: Auto-water, auto-harvest
- **Security**: Reduce police heat

#### Quests
Types:
- Tutorial quests (one-time)
- Progression quests (milestones)
- Daily quests (repeatable)

#### Police System
- Heat increases with harvests
- Random raids based on heat level
- Bribe police to reduce heat
- Security upgrades reduce risk

### Offline Progress

When you return after being offline:
- Passive income calculated (up to 8 hours)
- Plants continue growing
- Capped at 8 hours to prevent abuse

## Performance Considerations

### Optimizations

1. **Update Batching**: UI updates batched with requestAnimationFrame
2. **DOM Caching**: Frequently accessed elements cached
3. **Event Throttling**: High-frequency events throttled
4. **Delta Time**: Consistent game logic regardless of FPS
5. **Fixed Timestep**: Physics-like updates at 60 FPS

### Memory Management

- Event listeners cleaned up properly
- Old save data pruned
- Circular references avoided
- WeakMaps for object references

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier (2 spaces, single quotes)
- **Linting**: ESLint with recommended rules
- **Naming**: camelCase for variables, PascalCase for classes

### Commit Messages

Follow conventional commits:
```
feat: add new plant type
fix: resolve save corruption issue
docs: update architecture diagram
test: add FarmManager tests
```

### Pull Request Process

1. Fork the repository
2. Create feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Update documentation
6. Submit pull request

## License

MIT License - See LICENSE file for details

## Credits

Built with TypeScript, Vite, and Tailwind CSS.

---

**Happy Growing!** 🌿
