# Design System - Schnell-Übersicht

**Cannabis Manager - UI/UX Design System v1.0**

Ein modernes, professionelles Design System für dein Cannabis-Manager Idle/Clicker Game.

---

## Was ist enthalten?

### 1. Tailwind Config (`/home/user/GAME/tailwind.config.js`)

Vollständig konfiguriert mit:
- Custom Color Palette (Primary, Secondary, Accent, Success, Danger, Neutral, Dark Mode)
- Typography System (Inter, Montserrat, JetBrains Mono)
- Custom Animations (fade-in, slide-up, float, bounce-in, pulse-soft, etc.)
- Custom Shadows (soft, medium, hard, glow effects)
- Responsive Breakpoints
- Dark Mode Support

**Status:** Direkt verwendbar

### 2. Global Styles (`/home/user/GAME/src/styles.css`)

Komplette CSS-Datei mit:
- Tailwind Base, Components, Utilities
- Reusable Component Classes (`.btn-primary`, `.card`, `.badge`, etc.)
- Game-specific Classes (`.plant-slot`, `.resource-display`, etc.)
- Utility Classes (`.glass`, `.glow-primary`, `.hover-lift`, etc.)
- Accessibility Support (`.sr-only`, reduced motion)
- Dark Mode Support

**Status:** Direkt verwendbar

### 3. Umfassende Dokumentation

#### Design System Docs (`/home/user/GAME/docs/design-system.md`)
- **57 KB** komplette Dokumentation
- Color Palette mit Use Cases
- Typography Guide
- Layout System (Grid, Container, Spacing)
- Component Library (Buttons, Cards, Modals, Forms, Progress Bars, etc.)
- Game-Specific UI (Farm, Shop, Upgrades, Quests, Inventory)
- Animations & Transitions
- Accessibility Guidelines
- Best Practices

**Status:** Vollständig dokumentiert

#### Icon System (`/home/user/GAME/docs/icons.md`)
- **17 KB** Icon-Dokumentation
- 40+ Lucide Icons mit Namen und Use Cases
- Installation & Verwendung
- Style Guide & Farben
- Accessibility Best Practices
- React Component Beispiele

**Status:** Vollständig dokumentiert

### 4. Live HTML-Beispiele (`/home/user/GAME/components-examples/`)

#### Complete Demo (`complete-demo.html`)
- **22 KB** vollständige Demo
- Alle wichtigen Components
- Buttons (Primary, Secondary, Danger, Premium)
- Cards (Basic, Plant, Premium)
- Progress Bars (Simple, XP, Animated)
- Badges (Success, Danger, Primary, Premium)
- Notifications (Success, Error, Info)
- Animations Demo
- Header mit Resources
- Bottom Navigation (Mobile)
- Dark Mode Toggle
- **Funktioniert standalone im Browser!**

#### Farm UI (`farm-ui.html`)
- **19 KB** Farm-Interface
- Stats Overview (Active Plants, Ready to Harvest, etc.)
- Plant Grid (Growing, Almost Ready, Ready to Harvest)
- Empty Slots & Locked Slots
- Quick Actions (Alle ernten, Alle gießen, etc.)
- Responsive Layout

**Status:** Direkt im Browser öffnen und testen!

---

## Schnellstart

### 1. Tailwind Config verwenden

Die `tailwind.config.js` ist bereits fertig konfiguriert. Einfach verwenden:

```bash
npm install -D tailwindcss@latest
```

### 2. Google Fonts einbinden

In `index.html` im `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### 3. Lucide Icons installieren

```bash
# Für React/TypeScript
npm install lucide-react

# Oder CDN für HTML
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

### 4. Global Styles einbinden

In deiner Haupt-CSS-Datei:

```css
@import './src/styles.css';
```

### 5. Demo ansehen

Öffne im Browser:
- `/home/user/GAME/components-examples/complete-demo.html`
- `/home/user/GAME/components-examples/farm-ui.html`

---

## Komponenten-Übersicht

### Buttons
- `.btn-primary` - Haupt-Aktion (Grün)
- `.btn-secondary` - Sekundäre Aktion (Border)
- `.btn-danger` - Löschen/Gefährlich (Rot)
- `.btn-premium` - Premium-Features (Gradient Gold)
- `.btn-icon` - Icon-Only Button

### Cards
- `.card` - Basis Card
- `.card-interactive` - Klickbare Card
- `.card-plant` - Pflanzen-Karte mit Gradient

### Plant Slots
- `.plant-slot-empty` - Leerer Slot (Dashed Border)
- `.plant-slot-growing` - Wachsende Pflanze (Pulsing)
- `.plant-slot-ready` - Erntebereit (Floating, Glow)

### Resources
- `.resource-coins` - Geld-Anzeige (Gold)
- `.resource-gems` - Premium-Währung (Lila)
- `.number-display` - Monospace Zahlen

### Badges
- `.badge-success` - Erfolg (Grün)
- `.badge-danger` - Fehler (Rot)
- `.badge-primary` - Info (Grün)
- `.badge-premium` - Premium (Gradient Lila)

### Utilities
- `.glass` - Glassmorphism Effect
- `.glow-primary` - Grüner Glow
- `.glow-accent` - Gold Glow
- `.hover-scale` - Scale on Hover
- `.hover-lift` - Lift on Hover

---

## Farb-Palette

### Primary (Cannabis-Theme)
```
primary-500: #10b981 - Haupt-Brand-Color
primary-600: #059669 - Hover States
primary-700: #047857 - Active States
```

### Secondary (Premium)
```
secondary-500: #a855f7 - Premium Features
secondary-600: #9333ea - Hover
```

### Accent (Gold/Rewards)
```
accent-500: #f59e0b - Geld, Rewards
accent-600: #d97706 - Hover
```

### Funktionale Farben
```
success-500: #22c55e - Erfolg
danger-500: #ef4444 - Fehler
warning-500: #f97316 - Warnung
```

---

## Icons (40+ verfügbar)

### Wichtigste Icons

**Navigation & UI:**
- `home`, `menu`, `x`, `settings`, `search`, `info`

**Game Actions:**
- `sprout` (Pflanzen jung)
- `leaf` (Pflanzen reif)
- `scissors` (Ernten)
- `shopping-cart` (Shop)
- `package` (Verkaufen)
- `trending-up` (Upgrades)
- `zap` (Energy/Schnellaktion)
- `clock` (Timer)
- `target` (Quests)
- `award` (Achievements)

**Resources:**
- `dollar-sign` (Geld)
- `gem` (Premium Currency)
- `star` (Rating)
- `bar-chart` (Stats)
- `check-circle` (Erfolg)
- `alert-circle` (Warnung)

**Environment:**
- `sun` (Tag/Light Mode)
- `moon` (Nacht/Dark Mode)
- `droplet` (Wasser)
- `wind` (Belüftung)
- `thermometer` (Temperatur)
- `shield` (Schutz)
- `truck` (Transport)

Vollständige Liste: `/home/user/GAME/docs/icons.md`

---

## Code-Beispiele

### Basic Button

```html
<button class="btn-primary">
  Aktion ausführen
</button>
```

### Button mit Icon

```html
<button class="btn-primary flex items-center gap-2">
  <i data-lucide="plus" class="w-5 h-5"></i>
  <span>Hinzufügen</span>
</button>
```

### Plant Card

```html
<div class="card-plant">
  <div class="w-20 h-20 mx-auto mb-4 bg-white dark:bg-dark-bg rounded-full flex items-center justify-center">
    <i data-lucide="sprout" class="w-10 h-10 text-primary-600"></i>
  </div>
  <h3 class="text-xl font-bold text-center mb-2">Northern Lights</h3>
  <!-- Progress Bar -->
  <div class="progress-bar">
    <div class="progress-fill" style="width: 75%"></div>
  </div>
</div>
```

### Resource Display

```html
<div class="resource-coins">
  <i data-lucide="dollar-sign" class="w-4 h-4 text-accent-600"></i>
  <span class="number-display">12,500</span>
</div>
```

### Notification

```html
<div class="toast-success">
  <i data-lucide="check-circle" class="w-6 h-6 text-success-600 flex-shrink-0"></i>
  <div>
    <h4 class="font-semibold text-success-900">Erfolgreich!</h4>
    <p class="text-sm text-success-700">Pflanze wurde geerntet.</p>
  </div>
</div>
```

---

## Dark Mode

Dark Mode ist vollständig implementiert!

### Aktivieren

```html
<!-- Dark Mode Class auf <html> -->
<html class="dark">
```

### Toggle Script

```javascript
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode',
    document.documentElement.classList.contains('dark')
  );
}

// Init Dark Mode
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}
```

### Dark Mode Farben

```
dark-bg: #0a0f0a       // Haupt-Hintergrund
dark-surface: #151b15  // Cards, Panels
dark-elevated: #1f261f // Hover, Modals
dark-border: #2a332a   // Borders
```

---

## Responsive Design

### Breakpoints

```
sm:  640px  - Große Phones
md:  768px  - Tablets
lg:  1024px - Small Desktop
xl:  1280px - Desktop
2xl: 1536px - Large Desktop
```

### Mobile-First Approach

```html
<!-- 1 Spalte auf Mobile, 2 auf Tablet, 3 auf Desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Items -->
</div>
```

---

## Performance

### Optimierungen
- Nur `transform` und `opacity` für Animationen (GPU-accelerated)
- CSS Custom Properties für Themes
- Tailwind JIT Mode für kleinere Bundles
- Reduced Motion Support für Accessibility

### Best Practices
- Verwende `.transition-all .duration-200` für schnelle Hover-Effekte
- `.transition-all .duration-300` für Standard-Transitions
- Lazy Loading für Bilder
- Debounce/Throttle für häufige Events

---

## Accessibility

### Features
- WCAG 2.1 AA compliant Kontraste
- Focus States für alle interaktiven Elemente
- Screen Reader Support (`.sr-only`)
- Keyboard Navigation (Tab, Enter, Escape)
- `aria-label` für Icon-Only Buttons
- Reduced Motion Support

### Beispiel

```html
<button
  aria-label="Einstellungen öffnen"
  class="btn-icon"
>
  <i data-lucide="settings" class="w-5 h-5" aria-hidden="true"></i>
</button>
```

---

## Nächste Schritte

### 1. Demo ansehen
Öffne `components-examples/complete-demo.html` im Browser

### 2. Dokumentation lesen
Lies `docs/design-system.md` für Details

### 3. Components verwenden
Kopiere Code aus den Beispielen

### 4. Anpassen
Passe Farben und Komponenten an deine Bedürfnisse an

### 5. Erweitern
Füge eigene Components hinzu basierend auf dem System

---

## File Structure

```
/home/user/GAME/
   tailwind.config.js           # Tailwind Konfiguration (8.7 KB)
   src/
      styles.css               # Global Styles (13 KB)
   docs/
      design-system.md         # Haupt-Dokumentation (57 KB)
      icons.md                 # Icon-System (17 KB)
   components-examples/
       complete-demo.html       # Vollständige Demo (22 KB)
       farm-ui.html             # Farm Interface (19 KB)
```

**Total:** ~136 KB professionelle Design System Dokumentation

---

## Support & Fragen

### Probleme?
1. Prüfe die Tailwind Config
2. Stelle sicher, dass Google Fonts geladen sind
3. Stelle sicher, dass Lucide Icons initialisiert sind
4. Prüfe die Browser Console auf Fehler

### Weitere Informationen
- Tailwind Docs: https://tailwindcss.com
- Lucide Icons: https://lucide.dev
- Design System Docs: `/home/user/GAME/docs/design-system.md`

---

**Design System v1.0**
Erstellt für Cannabis Manager
© 2025

Viel Erfolg beim Bauen deines Games!
