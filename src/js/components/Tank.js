/**
 * Tank Component
 * Main aquarium container - spawns fish and manages state
 */

import { Fish } from "./Fish.js";
import { Bubbles } from "./Bubbles.js";
import { SpeechBubble } from "./SpeechBubble.js";
import { config } from "../config.js";
import { selectDiverseFish } from "../services/FishSelector.js";

export class Tank {
  constructor(containerEl, fishAPI) {
    this.container = containerEl;
    this.fishAPI = fishAPI;
    this.innerContainer = containerEl.querySelector(".tank__inner");
    this.fishContainer = containerEl.querySelector("#fish-container");
    this.bubblesContainer = containerEl.querySelector("#bubbles");

    this.fish = [];
    this.bubbles = null;
    this.speechBubble = null;
    this.rotationInterval = null;
    this.isSwapping = false;

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

    // Load index and sources
    await this.fishAPI.loadIndex();
    await this.fishAPI.loadSources();

    // Spawn initial fish
    await this.spawnFish();

    // Handle window resize
    window.addEventListener("resize", () => this.onResize());

    // Click anywhere to close speech bubble
    this.container.addEventListener("click", (e) => {
      if (
        e.target === this.container ||
        e.target === this.innerContainer ||
        e.target.classList.contains("water") ||
        e.target.classList.contains("sand")
      ) {
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
      height: rect.height,
    };
  }

  /**
   * Spawn fish based on config.displayMode
   */
  async spawnFish() {
    const index = this.fishAPI.index;

    let selectedFish;

    if (config.displayMode === "all") {
      // Show all fish
      selectedFish = index;
    } else {
      // Use diverse selection for limited/rotate modes
      if (config.enableDiverseSelection) {
        selectedFish = selectDiverseFish(index, config.maxFish);
      } else {
        // Simple random selection
        const shuffled = [...index].sort(() => Math.random() - 0.5);
        selectedFish = shuffled.slice(0, config.maxFish);
      }
    }

    // Load full data for selected fish and spawn them
    const fishIds = selectedFish.map((f) => f.id);
    const fullFishData = await this.fishAPI.getMultipleFish(fishIds);

    fullFishData.forEach((data) => {
      this.addFish(data);
    });

    // Start rotation if enabled
    if (config.displayMode === "rotate") {
      this.startRotation();
    }
  }

  /**
   * Swap all fish with a new diverse selection
   */
  async swapAllFish() {
    if (this.isSwapping) return;
    this.isSwapping = true;

    // Hide any open speech bubble
    this.speechBubble.hide();

    // Get current fish IDs to exclude (try to show different fish)
    const currentIds = this.fish.map((f) => f.data.id);

    // Remove all current fish
    [...this.fish].forEach((fish) => this.removeFish(fish));

    // Select new diverse set, preferring fish not currently shown
    const index = this.fishAPI.index;
    let newSelection;

    if (config.enableDiverseSelection) {
      newSelection = selectDiverseFish(index, config.maxFish, currentIds);
    } else {
      // If not enough fish to avoid overlap, just shuffle
      const shuffled = [...index].sort(() => Math.random() - 0.5);
      newSelection = shuffled.slice(0, config.maxFish);
    }

    // Load full data and spawn new fish
    const fishIds = newSelection.map((f) => f.id);
    const fullFishData = await this.fishAPI.getMultipleFish(fishIds);

    fullFishData.forEach((data) => {
      this.addFish(data);
    });

    this.isSwapping = false;
  }

  /**
   * Add a single fish to the tank
   * @param {Object} data - Fish data
   * @returns {Fish} The created fish instance
   */
  addFish(data) {
    const fish = new Fish(data, this.bounds, this.speechBubble, this.fishAPI);
    this.fishContainer.appendChild(fish.element);
    fish.startAnimation();
    this.fish.push(fish);
    return fish;
  }

  /**
   * Remove a fish from the tank
   * @param {Fish} fish - Fish instance to remove
   */
  removeFish(fish) {
    fish.stopAnimation();
    fish.element.remove();
    const index = this.fish.indexOf(fish);
    if (index > -1) {
      this.fish.splice(index, 1);
    }
  }

  /**
   * Start fish rotation (for 'rotate' displayMode)
   */
  startRotation() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }

    this.rotationInterval = setInterval(() => {
      this.rotateFish();
    }, config.rotateInterval);
  }

  /**
   * Stop fish rotation
   */
  stopRotation() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
      this.rotationInterval = null;
    }
  }

  /**
   * Rotate one fish out and bring a new one in
   */
  async rotateFish() {
    if (this.fish.length === 0) return;

    const index = this.fishAPI.index;
    if (index.length <= config.maxFish) return;

    // Get IDs of currently displayed fish
    const currentIds = this.fish.map((f) => f.data.id);

    // Find fish not currently displayed
    const availableFish = index.filter((f) => !currentIds.includes(f.id));

    if (availableFish.length === 0) return;

    // Pick a random fish to remove
    const removeIndex = Math.floor(Math.random() * this.fish.length);
    const fishToRemove = this.fish[removeIndex];

    // Pick a random new fish to add
    const newFishSummary =
      availableFish[Math.floor(Math.random() * availableFish.length)];
    const newFishData = await this.fishAPI.getFishById(newFishSummary.id);

    if (newFishData) {
      this.removeFish(fishToRemove);
      this.addFish(newFishData);
    }
  }

  /**
   * Handle window resize
   */
  onResize() {
    this.bounds = this.getBounds();
    this.fish.forEach((fish) => fish.updateBounds(this.bounds));
  }

  /**
   * Pause all fish
   */
  pauseAll() {
    this.fish.forEach((fish) => fish.pause());
  }

  /**
   * Resume all fish
   */
  resumeAll() {
    this.fish.forEach((fish) => fish.resume());
  }

  /**
   * Clean up
   */
  destroy() {
    this.stopRotation();
    this.fish.forEach((fish) => fish.stopAnimation());
    this.bubbles.clear();
  }
}
