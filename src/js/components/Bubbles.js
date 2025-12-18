/**
 * Bubbles Component
 * Creates ambient rising bubble animations
 */

import { randomBetween, randomFrom } from '../utils/random.js';

export class Bubbles {
  constructor(containerEl) {
    this.container = containerEl;
    this.bubbles = [];
    this.maxBubbles = 15;
    this.spawnInterval = null;
  }

  /**
   * Start spawning bubbles
   */
  start() {
    // Spawn initial bubbles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.spawn(), i * 500);
    }

    // Continue spawning at intervals
    this.spawnInterval = setInterval(() => {
      if (this.bubbles.length < this.maxBubbles) {
        this.spawn();
      }
    }, 800);
  }

  /**
   * Stop spawning bubbles
   */
  stop() {
    if (this.spawnInterval) {
      clearInterval(this.spawnInterval);
      this.spawnInterval = null;
    }
  }

  /**
   * Spawn a new bubble
   */
  spawn() {
    const bubble = document.createElement('div');
    const size = randomFrom(['sm', 'md', 'lg']);
    
    bubble.className = `bubble bubble--${size}`;
    
    // Random horizontal position
    const x = randomBetween(5, 95);
    bubble.style.left = `${x}%`;
    
    // Random animation duration
    const duration = randomBetween(3, 6);
    bubble.style.animationDuration = `${duration}s`;
    
    // Random delay
    const delay = randomBetween(0, 1);
    bubble.style.animationDelay = `${delay}s`;
    
    this.container.appendChild(bubble);
    this.bubbles.push(bubble);

    // Remove bubble after animation
    setTimeout(() => {
      this.remove(bubble);
    }, (duration + delay) * 1000);
  }

  /**
   * Remove a bubble
   * @param {HTMLElement} bubble - Bubble element to remove
   */
  remove(bubble) {
    const index = this.bubbles.indexOf(bubble);
    if (index > -1) {
      this.bubbles.splice(index, 1);
    }
    if (bubble.parentElement) {
      bubble.remove();
    }
  }

  /**
   * Clear all bubbles
   */
  clear() {
    this.stop();
    this.bubbles.forEach(bubble => bubble.remove());
    this.bubbles = [];
  }
}
