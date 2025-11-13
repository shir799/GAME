# Icon System - Cannabis Manager

Komplette Icon-Dokumentation für das Cannabis Manager Design System.

**Icon Library:** Lucide Icons
**Version:** Latest
**Stil:** Modern, Outline-basiert, Konsistent

---

## Installation

### Option 1: CDN (für Prototyping)

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>
  lucide.createIcons();
</script>
```

### Option 2: NPM (für Production)

```bash
# Für React
npm install lucide-react

# Für Vue
npm install lucide-vue-next

# Für statisches HTML/JS
npm install lucide
```

**React Verwendung:**
```jsx
import { Sprout, DollarSign, Leaf } from 'lucide-react';

function MyComponent() {
  return (
    <div>
      <Sprout className="w-6 h-6 text-primary-600" />
      <DollarSign className="w-5 h-5 text-accent-600" />
    </div>
  );
}
```

**HTML Verwendung (mit CDN):**
```html
<i data-lucide="sprout" class="w-6 h-6 text-primary-600"></i>
<i data-lucide="dollar-sign" class="w-5 h-5 text-accent-600"></i>
```

---

## Icon-Größen

```html
<!-- Small - 16px (inline text) -->
<i data-lucide="info" class="w-4 h-4"></i>

<!-- Medium - 20px (buttons, badges) -->
<i data-lucide="check" class="w-5 h-5"></i>

<!-- Large - 24px (default, featured) -->
<i data-lucide="sprout" class="w-6 h-6"></i>

<!-- XL - 32px (cards, hero sections) -->
<i data-lucide="leaf" class="w-8 h-8"></i>

<!-- 2XL - 48px (sehr große Icons) -->
<i data-lucide="crown" class="w-12 h-12"></i>
```

---

## Vollständige Icon-Liste (40+ Icons)

### Navigation & UI (10)

| Icon | Name | Verwendung | Code |
|------|------|------------|------|
| Home | `home` | Startseite, Farm | `<i data-lucide="home"></i>` |
| Menu | `menu` | Hamburger Menu | `<i data-lucide="menu"></i>` |
| X | `x` | Close/Schließen | `<i data-lucide="x"></i>` |
| Settings | `settings` | Einstellungen | `<i data-lucide="settings"></i>` |
| ChevronRight | `chevron-right` | Navigation Arrows | `<i data-lucide="chevron-right"></i>` |
| ChevronDown | `chevron-down` | Dropdown Arrows | `<i data-lucide="chevron-down"></i>` |
| ChevronLeft | `chevron-left` | Zurück-Button | `<i data-lucide="chevron-left"></i>` |
| Search | `search` | Suche | `<i data-lucide="search"></i>` |
| Info | `info` | Informationen | `<i data-lucide="info"></i>` |
| MoreVertical | `more-vertical` | Mehr-Optionen | `<i data-lucide="more-vertical"></i>` |

### Game Actions (12)

| Icon | Name | Verwendung | Code |
|------|------|------------|------|
| Sprout | `sprout` | Pflanzen (jung) | `<i data-lucide="sprout"></i>` |
| Leaf | `leaf` | Cannabis/Natur (reif) | `<i data-lucide="leaf"></i>` |
| Scissors | `scissors` | Ernten | `<i data-lucide="scissors"></i>` |
| ShoppingCart | `shopping-cart` | Shop | `<i data-lucide="shopping-cart"></i>` |
| Package | `package` | Verkaufen/Produkte | `<i data-lucide="package"></i>` |
| TrendingUp | `trending-up` | Upgrades/Wachstum | `<i data-lucide="trending-up"></i>` |
| Zap | `zap` | Energy/Schnelle Aktion | `<i data-lucide="zap"></i>` |
| Clock | `clock` | Zeit/Timer | `<i data-lucide="clock"></i>` |
| Target | `target` | Quests/Ziele | `<i data-lucide="target"></i>` |
| Award | `award` | Achievements | `<i data-lucide="award"></i>` |
| Play | `play` | Start/Abspielen | `<i data-lucide="play"></i>` |
| Pause | `pause` | Pause | `<i data-lucide="pause"></i>` |

### Resources & Stats (10)

| Icon | Name | Verwendung | Code |
|------|------|------------|------|
| DollarSign | `dollar-sign` | Geld/Coins | `<i data-lucide="dollar-sign"></i>` |
| Gem | `gem` | Premium Currency | `<i data-lucide="gem"></i>` |
| Star | `star` | Rating/Favorit | `<i data-lucide="star"></i>` |
| BarChart | `bar-chart` | Statistiken | `<i data-lucide="bar-chart"></i>` |
| TrendingDown | `trending-down` | Verlust/Rückgang | `<i data-lucide="trending-down"></i>` |
| AlertCircle | `alert-circle` | Warnung | `<i data-lucide="alert-circle"></i>` |
| CheckCircle | `check-circle` | Erfolg | `<i data-lucide="check-circle"></i>` |
| XCircle | `x-circle` | Fehler | `<i data-lucide="x-circle"></i>` |
| Plus | `plus` | Hinzufügen | `<i data-lucide="plus"></i>` |
| Minus | `minus` | Entfernen | `<i data-lucide="minus"></i>` |

### Social & Features (8)

| Icon | Name | Verwendung | Code |
|------|------|------------|------|
| Users | `users` | Community/Freunde | `<i data-lucide="users"></i>` |
| User | `user` | Profil/Account | `<i data-lucide="user"></i>` |
| MessageCircle | `message-circle` | Chat/Nachrichten | `<i data-lucide="message-circle"></i>` |
| Gift | `gift` | Rewards/Geschenke | `<i data-lucide="gift"></i>` |
| Crown | `crown` | Premium/VIP | `<i data-lucide="crown"></i>` |
| Lock | `lock` | Gesperrt | `<i data-lucide="lock"></i>` |
| Unlock | `unlock` | Freigeschaltet | `<i data-lucide="unlock"></i>` |
| Bell | `bell` | Benachrichtigungen | `<i data-lucide="bell"></i>` |

### Game-Specific Environment (12)

| Icon | Name | Verwendung | Code |
|------|------|------------|------|
| Sun | `sun` | Licht/Tag | `<i data-lucide="sun"></i>` |
| Moon | `moon` | Nacht/Dark Mode | `<i data-lucide="moon"></i>` |
| Droplet | `droplet` | Wasser/Bewässerung | `<i data-lucide="droplet"></i>` |
| Wind | `wind` | Belüftung | `<i data-lucide="wind"></i>` |
| Thermometer | `thermometer` | Temperatur | `<i data-lucide="thermometer"></i>` |
| Shield | `shield` | Schutz/Sicherheit | `<i data-lucide="shield"></i>` |
| ShieldAlert | `shield-alert` | Polizei-Warnung | `<i data-lucide="shield-alert"></i>` |
| Truck | `truck` | Transport/Lieferung | `<i data-lucide="truck"></i>` |
| Building | `building` | Gebäude | `<i data-lucide="building"></i>` |
| Warehouse | `warehouse` | Lager/Storage | `<i data-lucide="warehouse"></i>` |
| Beaker | `beaker` | Labor/Forschung | `<i data-lucide="beaker"></i>` |
| Flame | `flame` | Erhitzung/Verarbeitung | `<i data-lucide="flame"></i>` |

### Additional Utility Icons (8)

| Icon | Name | Verwendung | Code |
|------|------|------------|------|
| Eye | `eye` | Ansehen/Sichtbar | `<i data-lucide="eye"></i>` |
| EyeOff | `eye-off` | Verstecken | `<i data-lucide="eye-off"></i>` |
| Heart | `heart` | Favorit/Gefällt mir | `<i data-lucide="heart"></i>` |
| Share | `share` | Teilen | `<i data-lucide="share"></i>` |
| Download | `download` | Herunterladen | `<i data-lucide="download"></i>` |
| Upload | `upload` | Hochladen | `<i data-lucide="upload"></i>` |
| Refresh | `refresh-cw` | Aktualisieren | `<i data-lucide="refresh-cw"></i>` |
| Loader | `loader` | Laden/Loading | `<i data-lucide="loader"></i>` |

---

## Icon Style Guide

### Farben

```html
<!-- Primary (Cannabis-Theme) -->
<i data-lucide="sprout" class="w-6 h-6 text-primary-600 dark:text-primary-400"></i>

<!-- Success -->
<i data-lucide="check-circle" class="w-5 h-5 text-success-600"></i>

<!-- Danger -->
<i data-lucide="alert-triangle" class="w-5 h-5 text-danger-600"></i>

<!-- Warning -->
<i data-lucide="alert-circle" class="w-5 h-5 text-warning-600"></i>

<!-- Accent (Gold/Money) -->
<i data-lucide="dollar-sign" class="w-5 h-5 text-accent-600"></i>

<!-- Secondary (Premium) -->
<i data-lucide="crown" class="w-5 h-5 text-secondary-600"></i>

<!-- Neutral -->
<i data-lucide="info" class="w-5 h-5 text-gray-600 dark:text-gray-400"></i>
```

### Mit Hintergrund

```html
<!-- Primary Background -->
<div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
  <i data-lucide="sprout" class="w-6 h-6 text-primary-600"></i>
</div>

<!-- Success Background -->
<div class="w-10 h-10 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
  <i data-lucide="check-circle" class="w-5 h-5 text-success-600"></i>
</div>

<!-- Accent Background -->
<div class="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center">
  <i data-lucide="dollar-sign" class="w-5 h-5 text-accent-600"></i>
</div>
```

### In Buttons

```html
<!-- Icon mit Text -->
<button class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center gap-2">
  <i data-lucide="plus" class="w-5 h-5"></i>
  <span>Hinzufügen</span>
</button>

<!-- Nur Icon -->
<button class="p-3 bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-elevated rounded-lg">
  <i data-lucide="settings" class="w-5 h-5 text-gray-600 dark:text-gray-400"></i>
</button>

<!-- Icon rechts -->
<button class="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2">
  <span>Weiter</span>
  <i data-lucide="chevron-right" class="w-4 h-4"></i>
</button>
```

### In Listen

```html
<ul class="space-y-3">
  <li class="flex items-center gap-3">
    <i data-lucide="check-circle" class="w-5 h-5 text-success-600 flex-shrink-0"></i>
    <span>Aufgabe erledigt</span>
  </li>
  <li class="flex items-center gap-3">
    <i data-lucide="x-circle" class="w-5 h-5 text-danger-600 flex-shrink-0"></i>
    <span>Fehler aufgetreten</span>
  </li>
</ul>
```

### Animierte Icons

```html
<!-- Spinning Loader -->
<i data-lucide="loader" class="w-6 h-6 animate-spin text-primary-600"></i>

<!-- Pulsing Heart -->
<i data-lucide="heart" class="w-6 h-6 animate-pulse text-danger-600 fill-current"></i>

<!-- Floating Icon -->
<i data-lucide="leaf" class="w-8 h-8 animate-float text-primary-600"></i>
```

---

## Verwendungs-Beispiele nach Kontext

### Header/Navigation

```html
<header class="flex items-center justify-between p-4">
  <!-- Logo mit Icon -->
  <div class="flex items-center gap-2">
    <i data-lucide="leaf" class="w-6 h-6 text-primary-600"></i>
    <h1 class="font-bold">Cannabis Manager</h1>
  </div>

  <!-- Navigation Icons -->
  <div class="flex items-center gap-2">
    <button class="p-2 rounded-lg hover:bg-gray-100">
      <i data-lucide="bell" class="w-5 h-5"></i>
    </button>
    <button class="p-2 rounded-lg hover:bg-gray-100">
      <i data-lucide="settings" class="w-5 h-5"></i>
    </button>
  </div>
</header>
```

### Resource Display

```html
<div class="flex items-center gap-4">
  <!-- Coins -->
  <div class="flex items-center gap-2 px-3 py-2 bg-accent-50 rounded-full">
    <i data-lucide="dollar-sign" class="w-4 h-4 text-accent-600"></i>
    <span class="font-mono font-bold text-accent-900">12,500</span>
  </div>

  <!-- Gems -->
  <div class="flex items-center gap-2 px-3 py-2 bg-secondary-50 rounded-full">
    <i data-lucide="gem" class="w-4 h-4 text-secondary-600"></i>
    <span class="font-mono font-bold text-secondary-900">250</span>
  </div>

  <!-- Energy -->
  <div class="flex items-center gap-2 px-3 py-2 bg-primary-50 rounded-full">
    <i data-lucide="zap" class="w-4 h-4 text-primary-600"></i>
    <span class="font-mono font-bold text-primary-900">85/100</span>
  </div>
</div>
```

### Stats Cards

```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  <!-- Active Plants -->
  <div class="bg-white dark:bg-dark-surface rounded-xl p-4">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
        <i data-lucide="sprout" class="w-5 h-5 text-primary-600"></i>
      </div>
      <div>
        <div class="text-2xl font-bold">12</div>
        <div class="text-xs text-gray-600">Pflanzen</div>
      </div>
    </div>
  </div>

  <!-- Ready to Harvest -->
  <div class="bg-white dark:bg-dark-surface rounded-xl p-4">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
        <i data-lucide="check-circle" class="w-5 h-5 text-success-600"></i>
      </div>
      <div>
        <div class="text-2xl font-bold">3</div>
        <div class="text-xs text-gray-600">Erntebereit</div>
      </div>
    </div>
  </div>
</div>
```

### Notifications

```html
<!-- Success -->
<div class="flex items-start gap-3 p-4 bg-success-50 border border-success-200 rounded-xl">
  <i data-lucide="check-circle" class="w-6 h-6 text-success-600 flex-shrink-0"></i>
  <div>
    <h4 class="font-semibold text-success-900">Erfolgreich!</h4>
    <p class="text-sm text-success-700">Pflanze wurde geerntet.</p>
  </div>
</div>

<!-- Error -->
<div class="flex items-start gap-3 p-4 bg-danger-50 border border-danger-200 rounded-xl">
  <i data-lucide="alert-circle" class="w-6 h-6 text-danger-600 flex-shrink-0"></i>
  <div>
    <h4 class="font-semibold text-danger-900">Fehler</h4>
    <p class="text-sm text-danger-700">Nicht genug Geld.</p>
  </div>
</div>

<!-- Info -->
<div class="flex items-start gap-3 p-4 bg-primary-50 border border-primary-200 rounded-xl">
  <i data-lucide="info" class="w-6 h-6 text-primary-600 flex-shrink-0"></i>
  <div>
    <h4 class="font-semibold text-primary-900">Info</h4>
    <p class="text-sm text-primary-700">Neue Quest verfügbar!</p>
  </div>
</div>
```

### Bottom Navigation (Mobile)

```html
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
  <div class="flex justify-around items-center h-16">
    <!-- Active Tab -->
    <a href="#" class="flex flex-col items-center gap-1 text-primary-600">
      <i data-lucide="home" class="w-6 h-6"></i>
      <span class="text-xs font-medium">Farm</span>
    </a>

    <!-- Inactive Tabs -->
    <a href="#" class="flex flex-col items-center gap-1 text-gray-600">
      <i data-lucide="shopping-cart" class="w-6 h-6"></i>
      <span class="text-xs font-medium">Shop</span>
    </a>

    <a href="#" class="flex flex-col items-center gap-1 text-gray-600">
      <i data-lucide="trending-up" class="w-6 h-6"></i>
      <span class="text-xs font-medium">Upgrades</span>
    </a>

    <a href="#" class="flex flex-col items-center gap-1 text-gray-600">
      <i data-lucide="target" class="w-6 h-6"></i>
      <span class="text-xs font-medium">Quests</span>
    </a>
  </div>
</nav>
```

---

## Accessibility

### ARIA Labels für Icon-Only Buttons

```html
<button aria-label="Einstellungen öffnen" class="p-2 rounded-lg">
  <i data-lucide="settings" class="w-5 h-5" aria-hidden="true"></i>
</button>

<button aria-label="Benachrichtigungen anzeigen" class="p-2 rounded-lg">
  <i data-lucide="bell" class="w-5 h-5" aria-hidden="true"></i>
</button>
```

### Screen Reader Text

```html
<button class="flex items-center gap-2">
  <i data-lucide="download" class="w-5 h-5" aria-hidden="true"></i>
  <span>Herunterladen</span>
  <span class="sr-only">als PDF</span>
</button>
```

---

## Best Practices

### DOs

- Verwende Icons **konsistent** im gesamten Design
- Kombiniere Icons **immer** mit Labels für bessere UX (außer offensichtliche Icons wie X für Close)
- Nutze die **richtigen Farben** für den Kontext (Success = Grün, Danger = Rot, etc.)
- Halte Icon-Größen **einheitlich** im gleichen Kontext
- Verwende **aria-hidden="true"** wenn Icons dekorativ sind und Text daneben steht
- Nutze **aria-label** für Icon-Only Buttons

### DON'Ts

- Verwende **nicht** zu viele verschiedene Icon-Größen auf einer Seite
- Mische **nicht** verschiedene Icon-Stile (z.B. Outline und Filled)
- Nutze Icons **nicht** ohne Kontext (außer universelle Icons wie Suche, Einstellungen)
- Verwende **keine** Icons, die die Bedeutung verschleiern
- Vergiss **nicht** die Accessibility (aria-labels, Screen Reader)

---

## Quick Reference: Icon + Farbe

| Kontext | Icon | Farbe |
|---------|------|-------|
| Pflanzen (jung) | `sprout` | `text-primary-600` |
| Pflanzen (reif) | `leaf` | `text-primary-700` |
| Erfolg | `check-circle` | `text-success-600` |
| Fehler | `x-circle` | `text-danger-600` |
| Warnung | `alert-circle` | `text-warning-600` |
| Geld/Coins | `dollar-sign` | `text-accent-600` |
| Premium | `gem` oder `crown` | `text-secondary-600` |
| Info | `info` | `text-primary-600` |
| Favorit | `star` | `text-accent-500` |
| Laden | `loader` | `text-primary-600 animate-spin` |

---

## React Component Beispiel

```jsx
// IconButton.jsx
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}

export function IconButton({
  icon: Icon,
  label,
  variant = 'primary',
  onClick
}: IconButtonProps) {
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-white border-2 border-gray-300 hover:border-primary-500 text-gray-700',
    danger: 'bg-danger-600 hover:bg-danger-700 text-white'
  };

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`p-3 rounded-lg transition-colors ${variantClasses[variant]}`}
    >
      <Icon className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}

// Verwendung:
import { Settings } from 'lucide-react';

<IconButton icon={Settings} label="Einstellungen öffnen" variant="secondary" />
```

---

**Icon System v1.0**
Für Cannabis Manager Design System
© 2025
