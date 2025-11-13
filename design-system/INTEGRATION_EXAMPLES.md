# Integration Examples

Real-world examples of how to integrate the Cannabis Tycoon Design System into your project.

## HTML/Vanilla JavaScript

### Basic Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cannabis Tycoon</title>

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Design System Animations -->
  <link rel="stylesheet" href="./design-system/animations.css">

  <!-- Design System Icons -->
  <script type="module">
    import { getIcon, iconColors } from './design-system/icons.js';
    window.DesignSystem = { getIcon, iconColors };
  </script>
</head>
<body class="bg-gray-50">
  <div id="app"></div>
  <script type="module" src="./main.js"></script>
</body>
</html>
```

### Plant Card Component

```javascript
// plant-card.js
import { getIcon, iconColors } from './design-system/icons.js';

export function createPlantCard(plant) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition';

  // Determine strain color
  const strainColor = {
    indica: 'text-emerald-600',
    sativa: 'text-lime-500',
    hybrid: 'text-teal-500'
  }[plant.strain] || 'text-green-500';

  card.innerHTML = `
    <div class="flex flex-col items-center">
      <!-- Plant Icon -->
      <div class="w-20 h-20 ${strainColor} animate-plant-sway">
        ${getIcon(`${plant.strain}Plant`, 'w-full h-full')}
      </div>

      <!-- Name & Info -->
      <h3 class="font-bold text-lg mt-4">${plant.name}</h3>
      <p class="text-sm text-gray-600 capitalize">${plant.strain} • Level ${plant.level}</p>

      <!-- Growth Progress -->
      <div class="w-full mt-4">
        <div class="flex justify-between text-xs mb-1">
          <span class="text-gray-600">Growth</span>
          <span class="font-semibold">${plant.growth}%</span>
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
               style="width: ${plant.growth}%"></div>
        </div>
      </div>

      <!-- Stats -->
      <div class="w-full grid grid-cols-2 gap-2 mt-4 text-sm">
        <div class="flex items-center gap-1">
          <div class="w-4 h-4 ${iconColors.money}">
            ${getIcon('money', 'w-full h-full')}
          </div>
          <span class="text-gray-700">$${plant.value}</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-4 h-4 ${iconColors.cannabisBud}">
            ${getIcon('cannabisBud', 'w-full h-full')}
          </div>
          <span class="text-gray-700">${plant.yield}g</span>
        </div>
      </div>

      <!-- Action Button -->
      <button class="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition transform hover:-translate-y-0.5 active:scale-95"
              onclick="harvestPlant('${plant.id}')">
        ${plant.growth >= 100 ? 'Harvest' : 'Growing...'}
      </button>
    </div>
  `;

  return card;
}

// Usage
const myPlant = {
  id: 'plant-1',
  name: 'OG Kush',
  strain: 'indica',
  level: 5,
  growth: 85,
  value: 250,
  yield: 45
};

document.getElementById('plants-container').appendChild(createPlantCard(myPlant));
```

### Money Gain Animation

```javascript
// money-animation.js
export function showMoneyGain(amount, container) {
  const popup = document.createElement('div');
  popup.className = 'absolute text-2xl font-bold text-green-500 animate-money-popup pointer-events-none';
  popup.textContent = `+$${amount}`;

  // Position at center of container
  const rect = container.getBoundingClientRect();
  popup.style.left = `${rect.width / 2}px`;
  popup.style.top = `${rect.height / 2}px`;
  popup.style.transform = 'translate(-50%, -50%)';

  container.style.position = 'relative';
  container.appendChild(popup);

  setTimeout(() => popup.remove(), 1500);
}

// Usage
document.getElementById('harvest-btn').addEventListener('click', () => {
  const amount = 250;
  showMoneyGain(amount, document.getElementById('plant-card'));
  // Update balance...
});
```

### Level Up Notification

```javascript
// level-up.js
import { getIcon } from './design-system/icons.js';

export function showLevelUp(level) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in';

  overlay.innerHTML = `
    <div class="bg-white rounded-2xl p-8 text-center animate-bounce-in max-w-md">
      <div class="w-24 h-24 mx-auto text-amber-500 animate-star-burst">
        ${getIcon('levelUp', 'w-full h-full')}
      </div>
      <h2 class="text-4xl font-bold text-gray-900 mt-6">LEVEL UP!</h2>
      <p class="text-6xl font-bold text-amber-500 my-4">${level}</p>
      <p class="text-gray-600 mb-6">You've reached level ${level}!</p>
      <button class="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
              onclick="this.closest('.fixed').remove()">
        Continue
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  // Auto-dismiss after 3 seconds
  setTimeout(() => overlay.remove(), 3000);
}
```

## React Integration

### Setup

```javascript
// icons.jsx
import { icons, iconColors } from '../design-system/icons.js';

export function Icon({ name, className = 'w-6 h-6', color }) {
  const svgString = icons[name];
  if (!svgString) return null;

  const finalClassName = `${className} ${color || 'text-current'}`;
  const svgWithClass = svgString.replace('<svg', `<svg class="${finalClassName}"`);

  return <div dangerouslySetInnerHTML={{ __html: svgWithClass }} />;
}

export { iconColors };
```

### Plant Card Component (React)

```jsx
// PlantCard.jsx
import { Icon, iconColors } from './icons';
import '../design-system/animations.css';

export function PlantCard({ plant, onHarvest }) {
  const strainColor = {
    indica: 'text-emerald-600',
    sativa: 'text-lime-500',
    hybrid: 'text-teal-500'
  }[plant.strain] || 'text-green-500';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
      {/* Plant Icon */}
      <div className={`w-20 h-20 mx-auto ${strainColor} animate-plant-sway`}>
        <Icon name={`${plant.strain}Plant`} className="w-full h-full" />
      </div>

      {/* Name & Info */}
      <h3 className="font-bold text-lg mt-4 text-center">{plant.name}</h3>
      <p className="text-sm text-gray-600 text-center capitalize">
        {plant.strain} • Level {plant.level}
      </p>

      {/* Growth Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-600">Growth</span>
          <span className="font-semibold">{plant.growth}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${plant.growth}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
        <div className="flex items-center gap-1">
          <Icon name="money" className="w-4 h-4" color={iconColors.money} />
          <span className="text-gray-700">${plant.value}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="cannabisBud" className="w-4 h-4" color={iconColors.cannabisBud} />
          <span className="text-gray-700">{plant.yield}g</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onHarvest(plant.id)}
        disabled={plant.growth < 100}
        className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {plant.growth >= 100 ? 'Harvest' : 'Growing...'}
      </button>
    </div>
  );
}
```

### Money Gain Hook (React)

```jsx
// useMoneyAnimation.jsx
import { useState, useCallback } from 'react';

export function useMoneyAnimation() {
  const [popups, setPopups] = useState([]);

  const showMoney = useCallback((amount) => {
    const id = Date.now();
    setPopups(prev => [...prev, { id, amount }]);

    setTimeout(() => {
      setPopups(prev => prev.filter(p => p.id !== id));
    }, 1500);
  }, []);

  const MoneyPopups = useCallback(() => (
    <>
      {popups.map(popup => (
        <div
          key={popup.id}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-green-500 animate-money-popup pointer-events-none z-10"
        >
          +${popup.amount}
        </div>
      ))}
    </>
  ), [popups]);

  return { showMoney, MoneyPopups };
}

// Usage
function PlantContainer() {
  const { showMoney, MoneyPopups } = useMoneyAnimation();

  const handleHarvest = () => {
    showMoney(250);
    // Update balance...
  };

  return (
    <div className="relative">
      <MoneyPopups />
      <PlantCard onHarvest={handleHarvest} />
    </div>
  );
}
```

## Vue Integration

### Icon Component

```vue
<!-- Icon.vue -->
<template>
  <div v-html="svgContent" :class="className"></div>
</template>

<script setup>
import { computed } from 'vue';
import { icons } from '../design-system/icons.js';

const props = defineProps({
  name: String,
  className: {
    type: String,
    default: 'w-6 h-6'
  },
  color: String
});

const svgContent = computed(() => {
  const svg = icons[props.name];
  if (!svg) return '';

  const finalClass = `${props.className} ${props.color || 'text-current'}`;
  return svg.replace('<svg', `<svg class="${finalClass}"`);
});
</script>
```

### Plant Card Component (Vue)

```vue
<!-- PlantCard.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
    <!-- Plant Icon -->
    <div :class="['w-20 h-20 mx-auto animate-plant-sway', strainColor]">
      <Icon :name="`${plant.strain}Plant`" class-name="w-full h-full" />
    </div>

    <!-- Name & Info -->
    <h3 class="font-bold text-lg mt-4 text-center">{{ plant.name }}</h3>
    <p class="text-sm text-gray-600 text-center capitalize">
      {{ plant.strain }} • Level {{ plant.level }}
    </p>

    <!-- Growth Progress -->
    <div class="mt-4">
      <div class="flex justify-between text-xs mb-1">
        <span class="text-gray-600">Growth</span>
        <span class="font-semibold">{{ plant.growth }}%</span>
      </div>
      <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
          :style="{ width: `${plant.growth}%` }"
        />
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-2 mt-4 text-sm">
      <div class="flex items-center gap-1">
        <Icon name="money" class-name="w-4 h-4" :color="iconColors.money" />
        <span class="text-gray-700">${{ plant.value }}</span>
      </div>
      <div class="flex items-center gap-1">
        <Icon name="cannabisBud" class-name="w-4 h-4" :color="iconColors.cannabisBud" />
        <span class="text-gray-700">{{ plant.yield }}g</span>
      </div>
    </div>

    <!-- Action Button -->
    <button
      @click="$emit('harvest', plant.id)"
      :disabled="plant.growth < 100"
      class="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
    >
      {{ plant.growth >= 100 ? 'Harvest' : 'Growing...' }}
    </button>

    <!-- Money Popups -->
    <Transition name="money">
      <div
        v-if="showMoneyPopup"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-green-500 animate-money-popup pointer-events-none"
      >
        +${{ moneyAmount }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Icon from './Icon.vue';
import { iconColors } from '../design-system/icons.js';

const props = defineProps({
  plant: Object
});

const emit = defineEmits(['harvest']);

const strainColor = computed(() => ({
  indica: 'text-emerald-600',
  sativa: 'text-lime-500',
  hybrid: 'text-teal-500'
}[props.plant.strain] || 'text-green-500'));

const showMoneyPopup = ref(false);
const moneyAmount = ref(0);

function showMoney(amount) {
  moneyAmount.value = amount;
  showMoneyPopup.value = true;
  setTimeout(() => {
    showMoneyPopup.value = false;
  }, 1500);
}

defineExpose({ showMoney });
</script>
```

## Svelte Integration

### Icon Component

```svelte
<!-- Icon.svelte -->
<script>
  import { icons } from '../design-system/icons.js';

  export let name;
  export let className = 'w-6 h-6';
  export let color = '';

  $: svgContent = icons[name]?.replace(
    '<svg',
    `<svg class="${className} ${color || 'text-current'}"`
  ) || '';
</script>

<div>{@html svgContent}</div>
```

### Plant Card Component (Svelte)

```svelte
<!-- PlantCard.svelte -->
<script>
  import Icon from './Icon.svelte';
  import { iconColors } from '../design-system/icons.js';
  import { createEventDispatcher } from 'svelte';

  export let plant;

  const dispatch = createEventDispatcher();

  $: strainColor = {
    indica: 'text-emerald-600',
    sativa: 'text-lime-500',
    hybrid: 'text-teal-500'
  }[plant.strain] || 'text-green-500';

  let showMoneyPopup = false;
  let moneyAmount = 0;

  function handleHarvest() {
    moneyAmount = plant.value;
    showMoneyPopup = true;
    setTimeout(() => showMoneyPopup = false, 1500);
    dispatch('harvest', plant.id);
  }
</script>

<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition relative">
  <!-- Plant Icon -->
  <div class="w-20 h-20 mx-auto {strainColor} animate-plant-sway">
    <Icon name="{plant.strain}Plant" className="w-full h-full" />
  </div>

  <!-- Name & Info -->
  <h3 class="font-bold text-lg mt-4 text-center">{plant.name}</h3>
  <p class="text-sm text-gray-600 text-center capitalize">
    {plant.strain} • Level {plant.level}
  </p>

  <!-- Growth Progress -->
  <div class="mt-4">
    <div class="flex justify-between text-xs mb-1">
      <span class="text-gray-600">Growth</span>
      <span class="font-semibold">{plant.growth}%</span>
    </div>
    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        class="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
        style="width: {plant.growth}%"
      />
    </div>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 gap-2 mt-4 text-sm">
    <div class="flex items-center gap-1">
      <Icon name="money" className="w-4 h-4" color={iconColors.money} />
      <span class="text-gray-700">${plant.value}</span>
    </div>
    <div class="flex items-center gap-1">
      <Icon name="cannabisBud" className="w-4 h-4" color={iconColors.cannabisBud} />
      <span class="text-gray-700">{plant.yield}g</span>
    </div>
  </div>

  <!-- Action Button -->
  <button
    on:click={handleHarvest}
    disabled={plant.growth < 100}
    class="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
  >
    {plant.growth >= 100 ? 'Harvest' : 'Growing...'}
  </button>

  <!-- Money Popup -->
  {#if showMoneyPopup}
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-green-500 animate-money-popup pointer-events-none">
      +${moneyAmount}
    </div>
  {/if}
</div>
```

## Common Utilities

### Animation Queue Manager

```javascript
// animation-queue.js
class AnimationQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  add(animation, duration = 1000) {
    this.queue.push({ animation, duration });
    if (!this.isProcessing) {
      this.process();
    }
  }

  async process() {
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const { animation, duration } = this.queue.shift();
      await animation();
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    this.isProcessing = false;
  }
}

export const animationQueue = new AnimationQueue();

// Usage
animationQueue.add(() => showMoneyGain(100), 500);
animationQueue.add(() => showLevelUp(5), 2000);
```

### Notification System

```javascript
// notifications.js
import { getIcon } from './design-system/icons.js';

export function showNotification(message, type = 'info', duration = 3000) {
  const container = document.getElementById('notifications') || createNotificationContainer();

  const notification = document.createElement('div');
  notification.className = `
    bg-white rounded-lg shadow-lg p-4 mb-3
    border-l-4 animate-slide-in-right
    ${type === 'success' ? 'border-green-500' : ''}
    ${type === 'error' ? 'border-red-500' : ''}
    ${type === 'warning' ? 'border-amber-500' : ''}
    ${type === 'info' ? 'border-blue-500' : ''}
  `;

  const iconName = {
    success: 'harvest',
    error: 'close',
    warning: 'raid',
    info: 'info'
  }[type] || 'info';

  const iconColor = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500'
  }[type] || 'text-blue-500';

  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-6 h-6 ${iconColor}">
        ${getIcon(iconName, 'w-full h-full')}
      </div>
      <p class="text-gray-800 flex-1">${message}</p>
      <button onclick="this.closest('div[class*=animate]').classList.add('animate-slide-out-right')"
              class="text-gray-400 hover:text-gray-600">
        ${getIcon('close', 'w-5 h-5')}
      </button>
    </div>
  `;

  container.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('animate-slide-out-right');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

function createNotificationContainer() {
  const container = document.createElement('div');
  container.id = 'notifications';
  container.className = 'fixed top-4 right-4 z-50 max-w-sm';
  document.body.appendChild(container);
  return container;
}
```

---

These examples demonstrate real-world integration patterns for the Cannabis Tycoon Design System across different frameworks and use cases.
