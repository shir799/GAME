# Cannabis Tycoon - Visual Design System

Professional visual design system for a modern cannabis management idle/clicker game.

---

## Design Philosophy

**Style**: Flat/Material Design with character
**Inspiration**: Clash Royale quality, modern mobile games
**Target**: Professional, engaging, not cartoonish
**Approach**: Clean, optimized, performant

---

## Color System

### Primary Palette

```css
/* Cannabis Green - Main brand color */
--color-primary: #10B981;        /* Tailwind green-500 */
--color-primary-dark: #059669;   /* Tailwind green-600 */
--color-primary-light: #34D399;  /* Tailwind green-400 */

/* Premium/Special */
--color-premium: #8B5CF6;        /* Tailwind purple-500 */
--color-gold: #F59E0B;           /* Tailwind amber-500 */

/* Danger/Police */
--color-danger: #EF4444;         /* Tailwind red-500 */
--color-warning: #F59E0B;        /* Tailwind amber-500 */

/* Neutral */
--color-bg-dark: #1F2937;        /* Tailwind gray-800 */
--color-bg-light: #F9FAFB;       /* Tailwind gray-50 */
--color-text: #111827;           /* Tailwind gray-900 */
--color-text-muted: #6B7280;     /* Tailwind gray-500 */
```

### Strain-Specific Colors

**Indica** (Body-high, relaxing)
- Primary: `#059669` (Emerald-600) - Deep, earthy green
- Accent: `#065F46` (Emerald-800)
- Visual: Shorter, bushier plants, darker green

**Sativa** (Head-high, energizing)
- Primary: `#84CC16` (Lime-500) - Bright, vibrant green
- Accent: `#65A30D` (Lime-600)
- Visual: Taller, lankier plants, lighter green

**Hybrid** (Balanced)
- Primary: `#14B8A6` (Teal-500) - Balanced blue-green
- Accent: `#0D9488` (Teal-600)
- Visual: Medium height, mixed characteristics

### Quality/Rarity Tiers

```css
/* Common */
--quality-common: #9CA3AF;       /* Gray-400 */

/* Uncommon */
--quality-uncommon: #10B981;     /* Green-500 */

/* Rare */
--quality-rare: #3B82F6;         /* Blue-500 */

/* Epic */
--quality-epic: #8B5CF6;         /* Purple-500 */

/* Legendary */
--quality-legendary: #F59E0B;    /* Amber-500 */
```

---

## Typography

### Font Stack

```css
/* Primary Font - UI/Interface */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

/* Numbers/Stats - Tabular */
font-family: 'Inter', monospace;
font-variant-numeric: tabular-nums;

/* Display/Headers */
font-family: 'Inter', sans-serif;
font-weight: 700;
letter-spacing: -0.02em;
```

### Type Scale

```css
/* Display */
.text-display: 48px / 56px (3rem / 3.5rem)

/* H1 */
.text-h1: 36px / 40px (2.25rem / 2.5rem)

/* H2 */
.text-h2: 30px / 36px (1.875rem / 2.25rem)

/* H3 */
.text-h3: 24px / 32px (1.5rem / 2rem)

/* Body Large */
.text-body-lg: 18px / 28px (1.125rem / 1.75rem)

/* Body */
.text-body: 16px / 24px (1rem / 1.5rem)

/* Small */
.text-small: 14px / 20px (0.875rem / 1.25rem)

/* Caption */
.text-caption: 12px / 16px (0.75rem / 1rem)
```

---

## Icon System

### Icon Specifications

- **Format**: Inline SVG
- **ViewBox**: 24x24
- **Stroke Width**: 2px (main elements), 1.5px (details)
- **Style**: Line-based with optional fills
- **Corners**: Rounded (stroke-linecap: round)
- **Color**: currentColor (inherits text color)

### Icon Categories

**Resources** (5 icons)
- money, cannabisBud, premiumCurrency, seeds, experience

**Plants/Strains** (6 icons)
- indicaPlant, sativaPlant, hybridPlant, seedling, maturePlant, wiltedPlant

**Buildings** (5 icons)
- basement, backyard, warehouse, plantation, laboratory

**Equipment** (8 icons)
- growLight, wateringCan, fertilizer, ventilation, temperature, humidity, scissors, pot

**Actions** (5 icons)
- plant, harvest, sell, upgrade, craft

**Workers** (5 icons)
- gardener, trimmer, dealer, security, scientist

**Police/Risk** (4 icons)
- police, raid, camera, lock

**UI** (8 icons)
- settings, shop, quest, stats, close, menu, info, trophy

**Status** (4 icons)
- levelUp, star, prestige, clock

### Usage Example

```javascript
import { getIcon, iconColors } from './icons.js';

// Get icon with default styling
const icon = getIcon('cannabisBud', 'w-8 h-8 text-green-500');

// With predefined colors
const icon = getIcon('money', `w-6 h-6 ${iconColors.money}`);
```

---

## Character & Avatar Style

### Style Direction

**Not**: Realistic, highly detailed, or photographic
**Not**: Chibi or overly cute anime style
**Yes**: Simplified, stylized characters with personality
**Yes**: Clash Royale-inspired (readable, memorable, characterful)

### Character Design Principles

1. **Silhouette First**: Recognizable from shape alone
2. **Bold Features**: Exaggerated but not cartoonish
3. **Limited Detail**: Focus on key identifying features
4. **Strong Color Coding**: Each character has signature color

### Character Types

**Rookie Grower** (Player avatar starter)
- Build: Average, approachable
- Colors: Green hoodie, jeans
- Traits: Eager, learning, optimistic
- Icon: Simple person with leaf symbol

**Veteran Grower** (Mid-game)
- Build: Confident stance
- Colors: Dark green, earth tones
- Traits: Experienced, calm, focused
- Icon: Person with grow light

**Master Cultivator** (End-game)
- Build: Commanding presence
- Colors: Deep green with gold accents
- Traits: Expert, prestigious, respected
- Icon: Person with multiple plants

**The Scientist**
- Build: Lean, focused
- Colors: White lab coat, purple accents
- Traits: Analytical, innovative
- Icon: Goggles and beaker

**The Dealer**
- Build: Street-smart
- Colors: Black, urban style
- Traits: Savvy, connected, quick
- Icon: Money and briefcase

**The Security Guard**
- Build: Strong, protective
- Colors: Dark blue/black
- Traits: Alert, loyal, tough
- Icon: Shield and badge

**The Officer** (Antagonist)
- Build: Authoritative
- Colors: Police blue, red accents
- Traits: Suspicious, persistent
- Icon: Badge and hat

### Implementation Approach

Characters should be implemented as:
1. **Icon representations** (24x24px) - For UI, lists, achievements
2. **Avatar versions** (128x128px) - For profiles, story moments
3. **Illustration style** (SVG paths) - Scalable, performant

---

## Environment & Background Styles

### Location Aesthetics

#### Basement/Indoor Grow
**Mood**: Underground, hidden, beginner
**Colors**: Dark gray (#374151), warm lighting (#F59E0B)
**Elements**: Concrete walls, pipes, basic equipment
**Lighting**: Artificial, focused grow lights

```css
.environment-basement {
  background: linear-gradient(180deg, #1F2937 0%, #111827 100%);
  border: 2px solid #374151;
}
```

#### Backyard/Small Outdoor
**Mood**: Natural, risky, DIY
**Colors**: Earth browns (#78350F), grass green (#16A34A)
**Elements**: Fence, soil, sun
**Lighting**: Natural daylight

```css
.environment-backyard {
  background: linear-gradient(180deg, #DBEAFE 0%, #86EFAC 100%);
  border: 2px solid #16A34A;
}
```

#### Warehouse/Professional
**Mood**: Industrial, organized, profitable
**Colors**: Steel gray (#64748B), clean white (#F8FAFC)
**Elements**: Shelves, organized rows, ventilation
**Lighting**: Mixed natural and artificial

```css
.environment-warehouse {
  background: linear-gradient(180deg, #F1F5F9 0%, #CBD5E1 100%);
  border: 2px solid #64748B;
}
```

#### Plantation/Large Scale
**Mood**: Expansive, natural, high-volume
**Colors**: Rich greens (#15803D), blue sky (#3B82F6)
**Elements**: Open fields, rows of plants, sun
**Lighting**: Bright natural light

```css
.environment-plantation {
  background: linear-gradient(180deg, #7DD3FC 0%, #4ADE80 100%);
  border: 2px solid #15803D;
}
```

#### Laboratory/High-Tech
**Mood**: Scientific, advanced, experimental
**Colors**: Clean white (#FFFFFF), tech blue (#2563EB), purple (#7C3AED)
**Elements**: Equipment, screens, modern tech
**Lighting**: Clinical, precise

```css
.environment-laboratory {
  background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
  border: 2px solid #6366F1;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
}
```

### Background Patterns

```css
/* Tile pattern for indoor */
.bg-pattern-tiles {
  background-image:
    linear-gradient(45deg, #374151 25%, transparent 25%),
    linear-gradient(-45deg, #374151 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #374151 75%),
    linear-gradient(-45deg, transparent 75%, #374151 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

/* Grass pattern for outdoor */
.bg-pattern-grass {
  background-image: repeating-linear-gradient(
    0deg,
    #16A34A,
    #16A34A 2px,
    #22C55E 2px,
    #22C55E 4px
  );
}

/* Circuit pattern for lab */
.bg-pattern-circuit {
  background-color: #1E293B;
  background-image:
    linear-gradient(#334155 1px, transparent 1px),
    linear-gradient(90deg, #334155 1px, transparent 1px);
  background-size: 20px 20px;
}
```

---

## Plant Visualization System

### Growth Stages

**Stage 1: Seed**
- Size: 20% of final
- Icon: Simple dot/circle
- Color: Brown (#92400E)

**Stage 2: Seedling**
- Size: 40% of final
- Icon: Small sprout with 2 leaves
- Color: Light green (#86EFAC)

**Stage 3: Vegetative**
- Size: 70% of final
- Icon: Multiple branches, more leaves
- Color: Medium green (#22C55E)

**Stage 4: Flowering**
- Size: 90% of final
- Icon: Buds forming on branches
- Color: Deep green (#15803D) with bud highlights

**Stage 5: Mature/Harvest Ready**
- Size: 100%
- Icon: Full buds, prominent
- Color: Rich green (#166534) with golden/orange accents
- Effect: Subtle glow animation

### Health States

```css
/* Healthy */
.plant-healthy {
  filter: none;
  opacity: 1;
}

/* Thirsty */
.plant-thirsty {
  filter: saturate(0.7) brightness(0.9);
}

/* Sick */
.plant-sick {
  filter: saturate(0.3) brightness(0.8);
  opacity: 0.8;
}

/* Dead */
.plant-dead {
  filter: grayscale(1) brightness(0.6);
  opacity: 0.5;
}

/* Premium/Boosted */
.plant-premium {
  filter: saturate(1.3) brightness(1.1);
  animation: glow 2s ease-in-out infinite;
}
```

---

## UI Component Styles

### Buttons

```css
/* Primary Action */
.btn-primary {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.4);
}

/* Premium/Special */
.btn-premium {
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  color: white;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3);
}

/* Danger/Destructive */
.btn-danger {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  font-weight: 600;
  border-radius: 8px;
}

/* Secondary/Outline */
.btn-secondary {
  background: transparent;
  color: #10B981;
  border: 2px solid #10B981;
  font-weight: 600;
  border-radius: 8px;
}
```

### Cards

```css
/* Standard Card */
.card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E7EB;
}

/* Card with glow (upgraded/special) */
.card-glow {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 0 20px rgba(16, 185, 129, 0.2);
}

/* Premium Card */
.card-premium {
  background: linear-gradient(135deg, #F9FAFB 0%, #F3E8FF 100%);
  border: 2px solid #A855F7;
}
```

### Progress Bars

```css
.progress-bar {
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10B981 0%, #34D399 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* Growth progress (plant-specific) */
.progress-fill-plant {
  background: linear-gradient(90deg, #86EFAC 0%, #10B981 100%);
}

/* Premium/XP progress */
.progress-fill-premium {
  background: linear-gradient(90deg, #A78BFA 0%, #8B5CF6 100%);
}
```

### Tooltips

```css
.tooltip {
  background: #1F2937;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 200px;
}

.tooltip::after {
  content: '';
  position: absolute;
  border: 6px solid transparent;
  border-top-color: #1F2937;
}
```

---

## Loading States

### Custom Cannabis Spinner

```html
<div class="spinner-container">
  <svg class="animate-spinner w-12 h-12 text-green-500" viewBox="0 0 24 24">
    <!-- Cannabis leaf spinning -->
    <path d="M12 2C12 2 10 4 10 6C10 6 8 5 7 7..."
          stroke="currentColor"
          stroke-width="2"
          fill="none"/>
  </svg>
</div>
```

### Progress Indicators

**Circular Progress** (for timed actions like growing)
```css
.circular-progress {
  transform: rotate(-90deg);
  stroke-dasharray: 283; /* 2 * PI * r (r=45) */
  stroke-dashoffset: 283;
  animation: fillProgress 3s ease forwards;
}
```

**Linear Progress** (for upgrades, research)
```css
.linear-progress {
  width: 0%;
  animation: growthProgress 3s ease forwards;
}
```

### Empty States

**No Plants Yet**
- Icon: Seedling (muted)
- Message: "Start your grow operation!"
- CTA: "Plant Your First Seed"

**No Money**
- Icon: Money (muted)
- Message: "Time to harvest and sell!"
- CTA: "Collect Revenue"

---

## Logo & Branding

### Game Title Options

**Option 1: "Cannabis Tycoon"**
- Classic business sim naming
- Clear, direct
- Professional

**Option 2: "Green Empire"**
- More subtle
- Scalable concept
- Prestige-focused

**Option 3: "Grow Kingdom"**
- Playful but professional
- Growth-focused
- Kingdom-building angle

**SELECTED: Cannabis Tycoon**

### Logo Concept

```
Style: Wordmark with icon
Icon: Stylized cannabis leaf (simplified, 3-5 points)
Colors: Primary green (#10B981) with gold accent (#F59E0B)
Typography: Bold, modern sans-serif (Inter Bold)
```

Logo SVG:
```html
<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
  <!-- Simplified cannabis leaf icon -->
  <path d="M30 10C30 10 25 15 25 20C25 20 20 18 18 22C18 22 15 24 17 28..."
        fill="#10B981" />

  <!-- "CANNABIS" text -->
  <text x="50" y="25"
        font-family="Inter, sans-serif"
        font-weight="700"
        font-size="16"
        fill="#1F2937">CANNABIS</text>

  <!-- "TYCOON" text -->
  <text x="50" y="45"
        font-family="Inter, sans-serif"
        font-weight="700"
        font-size="20"
        fill="#10B981">TYCOON</text>

  <!-- Gold accent line -->
  <rect x="50" y="48" width="60" height="2" fill="#F59E0B" />
</svg>
```

### Favicon

Simple cannabis leaf silhouette in green on white/transparent background.

---

## Animation Guidelines

### Performance Rules

1. **Use transform and opacity only** for smooth 60fps animations
2. **Avoid animating** width, height, top, left, margin, padding
3. **Use will-change** sparingly and remove after animation
4. **Prefer CSS animations** over JavaScript when possible

### Animation Timing

```css
/* Instant feedback */
--duration-instant: 100ms;

/* Quick interactions */
--duration-quick: 200ms;

/* Standard transitions */
--duration-normal: 300ms;

/* Smooth movements */
--duration-smooth: 500ms;

/* Dramatic effects */
--duration-dramatic: 800ms;
```

### Easing Functions

```css
/* Sharp entrance */
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* Sharp exit */
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* Smooth both */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Bouncy */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Spring */
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### When to Animate

**DO animate:**
- Plant growth stages
- Money/resource gains
- Level ups and achievements
- User interactions (clicks, hovers)
- State changes (success, error, warning)
- Notifications and alerts

**DON'T animate:**
- Initial page load (except loading spinner)
- Background elements constantly
- Every single stat update
- Decorative elements that distract

---

## Responsive Breakpoints

```css
/* Mobile */
@media (min-width: 640px) { /* sm */ }

/* Tablet */
@media (min-width: 768px) { /* md */ }

/* Laptop */
@media (min-width: 1024px) { /* lg */ }

/* Desktop */
@media (min-width: 1280px) { /* xl */ }
```

### Mobile-First Approach

1. Design for mobile first (375px base)
2. Scale up for larger screens
3. Maintain touch-friendly targets (44px minimum)
4. Consider thumb zones for mobile

---

## Accessibility

### Color Contrast

All text must meet WCAG AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text (18px+): 3:1 contrast ratio

### Focus States

```css
.focusable:focus {
  outline: 2px solid #10B981;
  outline-offset: 2px;
}
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## File Organization

```
design-system/
├── icons.js           # All SVG icons as JS module
├── animations.css     # All CSS animations
├── VISUAL_GUIDE.md    # This file
└── demo.html          # Interactive demo
```

---

## Implementation Checklist

- [ ] Import icon module
- [ ] Include animations CSS
- [ ] Setup color CSS variables
- [ ] Configure Tailwind with custom colors
- [ ] Test all icons render correctly
- [ ] Test animations across browsers
- [ ] Verify accessibility (contrast, focus states)
- [ ] Test responsive layouts
- [ ] Optimize SVG file sizes
- [ ] Setup loading states
- [ ] Create component library

---

**Version**: 1.0.0
**Last Updated**: November 2025
**Status**: Production Ready
