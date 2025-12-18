/**
 * Declan's Digital Aquarium
 * Main entry point - initializes and connects all components
 */

import { Tank } from './components/Tank.js';
import { fishAPI } from './services/FishAPI.js';

/**
 * Initialize the aquarium
 */
async function init() {
  const aquariumEl = document.getElementById('aquarium');
  
  if (!aquariumEl) {
    console.error('Aquarium container not found!');
    return;
  }

  // Create the tank
  const tank = new Tank(aquariumEl, fishAPI);
  
  // Expose tank globally for debugging (optional)
  window.aquarium = tank;
  
  console.log('🐠 Declan\'s Digital Aquarium initialized!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
