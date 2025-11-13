# Cannabis Tycoon - Visual Design System

Professional, production-ready design system for a modern cannabis management idle/clicker game.

## Features

- 50+ SVG Icons (inline, optimized)
- 30+ CSS Animations
- Complete color system
- Strain-specific visual identities
- UI component styles
- Tailwind-compatible
- Zero external dependencies for icons
- Mobile-first responsive design

## Quick Start

### 1. View the Demo

Open `demo.html` in your browser to see all icons, colors, animations, and components in action.

```bash
# From design-system directory
open demo.html
# or
python -m http.server 8000
# Then visit http://localhost:8000/demo.html
```

### 2. Include in Your Project

#### Import Icons (JavaScript/React)

```javascript
import { icons, getIcon, iconColors } from './design-system/icons.js';

// Use in HTML string
const html = getIcon('cannabisBud', 'w-8 h-8 text-green-500');

// Use with predefined colors
const html = getIcon('money', `w-6 h-6 ${iconColors.money}`);

// Access raw SVG
const rawSVG = icons.cannabisBud;
```

#### Include Animations (CSS)

```html
<link rel="stylesheet" href="./design-system/animations.css">

<!-- Or import in CSS -->
<style>
  @import url('./design-system/animations.css');
</style>
```

#### Use Animations

```html
<!-- Add animation classes to any element -->
<div class="animate-plant-grow">Plant</div>
<div class="animate-money-popup">+$100</div>
<div class="animate-level-up">LEVEL UP!</div>
```

## Icon Categories

### Resources (5 icons)
- `money` - Currency/cash
- `cannabisBud` - Cannabis flower
- `premiumCurrency` - Premium diamonds/gems
- `seeds` - Plant seeds
- `experience` - XP/experience points

### Plants & Strains (6 icons)
- `indicaPlant` - Indica strain (deep green, body-high)
- `sativaPlant` - Sativa strain (bright green, head-high)
- `hybridPlant` - Hybrid strain (teal, balanced)
- `seedling` - Young plant
- `maturePlant` - Ready to harvest
- `wiltedPlant` - Sick/dead plant

### Buildings (5 icons)
- `basement` - Indoor grow room
- `backyard` - Small outdoor grow
- `warehouse` - Professional facility
- `plantation` - Large-scale outdoor
- `laboratory` - High-tech research lab

### Equipment (8 icons)
- `growLight` - Lighting equipment
- `wateringCan` - Irrigation
- `fertilizer` - Nutrients
- `ventilation` - Fans/airflow
- `temperature` - Climate control
- `humidity` - Moisture sensors
- `scissors` - Trimming tools
- `pot` - Plant containers

### Actions (5 icons)
- `plant` - Planting action
- `harvest` - Harvesting action
- `sell` - Selling/trading
- `upgrade` - Improve/enhance
- `craft` - Crafting/combining

### Workers (5 icons)
- `gardener` - Plant grower
- `trimmer` - Bud trimmer
- `dealer` - Salesperson
- `security` - Security guard
- `scientist` - Researcher

### Police/Risk (4 icons)
- `police` - Law enforcement
- `raid` - Police raid warning
- `camera` - Security camera
- `lock` - Security/safe

### UI Elements (8 icons)
- `settings` - Settings menu
- `shop` - Store/shop
- `quest` - Missions/quests
- `stats` - Statistics/charts
- `close` - Close button
- `menu` - Hamburger menu
- `info` - Information
- `trophy` - Achievements

### Status (4 icons)
- `levelUp` - Level up indicator
- `star` - Rating/favorite
- `prestige` - Prestige system
- `clock` - Time/duration

## Color System

### Primary Colors

```javascript
// Cannabis Green (Primary Brand Color)
emerald-500: #10B981  // Main
emerald-600: #059669  // Dark
emerald-400: #34D399  // Light

// Premium/Special
purple-500: #8B5CF6
amber-500: #F59E0B   // Gold

// Danger/Police
red-500: #EF4444
```

### Strain Colors

```javascript
// Indica (Body-high, relaxing)
emerald-600: #059669  // Deep, earthy green

// Sativa (Head-high, energizing)
lime-500: #84CC16     // Bright, vibrant green

// Hybrid (Balanced)
teal-500: #14B8A6     // Balanced blue-green
```

### Quality Tiers

```javascript
common: gray-400      // #9CA3AF
uncommon: green-500   // #10B981
rare: blue-500        // #3B82F6
epic: purple-500      // #8B5CF6
legendary: amber-500  // #F59E0B
```

## Animations

### Plant Animations
- `animate-plant-grow` - Plant growing from seed (1.2s)
- `animate-plant-sway` - Gentle swaying motion (3s infinite)
- `animate-harvest` - Shake effect when harvesting (0.5s)
- `animate-collect` - Item collection effect (0.8s)

### Money & Rewards
- `animate-money-popup` - Money gain popup (1.5s)
- `animate-coin-flip` - Coin flip animation (0.6s)

### Level Up
- `animate-level-up` - Level up burst (0.6s)
- `animate-star-burst` - Star explosion (0.8s)
- `animate-confetti` - Confetti fall (2s)

### Police/Risk
- `animate-raid-alert` - Flashing alert border (0.8s infinite)
- `animate-siren` - Siren flash effect (0.5s infinite)
- `animate-warning-pulse` - Warning pulse (1.5s infinite)

### UI
- `animate-button-press` - Button press feedback (0.2s)
- `animate-button-hover` - Button hover lift (0.3s)
- `animate-slide-in-right` - Slide in from right (0.3s)
- `animate-bounce-in` - Bounce entrance (0.5s)
- `animate-fade-in` - Fade in (0.3s)
- `animate-float` - Floating motion (2s infinite)
- `animate-shimmer` - Shimmer effect (2s infinite)

### Progress
- `animate-spinner` - Loading spinner (1s infinite)
- `animate-progress` - Progress bar fill (3s)
- `animate-pulse` - Subtle pulse (2s infinite)

### Utilities
- `animation-delay-100` through `animation-delay-500` - Delay modifiers
- `animation-duration-fast/normal/slow` - Duration modifiers
- `will-animate` - Performance optimization
- `animation-paused` - Pause animations

## Components

### Buttons

```html
<!-- Primary -->
<button class="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
  Primary Action
</button>

<!-- Premium -->
<button class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
  Premium Action
</button>

<!-- Secondary -->
<button class="bg-white text-green-500 border-2 border-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-50">
  Secondary
</button>
```

### Cards

```html
<!-- Standard Card -->
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <!-- Content -->
</div>

<!-- Premium Card -->
<div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-500 p-6">
  <!-- Content -->
</div>
```

### Progress Bars

```html
<div class="h-3 bg-gray-200 rounded-full overflow-hidden">
  <div class="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" style="width: 75%"></div>
</div>
```

## Usage Examples

### React Component

```jsx
import { getIcon, iconColors } from './design-system/icons';

function PlantCard({ plant }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div
        className={`w-16 h-16 ${iconColors.indica} animate-plant-sway`}
        dangerouslySetInnerHTML={{ __html: getIcon('indicaPlant', 'w-full h-full') }}
      />
      <h3>{plant.name}</h3>
      <div className="animate-progress">
        {/* Progress bar */}
      </div>
    </div>
  );
}
```

### Vanilla JavaScript

```javascript
import { icons, iconColors } from './design-system/icons.js';

// Create plant element
const plantDiv = document.createElement('div');
plantDiv.innerHTML = icons.indicaPlant;
plantDiv.classList.add('animate-plant-grow');
document.body.appendChild(plantDiv);

// Show money popup
function showMoney(amount) {
  const popup = document.createElement('div');
  popup.className = 'animate-money-popup text-green-500 font-bold';
  popup.textContent = `+$${amount}`;
  container.appendChild(popup);
  setTimeout(() => popup.remove(), 1500);
}
```

## Customization

### Changing Colors

All icons use `currentColor`, so you can change colors via text color:

```html
<div class="text-red-500">
  <!-- Icon will be red -->
</div>
```

### Custom Animations

Extend or modify animations in `animations.css`:

```css
@keyframes myCustomAnimation {
  /* Your keyframes */
}

.animate-my-custom {
  animation: myCustomAnimation 1s ease-in-out;
}
```

## Performance Tips

1. Use `will-change` sparingly for animations
2. Prefer `transform` and `opacity` for smooth 60fps
3. Inline critical SVGs, lazy-load others
4. Use CSS animations over JavaScript when possible
5. Respect `prefers-reduced-motion` (already built-in)

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Full support
- IE11: Not supported (uses modern CSS)

## File Structure

```
design-system/
├── icons.js              # 50+ SVG icons as JS module
├── animations.css        # All CSS animations
├── VISUAL_GUIDE.md       # Complete visual style guide
├── demo.html             # Interactive demo page
└── README.md             # This file
```

## Contributing

When adding new icons:
1. Use 24x24 viewBox
2. Use stroke-width: 2 for main elements
3. Use currentColor for colors
4. Keep SVG paths optimized
5. Follow existing style (line-based, rounded corners)

When adding animations:
1. Use transform/opacity only for performance
2. Keep durations reasonable (0.3s-2s)
3. Use cubic-bezier for character
4. Test on mobile devices

## License

All icons and code are original and free to use in your project.

---

**Version**: 1.0.0
**Created**: November 2025
**Status**: Production Ready
