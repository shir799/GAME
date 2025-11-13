# Cannabis Tycoon - Design System Cheatsheet

Quick reference for developers.

## Icon Usage

```javascript
import { getIcon, iconColors } from './icons.js';

// Basic usage
getIcon('cannabisBud', 'w-8 h-8 text-green-500')

// With predefined colors
getIcon('money', `w-6 h-6 ${iconColors.money}`)
```

## Common Icons

| Icon | Name | Color |
|------|------|-------|
| Money | `money` | `text-green-500` |
| Cannabis | `cannabisBud` | `text-green-600` |
| Premium | `premiumCurrency` | `text-purple-500` |
| Seeds | `seeds` | `text-amber-600` |
| XP | `experience` | `text-blue-500` |
| Indica | `indicaPlant` | `text-emerald-600` |
| Sativa | `sativaPlant` | `text-lime-500` |
| Hybrid | `hybridPlant` | `text-teal-500` |
| Police | `police` | `text-red-600` |
| Upgrade | `upgrade` | `text-purple-600` |

## Animation Classes

### Plant
```html
<div class="animate-plant-grow"><!-- Grows from seed --></div>
<div class="animate-plant-sway"><!-- Gentle sway --></div>
```

### Money/Rewards
```html
<div class="animate-money-popup">+$100</div>
<div class="animate-coin-flip">💰</div>
```

### Level Up
```html
<div class="animate-level-up">LEVEL UP!</div>
<div class="animate-star-burst">⭐</div>
```

### Alerts
```html
<div class="animate-raid-alert">POLICE RAID!</div>
<div class="animate-warning-pulse">Warning</div>
```

### UI
```html
<div class="animate-bounce-in"><!-- Entrance --></div>
<div class="animate-fade-in"><!-- Fade in --></div>
<div class="animate-float"><!-- Floating --></div>
```

## Colors

### Primary
```
emerald-500: #10B981  (Main brand)
emerald-600: #059669  (Dark)
emerald-400: #34D399  (Light)
```

### Strains
```
Indica:  emerald-600 (#059669)
Sativa:  lime-500    (#84CC16)
Hybrid:  teal-500    (#14B8A6)
```

### Special
```
Premium: purple-500  (#8B5CF6)
Gold:    amber-500   (#F59E0B)
Danger:  red-500     (#EF4444)
```

## Buttons

```html
<!-- Primary -->
<button class="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
  Action
</button>

<!-- Premium -->
<button class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
  Premium
</button>

<!-- Secondary -->
<button class="bg-white text-green-500 border-2 border-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-50">
  Cancel
</button>
```

## Progress Bars

```html
<!-- Standard -->
<div class="h-3 bg-gray-200 rounded-full overflow-hidden">
  <div class="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" style="width: 75%"></div>
</div>

<!-- With animation -->
<div class="h-3 bg-gray-200 rounded-full overflow-hidden">
  <div class="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-progress"></div>
</div>
```

## Cards

```html
<!-- Standard -->
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  Content
</div>

<!-- Premium -->
<div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-500 p-6">
  Premium Content
</div>

<!-- With hover -->
<div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6">
  Interactive Card
</div>
```

## Typography

```html
<h1 class="text-4xl font-bold text-gray-900">Display</h1>
<h2 class="text-3xl font-bold text-gray-900">Heading 1</h2>
<h3 class="text-2xl font-semibold text-gray-800">Heading 2</h3>
<p class="text-base text-gray-700">Body text</p>
<span class="text-sm text-gray-600">Small text</span>
<span class="text-xs text-gray-500">Caption</span>
```

## Environment Backgrounds

```html
<!-- Basement -->
<div class="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-gray-700">

<!-- Backyard -->
<div class="bg-gradient-to-b from-blue-100 to-green-300 border-2 border-green-600">

<!-- Warehouse -->
<div class="bg-gradient-to-b from-gray-100 to-gray-300 border-2 border-gray-500">

<!-- Plantation -->
<div class="bg-gradient-to-b from-sky-300 to-green-400 border-2 border-green-700">

<!-- Laboratory -->
<div class="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-400">
```

## Quality Tiers

```javascript
common:     'text-gray-400'     // #9CA3AF
uncommon:   'text-green-500'    // #10B981
rare:       'text-blue-500'     // #3B82F6
epic:       'text-purple-500'   // #8B5CF6
legendary:  'text-amber-500'    // #F59E0B
```

## Animation Timing

```css
instant:   100ms
quick:     200ms
normal:    300ms
smooth:    500ms
dramatic:  800ms
```

## Common Patterns

### Money Gain
```javascript
function showMoneyGain(amount) {
  const popup = document.createElement('div');
  popup.className = 'animate-money-popup text-2xl font-bold text-green-500';
  popup.innerHTML = `+$${amount}`;
  container.appendChild(popup);
  setTimeout(() => popup.remove(), 1500);
}
```

### Level Up
```javascript
function showLevelUp(level) {
  const banner = document.createElement('div');
  banner.className = 'animate-level-up text-4xl font-bold text-amber-500';
  banner.innerHTML = `LEVEL ${level}!`;
  // Show banner
}
```

### Plant Card
```html
<div class="bg-white rounded-xl shadow-sm p-4">
  <!-- Icon -->
  <div class="w-20 h-20 mx-auto text-emerald-600 animate-plant-sway">
    <!-- SVG -->
  </div>

  <!-- Info -->
  <h3 class="font-bold text-lg mt-2">OG Kush</h3>
  <p class="text-sm text-gray-600">Indica • Level 5</p>

  <!-- Progress -->
  <div class="h-2 bg-gray-200 rounded-full mt-3">
    <div class="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style="width: 75%"></div>
  </div>

  <!-- Action -->
  <button class="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-semibold">
    Harvest
  </button>
</div>
```

## Accessibility

```css
/* Focus states (built-in) */
:focus {
  outline: 2px solid #10B981;
  outline-offset: 2px;
}

/* Reduced motion (built-in) */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

## Performance Tips

1. Inline critical SVGs
2. Use `will-change` for animations
3. Prefer `transform` over position changes
4. Use CSS animations, not JS
5. Batch DOM updates

---

**Pro Tip**: Open `demo.html` to see everything in action with interactive examples!
