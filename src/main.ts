import './styles.css';
import { GameEngine } from '@core/GameEngine';

// Initialize the game engine
const game = GameEngine.getInstance();

// Start the game
game.initialize();
game.start();

// Expose game instance globally for UI event handlers
(window as any).game = game;
console.log('🎮 Game Engine loaded. Access via window.game');
