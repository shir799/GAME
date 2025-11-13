/**
 * Cannabis Tycoon - SVG Icon System
 * Professional flat design icons for cannabis management game
 * All icons use 24x24 viewBox, stroke-width: 2
 * Colors: CSS classes for easy theming with Tailwind
 */

export const icons = {
  // ============================================
  // RESOURCES (Geld, Cannabis, Premium Currency)
  // ============================================

  money: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M6 9V9C6 10.1046 5.10457 11 4 11V11" stroke="currentColor" stroke-width="2"/>
      <path d="M18 9V9C18 10.1046 18.8954 11 20 11V11" stroke="currentColor" stroke-width="2"/>
      <path d="M6 15V15C6 13.8954 5.10457 13 4 13V13" stroke="currentColor" stroke-width="2"/>
      <path d="M18 15V15C18 13.8954 18.8954 13 20 13V13" stroke="currentColor" stroke-width="2"/>
    </svg>
  `,

  cannabisBud: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 10 4 10 6C10 6 8 5 7 7C7 7 5 8 6 10C6 10 4 10 4 12C4 14 6 14 6 14C6 14 5 16 7 17C7 17 8 19 10 18C10 18 10 20 12 20C14 20 14 18 14 18C14 18 16 19 17 17C19 16 18 14 18 14C18 14 20 14 20 12C20 10 18 10 18 10C19 8 17 7 17 7C16 5 14 6 14 6C14 4 12 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M12 16V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  premiumCurrency: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
    </svg>
  `,

  seeds: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="8" cy="9" rx="2.5" ry="3" stroke="currentColor" stroke-width="2"/>
      <ellipse cx="16" cy="9" rx="2.5" ry="3" stroke="currentColor" stroke-width="2"/>
      <ellipse cx="12" cy="15" rx="2.5" ry="3" stroke="currentColor" stroke-width="2"/>
      <path d="M8 11L10 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M16 11L14 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  experience: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L16 8L22 9L17.5 13.5L19 20L13 17L7 20L8.5 13.5L3 9L9 8L13 2Z" fill="currentColor" opacity="0.3"/>
      <path d="M13 2L16 8L22 9L17.5 13.5L19 20L13 17L7 20L8.5 13.5L3 9L9 8L13 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,

  // ============================================
  // PLANTS & STRAINS
  // ============================================

  indicaPlant: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 14C12 14 8 12 6 10C4 8 5 6 7 7C9 8 12 10 12 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 14C12 14 16 12 18 10C20 8 19 6 17 7C15 8 12 10 12 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 10C12 10 10 8 9 6C8 4 9 3 10 4C11 5 12 7 12 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 10C12 10 14 8 15 6C16 4 15 3 14 4C13 5 12 7 12 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="12" cy="12" rx="3" ry="4" fill="currentColor" opacity="0.2"/>
    </svg>
  `,

  sativaPlant: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 12C12 12 9 11 7 9C5 7 6 5 8 6C10 7 12 9 12 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 12C12 12 15 11 17 9C19 7 18 5 16 6C14 7 12 9 12 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 8C12 8 10 7 9 5C8 3 9 2 10 3C11 4 12 6 12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 8C12 8 14 7 15 5C16 3 15 2 14 3C13 4 12 6 12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 6C12 6 11 5 10 4C9 3 10 2 11 2.5C12 3 12 4 12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 6C12 6 13 5 14 4C15 3 14 2 13 2.5C12 3 12 4 12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,

  hybridPlant: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 13C12 13 9 11 7 9C5 7 6 5 8 6C10 7 12 9 12 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 13C12 13 15 11 17 9C19 7 18 5 16 6C14 7 12 9 12 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 9C12 9 10 7.5 9 6C8 4 9 3 10 4C11 5 12 7 12 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 9C12 9 14 7.5 15 6C16 4 15 3 14 4C13 5 12 7 12 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="12" cy="10" rx="2.5" ry="3" fill="currentColor" opacity="0.2"/>
    </svg>
  `,

  seedling: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 12C12 12 9 11 8 9C7 7 8 6 9 7C10 8 12 10 12 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 12C12 12 15 11 16 9C17 7 16 6 15 7C14 8 12 10 12 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
    </svg>
  `,

  maturePlant: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22V13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="14" cy="10" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="12" cy="13" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M12 13C12 13 8 11 6 9C4 7 5 5 7 6C9 7 12 9 12 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 13C12 13 16 11 18 9C20 7 19 5 17 6C15 7 12 9 12 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  wiltedPlant: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      <path d="M12 14C12 14 8 13 6 12C4 11 4 9 5 10C6 11 10 13 10 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
      <path d="M12 14C12 14 16 13 18 12C20 11 20 9 19 10C18 11 14 13 14 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
      <line x1="10" y1="8" x2="14" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="14" y1="8" x2="10" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  // ============================================
  // BUILDINGS
  // ============================================

  basement: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="8" width="18" height="13" rx="1" stroke="currentColor" stroke-width="2"/>
      <path d="M3 8L12 3L21 8" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <rect x="8" y="13" width="3" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="13" y="13" width="3" height="8" fill="currentColor" opacity="0.3"/>
      <line x1="3" y1="13" x2="21" y2="13" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    </svg>
  `,

  backyard: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 20H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <rect x="2" y="8" width="6" height="12" rx="1" stroke="currentColor" stroke-width="2"/>
      <rect x="5" y="12" width="2" height="3" fill="currentColor" opacity="0.3"/>
      <circle cx="15" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
      <path d="M15 8V16M11 12H19" stroke="currentColor" stroke-width="1.5"/>
      <rect x="2" y="20" width="20" height="1" fill="currentColor" opacity="0.2"/>
    </svg>
  `,

  warehouse: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 10L12 4L21 10V21H3V10Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <rect x="9" y="15" width="6" height="6" stroke="currentColor" stroke-width="2"/>
      <line x1="3" y1="14" x2="21" y2="14" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="3" y1="18" x2="8" y2="18" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="16" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    </svg>
  `,

  plantation: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 20H22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M7 20V16C7 16 6 14 6 12C6 10 7 9 8 10C9 11 7 14 7 14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M7 16C7 16 9 15 10 13C11 11 10 10 9 11C8 12 7 14 7 14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M12 20V15C12 15 11 13 11 11C11 9 12 8 13 9C14 10 12 13 12 13" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M12 15C12 15 14 14 15 12C16 10 15 9 14 10C13 11 12 13 12 13" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M17 20V16C17 16 16 14 16 12C16 10 17 9 18 10C19 11 17 14 17 14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M17 16C17 16 19 15 20 13C21 11 20 10 19 11C18 12 17 14 17 14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <rect x="2" y="20" width="20" height="1" fill="currentColor" opacity="0.2"/>
    </svg>
  `,

  laboratory: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M10 3V10L5 18C4 19.5 5 21 6.5 21H17.5C19 21 20 19.5 19 18L14 10V3" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="9" cy="16" r="1.5" fill="currentColor" opacity="0.3"/>
      <circle cx="15" cy="17" r="1" fill="currentColor" opacity="0.3"/>
      <circle cx="12" cy="15" r="1" fill="currentColor" opacity="0.3"/>
      <line x1="6" y1="18" x2="18" y2="18" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    </svg>
  `,

  // ============================================
  // EQUIPMENT
  // ============================================

  growLight: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="2" width="8" height="3" rx="1" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="5" x2="12" y2="8" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="11" r="4" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="11" r="2" fill="currentColor" opacity="0.3"/>
      <path d="M12 15L10 19M12 15L14 19M12 15L12 19M7 13L4 16M17 13L20 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,

  wateringCan: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 8C21 8 22 9 22 10C22 11 21 12 20 12L16 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M16 8L14 6L12 8L16 12L16 8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M12 8C12 8 8 8 6 10C4 12 4 16 5 18C6 20 10 22 12 20L16 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M8 18L7 20M10 17L9 19M12 16L11 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,

  fertilizer: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4H16V8H8V4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M9 8L7 21H17L15 8" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="12" cy="2" r="1" fill="currentColor"/>
      <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="8" y1="16" x2="16" y2="16" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    </svg>
  `,

  ventilation: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <path d="M12 10C12 10 9 9 7 10C5 11 5 13 7 13C9 13 12 12 12 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M13 14C13 14 14 17 13 19C12 21 10 21 10 19C10 17 11 14 11 14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M14 11C14 11 17 10 19 11C21 12 21 14 19 14C17 14 14 13 14 13" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,

  temperature: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 14V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="17" r="4" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="17" r="2" fill="currentColor" opacity="0.5"/>
      <line x1="10" y1="6" x2="10" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  humidity: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C12 3 7 8 7 13C7 15.7614 9.23858 18 12 18C14.7614 18 17 15.7614 17 13C17 8 12 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M12 10C12 10 10 12 10 14C10 15.1046 10.8954 16 12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="6" cy="20" r="1" fill="currentColor" opacity="0.5"/>
      <circle cx="18" cy="20" r="1" fill="currentColor" opacity="0.5"/>
      <circle cx="12" cy="21" r="1" fill="currentColor" opacity="0.5"/>
    </svg>
  `,

  scissors: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="3" stroke="currentColor" stroke-width="2"/>
      <circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M9 7L19 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="19" cy="12" r="2" stroke="currentColor" stroke-width="2"/>
    </svg>
  `,

  pot: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 8L8 20H16L18 8H6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M4 8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <rect x="9" y="12" width="6" height="1" fill="currentColor" opacity="0.3"/>
      <circle cx="10" cy="15" r="0.5" fill="currentColor"/>
      <circle cx="14" cy="15" r="0.5" fill="currentColor"/>
    </svg>
  `,

  // ============================================
  // ACTIONS
  // ============================================

  plant: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="17" r="2" stroke="currentColor" stroke-width="2"/>
      <path d="M12 15V8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 8C12 8 10 7 9 6C8 5 9 4 10 5C11 6 12 7 12 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 8C12 8 14 7 15 6C16 5 15 4 14 5C13 6 12 7 12 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M6 19H18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 19V21M16 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  harvest: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12L9 17L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 17C12 17 10 15 8 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M16 10C16 10 14 8 12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="9" cy="17" r="1.5" fill="currentColor" opacity="0.3"/>
    </svg>
  `,

  sell: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3H6L8 17H18L21 7H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
      <circle cx="17" cy="20" r="1.5" fill="currentColor"/>
      <path d="M14 3L17 6L14 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17 6H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  upgrade: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L15 10H19L16 14L17 20L12 17L7 20L8 14L5 10H9L12 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M12 8V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M10 11L12 9L14 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,

  craft: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M12 10L14 15M12 10L10 15M12 10V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,

  // ============================================
  // WORKERS/EMPLOYEES
  // ============================================

  gardener: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M6 21V16C6 14 7 13 9 13H15C17 13 18 14 18 16V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M9 18L12 15L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="10" y="3" width="4" height="2" rx="1" fill="currentColor" opacity="0.3"/>
    </svg>
  `,

  trimmer: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M6 21V16C6 14 7 13 9 13H15C17 13 18 14 18 16V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 15L10 17M14 15L16 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="9" cy="16" r="1" fill="currentColor" opacity="0.3"/>
      <circle cx="15" cy="16" r="1" fill="currentColor" opacity="0.3"/>
    </svg>
  `,

  dealer: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M6 21V16C6 14 7 13 9 13H15C17 13 18 14 18 16V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M9 16H11M13 16H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <rect x="4" y="14" width="3" height="4" rx="0.5" stroke="currentColor" stroke-width="1.5"/>
      <rect x="17" y="14" width="3" height="4" rx="0.5" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  `,

  security: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M6 21V16C6 14 7 13 9 13H15C17 13 18 14 18 16V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 11L10 9L12 7L14 9L12 11Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M9 15L10 17L11 15M13 15L14 17L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,

  scientist: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M6 21V16C6 14 7 13 9 13H15C17 13 18 14 18 16V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="9" cy="8" r="1.5" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="15" cy="8" r="1.5" stroke="currentColor" stroke-width="1.5"/>
      <path d="M10 16H14M10 19H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,

  // ============================================
  // POLICE/RISK
  // ============================================

  police: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L17 5V10C17 14 15 17 12 19C9 17 7 14 7 10V5L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M12 7V10M10 10H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  raid: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M2 7V17L12 22V12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M22 7V17L12 22V12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M8 10L10 12L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,

  camera: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="13" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="18" cy="9" r="1" fill="currentColor"/>
    </svg>
  `,

  lock: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="16" r="2" fill="currentColor"/>
    </svg>
  `,

  // ============================================
  // UI ELEMENTS
  // ============================================

  settings: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M12 3C10.9 3 10 3.9 10 5C10 5.3 9.8 5.6 9.5 5.7L8 6.4C7.7 6.5 7.3 6.4 7.1 6.1L6.3 5.3C5.5 4.5 4.2 4.5 3.4 5.3C2.6 6.1 2.6 7.4 3.4 8.2L4.2 9C4.5 9.3 4.6 9.7 4.5 10L3.8 11.5C3.7 11.8 3.4 12 3.1 12H2C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16H3.1C3.4 16 3.7 16.2 3.8 16.5L4.5 18C4.6 18.3 4.5 18.7 4.2 19L3.4 19.8C2.6 20.6 2.6 21.9 3.4 22.7C4.2 23.5 5.5 23.5 6.3 22.7L7.1 21.9C7.4 21.6 7.8 21.5 8.1 21.6L9.6 22.3C9.9 22.4 10.1 22.7 10.1 23V24C10.1 25.1 11 26 12.1 26C13.2 26 14.1 25.1 14.1 24V23C14.1 22.7 14.3 22.4 14.6 22.3L16.1 21.6C16.4 21.5 16.8 21.6 17.1 21.9L17.9 22.7C18.7 23.5 20 23.5 20.8 22.7C21.6 21.9 21.6 20.6 20.8 19.8L20 19C19.7 18.7 19.6 18.3 19.7 18L20.4 16.5C20.5 16.2 20.8 16 21.1 16H22.2C23.3 16 24.2 15.1 24.2 14C24.2 12.9 23.3 12 22.2 12H21.1C20.8 12 20.5 11.8 20.4 11.5L19.7 10C19.6 9.7 19.7 9.3 20 9L20.8 8.2C21.6 7.4 21.6 6.1 20.8 5.3C20 4.5 18.7 4.5 17.9 5.3L17.1 6.1C16.8 6.4 16.4 6.5 16.1 6.4L14.6 5.7C14.3 5.6 14.1 5.3 14.1 5C14.1 3.9 13.2 3 12.1 3Z" fill="currentColor" opacity="0.1"/>
      <path d="M19.4 15L20.5 12L19.4 9M4.6 9L3.5 12L4.6 15M15 19.4L12 20.5L9 19.4M9 4.6L12 3.5L15 4.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  shop: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9L5 3H19L21 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 9V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V9" stroke="currentColor" stroke-width="2"/>
      <path d="M9 9V7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7V9" stroke="currentColor" stroke-width="2"/>
      <rect x="8" y="13" width="8" height="6" rx="1" fill="currentColor" opacity="0.2"/>
    </svg>
  `,

  quest: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3H16C17.1046 3 18 3.89543 18 5V21L12 18L6 21V5C6 3.89543 6.89543 3 8 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M10 9L11 11L13 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  stats: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3V19C3 20.1046 3.89543 21 5 21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <rect x="7" y="12" width="3" height="7" fill="currentColor" opacity="0.3"/>
      <rect x="12" y="8" width="3" height="11" fill="currentColor" opacity="0.5"/>
      <rect x="17" y="5" width="3" height="14" fill="currentColor" opacity="0.7"/>
    </svg>
  `,

  close: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  menu: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  info: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
      <path d="M12 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="8" r="1" fill="currentColor"/>
    </svg>
  `,

  trophy: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 8V4H17V8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M7 8C5 8 3 9 3 11C3 13 5 14 7 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M17 8C19 8 21 9 21 11C21 13 19 14 17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M7 14C7 14 8 17 12 17C16 17 17 14 17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="17" x2="12" y2="20" stroke="currentColor" stroke-width="2"/>
      <rect x="9" y="20" width="6" height="2" rx="1" fill="currentColor"/>
    </svg>
  `,

  // ============================================
  // STATUS & META
  // ============================================

  levelUp: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L9 10L3 11L7.5 15.5L6 22L12 19L18 22L16.5 15.5L21 11L15 10L12 4Z" fill="currentColor" opacity="0.2"/>
      <path d="M12 4L9 10L3 11L7.5 15.5L6 22L12 19L18 22L16.5 15.5L21 11L15 10L12 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M12 10V16M9 13L12 10L15 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,

  star: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="currentColor" opacity="0.3"/>
      <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,

  prestige: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
      <path d="M12 3L14 8L19 9L15 13L16 18L12 16L8 18L9 13L5 9L10 8L12 3Z" fill="currentColor" opacity="0.3"/>
      <path d="M12 3L14 8L19 9L15 13L16 18L12 16L8 18L9 13L5 9L10 8L12 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,

  clock: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
      <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
};

/**
 * Helper function to create an icon element
 * @param {string} iconName - Name of the icon from the icons object
 * @param {string} className - Additional CSS classes (Tailwind)
 * @returns {string} HTML string
 */
export function getIcon(iconName, className = 'w-6 h-6 text-current') {
  const svg = icons[iconName];
  if (!svg) {
    console.warn(`Icon "${iconName}" not found`);
    return '';
  }

  // Add class to the SVG
  return svg.trim().replace('<svg', `<svg class="${className}"`);
}

/**
 * Color classes for different icon categories (Tailwind)
 */
export const iconColors = {
  // Resources
  money: 'text-green-500',
  cannabisBud: 'text-green-600',
  premiumCurrency: 'text-purple-500',
  seeds: 'text-amber-600',
  experience: 'text-blue-500',

  // Plants
  indica: 'text-emerald-600',
  sativa: 'text-lime-500',
  hybrid: 'text-teal-500',

  // Buildings
  building: 'text-slate-600',

  // Equipment
  equipment: 'text-gray-600',

  // Actions
  action: 'text-blue-600',

  // Workers
  worker: 'text-indigo-600',

  // Police/Risk
  danger: 'text-red-600',
  security: 'text-orange-600',

  // UI
  ui: 'text-gray-700',

  // Status
  success: 'text-green-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

export default icons;
