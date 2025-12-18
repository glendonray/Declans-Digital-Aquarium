/**
 * Fish Component
 * Individual fish with movement and click handling
 */

import { randomBetween, randomBool } from "../utils/random.js";
import { generateFishSVG } from "../services/FishSVGGenerator.js";
import { getAvailableShapes } from "../templates/shapes/index.js";
import { myListService } from "../services/MyListService.js";

export class Fish {
  constructor(data, tankBounds, speechBubble, fishAPI) {
    this.data = data;
    this.tankBounds = tankBounds;
    this.speechBubble = speechBubble;
    this.fishAPI = fishAPI;

    // Position and movement
    this.x = randomBetween(100, tankBounds.width - 100);
    this.y = randomBetween(80, tankBounds.height - 120);
    this.speedX = randomBetween(0.3, 0.8) * (randomBool() ? 1 : -1);
    this.speedY = randomBetween(0.1, 0.3) * (randomBool() ? 1 : -1);
    this.flipped = this.speedX < 0;

    // State
    this.isPaused = false;
    this.isActive = false;
    this.element = null;
    this.saveButton = null;
    this.animationId = null;

    // Create DOM element
    this.render();
    this.bindEvents();
  }

  /**
   * Check if we can render this fish with templates
   * @returns {boolean}
   */
  canUseTemplate() {
    const { appearance = {} } = this.data;
    const { bodyShape = "oval" } = appearance;
    const availableShapes = getAvailableShapes();
    return availableShapes.includes(bodyShape);
  }

  /**
   * Create the fish DOM element
   */
  render() {
    this.element = document.createElement("button");
    this.element.className = "fish fish--swimming";
    this.element.setAttribute("aria-label", `Click to learn about ${this.data.name}`);
    this.element.dataset.fishId = this.data.id;

    // Try to use template-based SVG, fall back to static image
    if (this.canUseTemplate()) {
      // Generate inline SVG from templates
      const svgString = generateFishSVG(this.data);
      this.element.innerHTML = svgString;

      // Add sprite class to the SVG element
      const svg = this.element.querySelector("svg");
      if (svg) {
        svg.classList.add("fish__sprite");
        svg.setAttribute("draggable", "false");
      }
    } else {
      // Fallback to static image
      const img = document.createElement("img");
      img.src = this.data.image;
      img.alt = this.data.name;
      img.className = "fish__sprite";
      img.draggable = false;
      this.element.appendChild(img);
    }

    // Add save button (heart icon)
    this.saveButton = document.createElement("span");
    this.saveButton.className = "fish__save";
    this.saveButton.setAttribute("role", "button");
    this.saveButton.setAttribute("tabindex", "0");
    this.updateSaveButton();
    this.element.appendChild(this.saveButton);

    // Set initial position
    this.updatePosition();

    // Set random animation delay for variety
    this.element.style.animationDelay = `${randomBetween(0, 2)}s`;

    return this.element;
  }

  /**
   * Update save button state based on myListService
   */
  updateSaveButton() {
    const isSaved = myListService.has(this.data.id);
    this.saveButton.innerHTML = isSaved ? "❤️" : "🤍";
    this.saveButton.setAttribute("aria-label", isSaved ? `Remove ${this.data.name} from my fish` : `Add ${this.data.name} to my fish`);
    this.saveButton.classList.toggle("fish__save--saved", isSaved);
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    this.element.addEventListener("click", (e) => {
      e.stopPropagation();
      this.onClick();
    });

    // Handle save button click
    this.saveButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.onSaveClick();
    });

    // Handle keyboard activation on save button
    this.saveButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        this.onSaveClick();
      }
    });

    // Listen for speech bubble hide event
    document.addEventListener("speechbubble:hide", () => {
      if (this.isActive) {
        this.resume();
      }
    });

    // Listen for mylist changes to update button state
    document.addEventListener("mylist:change", (e) => {
      if (e.detail && e.detail.fishId === this.data.id) {
        this.updateSaveButton();
      }
    });
  }

  /**
   * Handle save button click
   */
  onSaveClick() {
    myListService.toggle(this.data.id);
  }

  /**
   * Handle fish click
   */
  onClick() {
    // If already active, cycle to next fact
    if (this.isActive && this.speechBubble.isVisible) {
      this.speechBubble.nextFact();
      return;
    }

    // Pause swimming
    this.pause();
    this.isActive = true;
    this.element.classList.add("fish--active");

    // Get a random fact
    const fact = this.fishAPI.getRandomFact(this.data);

    if (fact) {
      // Show speech bubble
      const rect = this.element.getBoundingClientRect();
      const containerRect = this.element.parentElement.getBoundingClientRect();

      this.speechBubble.show(this.data, fact, {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top,
      });

      // Set up fact change callback
      this.speechBubble.setOnFactChange((fish, index) => {
        const newFact = this.fishAPI.getFact(fish, index);
        if (newFact) {
          this.speechBubble.updateFact(newFact);
        }
      });
    }
  }

  /**
   * Pause fish movement
   */
  pause() {
    this.isPaused = true;
    this.element.classList.add("fish--paused");
  }

  /**
   * Resume fish movement
   */
  resume() {
    this.isPaused = false;
    this.isActive = false;
    this.element.classList.remove("fish--paused", "fish--active");
  }

  /**
   * Update fish position
   */
  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    if (this.flipped) {
      this.element.classList.add("fish--flipped");
    } else {
      this.element.classList.remove("fish--flipped");
    }
  }

  /**
   * Move the fish one frame
   */
  move() {
    if (this.isPaused) return;

    // Update position
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off walls
    const margin = 50;
    const bottomMargin = 80; // Stay above sand

    if (this.x <= margin || this.x >= this.tankBounds.width - margin) {
      this.speedX *= -1;
      this.flipped = this.speedX < 0;

      // Add slight randomness on bounce
      this.speedY += randomBetween(-0.1, 0.1);
    }

    if (this.y <= 60 || this.y >= this.tankBounds.height - bottomMargin) {
      this.speedY *= -1;

      // Add slight randomness on bounce
      this.speedX += randomBetween(-0.1, 0.1) * (this.speedX > 0 ? 1 : -1);
    }

    // Clamp speed
    this.speedX = Math.max(-1, Math.min(1, this.speedX));
    this.speedY = Math.max(-0.5, Math.min(0.5, this.speedY));

    // Random direction changes
    if (Math.random() < 0.002) {
      this.speedY = randomBetween(-0.3, 0.3);
    }

    this.updatePosition();
  }

  /**
   * Start the animation loop
   */
  startAnimation() {
    const animate = () => {
      this.move();
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  /**
   * Stop the animation loop
   */
  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Update tank bounds (for resize)
   * @param {Object} bounds - New bounds {width, height}
   */
  updateBounds(bounds) {
    this.tankBounds = bounds;
  }
}
