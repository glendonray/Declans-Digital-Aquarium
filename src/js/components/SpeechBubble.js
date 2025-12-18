/**
 * SpeechBubble Component
 * Displays fish facts in a speech bubble
 */

import { myListService } from "../services/MyListService.js";

export class SpeechBubble {
  constructor() {
    this.element = document.getElementById("speech-bubble");
    this.nameEl = this.element.querySelector(".speech-bubble__name");
    this.scientificEl = this.element.querySelector(".speech-bubble__scientific");
    this.textEl = this.element.querySelector(".speech-bubble__text");
    this.sourceEl = this.element.querySelector(".speech-bubble__source a");
    this.navEl = document.getElementById("fact-nav");
    this.closeBtn = this.element.querySelector(".speech-bubble__close");
    this.saveBtn = this.element.querySelector(".speech-bubble__save");

    // Profile elements
    this.dietEl = this.element.querySelector(".speech-bubble__diet");
    this.sizeEl = this.element.querySelector(".speech-bubble__size");
    this.lifespanEl = this.element.querySelector(".speech-bubble__lifespan");

    this.currentFish = null;
    this.currentFactIndex = 0;
    this.isVisible = false;

    this.bindEvents();
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Close button
    this.closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hide();
    });

    // Save button click
    this.saveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.currentFish) {
        myListService.toggle(this.currentFish.id);
      }
    });

    // Click on bubble to cycle facts
    this.element.addEventListener("click", (e) => {
      if (e.target !== this.closeBtn && e.target !== this.saveBtn && this.currentFish) {
        this.nextFact();
      }
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isVisible) {
        this.hide();
      }
    });

    // Listen for mylist changes to update save button state
    document.addEventListener("mylist:change", (e) => {
      if (this.currentFish && e.detail && e.detail.fishId === this.currentFish.id) {
        this.updateSaveButton();
      }
    });
  }

  /**
   * Update save button state based on myListService
   */
  updateSaveButton() {
    if (!this.currentFish) return;
    const isSaved = myListService.has(this.currentFish.id);
    this.saveBtn.innerHTML = isSaved ? "❤️" : "🤍";
    this.saveBtn.setAttribute("aria-label", isSaved ? `Remove ${this.currentFish.name} from my fish` : `Add ${this.currentFish.name} to my fish`);
    this.saveBtn.classList.toggle("speech-bubble__save--saved", isSaved);
  }

  /**
   * Show the speech bubble for a fish
   * @param {Object} fish - Fish data object
   * @param {Object} fact - Fact object with text and source
   * @param {Object} position - Position {x, y} for the bubble
   */
  show(fish, fact, position) {
    this.currentFish = fish;
    this.currentFactIndex = fact.index;

    // Update content
    this.nameEl.textContent = fish.name;
    this.scientificEl.textContent = fish.scientificName;
    this.textEl.textContent = fact.text;
    this.sourceEl.textContent = fact.source.name;
    this.sourceEl.href = fact.source.url;

    // Update profile info
    const profile = fish.profile || {};
    this.dietEl.textContent = profile.diet || "Unknown";
    this.sizeEl.textContent = profile.size || "Unknown";
    this.lifespanEl.textContent = profile.lifespan || "Unknown";

    // Update save button state
    this.updateSaveButton();

    // Update navigation dots
    this.updateNav(fact.index, fact.total);

    // Position the bubble
    this.position(position);

    // Show with animation
    this.element.classList.add("speech-bubble--visible");
    this.isVisible = true;
  }

  /**
   * Hide the speech bubble
   */
  hide() {
    this.element.classList.remove("speech-bubble--visible");
    this.isVisible = false;
    this.currentFish = null;

    // Dispatch custom event so fish can resume swimming
    document.dispatchEvent(new CustomEvent("speechbubble:hide"));
  }

  /**
   * Cycle to next fact
   */
  nextFact() {
    if (!this.currentFish || !this.onFactChange) return;

    this.currentFactIndex = (this.currentFactIndex + 1) % this.currentFish.facts.length;
    this.onFactChange(this.currentFish, this.currentFactIndex);
  }

  /**
   * Update the fact content
   * @param {Object} fact - New fact object
   */
  updateFact(fact) {
    this.textEl.textContent = fact.text;
    this.sourceEl.textContent = fact.source.name;
    this.sourceEl.href = fact.source.url;
    this.updateNav(fact.index, fact.total);
  }

  /**
   * Update navigation dots
   * @param {number} current - Current fact index
   * @param {number} total - Total number of facts
   */
  updateNav(current, total) {
    this.navEl.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("span");
      dot.className = "speech-bubble__dot";
      if (i === current) {
        dot.classList.add("speech-bubble__dot--active");
      }
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        if (this.onFactChange) {
          this.currentFactIndex = i;
          this.onFactChange(this.currentFish, i);
        }
      });
      this.navEl.appendChild(dot);
    }
  }

  /**
   * Check if we're on a mobile device (based on viewport width)
   * @returns {boolean}
   */
  isMobile() {
    return window.innerWidth <= 600;
  }

  /**
   * Position the bubble near the fish
   * @param {Object} pos - Position {x, y}
   */
  position(pos) {
    // On mobile, CSS handles positioning as a fixed bottom sheet
    if (this.isMobile()) {
      this.element.style.left = "";
      this.element.style.top = "";
      return;
    }

    const bubbleRect = this.element.getBoundingClientRect();
    const containerRect = this.element.parentElement.getBoundingClientRect();

    let x = pos.x - 20;
    let y = pos.y - bubbleRect.height - 20;

    // Keep bubble within container bounds
    if (x + bubbleRect.width > containerRect.width - 10) {
      x = containerRect.width - bubbleRect.width - 10;
    }
    if (x < 10) x = 10;

    if (y < 10) {
      y = pos.y + 60; // Show below the fish instead
    }

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  /**
   * Set callback for fact changes
   * @param {Function} callback - Called with (fish, factIndex)
   */
  setOnFactChange(callback) {
    this.onFactChange = callback;
  }
}
