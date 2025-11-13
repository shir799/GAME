import './styles.css';
import { GameEngine } from '@core/GameEngine';

// Initialize the game engine
const game = GameEngine.getInstance();

// Start the game
game.initialize();
game.start();

// Debug access in development
if (import.meta.env && import.meta.env.DEV) {
  (window as any).game = game;
  console.log('🎮 Game Engine loaded. Access via window.game');
}
