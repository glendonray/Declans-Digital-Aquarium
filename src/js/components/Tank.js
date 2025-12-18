/**
 * Tank Component
 * Main aquarium container - spawns fish and manages state
 */

import { Fish } from './Fish.js';
import { Bubbles } from './Bubbles.js';
import { SpeechBubble } from './SpeechBubble.js';

export class Tank {
  constructor(containerEl, fishAPI) {
    this.container = containerEl;
    this.fishAPI = fishAPI;
    this.innerContainer = containerEl.querySelector('.tank__inner');
    this.fishContainer = containerEl.querySelector('#fish-container');
    this.bubblesContainer = containerEl.querySelector('#bubbles');
    
    this.fish = [];
    this.bubbles = null;
    this.speechBubble = null;
    
    this.bounds = this.getBounds();
    
    this.init();
  }

  /**
   * Initialize the tank
   */
  async init() {
    // Create speech bubble component
    this.speechBubble = new SpeechBubble();
    
    // Create bubbles
    this.bubbles = new Bubbles(this.bubblesContainer);
    this.bubbles.start();
    
    // Load fish data and spawn fish
    await this.spawnFish();
    
    // Handle window resize
    window.addEventListener('resize', () => this.onResize());
    
    // Click anywhere to close speech bubble
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container || 
          e.target === this.innerContainer || 
          e.target.classList.contains('water') ||
          e.target.classList.contains('sand')) {
        this.speechBubble.hide();
      }
    });
  }

  /**
   * Get tank bounds
   * @returns {Object} Bounds {width, height}
   */
  getBounds() {
    const rect = this.innerContainer.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  }

  /**
   * Spawn all fish
   */
  async spawnFish() {
    const fishData = await this.fishAPI.loadFish();
    await this.fishAPI.loadSources();
    
    fishData.forEach(data => {
      const fish = new Fish(data, this.bounds, this.speechBubble, this.fishAPI);
      this.fishContainer.appendChild(fish.element);
      fish.startAnimation();
      this.fish.push(fish);
    });
  }

  /**
   * Handle window resize
   */
  onResize() {
    this.bounds = this.getBounds();
    this.fish.forEach(fish => fish.updateBounds(this.bounds));
  }

  /**
   * Pause all fish
   */
  pauseAll() {
    this.fish.forEach(fish => fish.pause());
  }

  /**
   * Resume all fish
   */
  resumeAll() {
    this.fish.forEach(fish => fish.resume());
  }

  /**
   * Clean up
   */
  destroy() {
    this.fish.forEach(fish => fish.stopAnimation());
    this.bubbles.clear();
  }
}
