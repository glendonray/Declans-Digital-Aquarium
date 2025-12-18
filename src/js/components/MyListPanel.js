/**
 * MyListPanel Component
 * Slide-out panel showing Declan's saved fish collection
 */

import { myListService } from "../services/MyListService.js";
import { generateFishSVG } from "../services/FishSVGGenerator.js";

export class MyListPanel {
  constructor(fishAPI, onViewFish) {
    this.fishAPI = fishAPI;
    this.onViewFish = onViewFish;
    this.isVisible = false;
    this.element = null;
    this.listElement = null;

    this.render();
    this.bindEvents();
  }

  /**
   * Create the panel DOM structure
   */
  render() {
    this.element = document.getElementById("my-list-panel");
    if (!this.element) {
      console.error("MyListPanel: #my-list-panel element not found");
      return;
    }

    this.element.innerHTML = `
      <div class="my-list-panel__header">
        <h2 class="my-list-panel__title">🐠 My Fish</h2>
        <button class="my-list-panel__close" aria-label="Close panel">&times;</button>
      </div>
      <div class="my-list-panel__content">
        <div class="my-list-panel__list" id="my-list-items"></div>
        <div class="my-list-panel__empty">
          <p>You haven't added any fish yet!</p>
          <p>Click the 🤍 on a fish to add it to your collection.</p>
        </div>
      </div>
    `;

    this.listElement = this.element.querySelector("#my-list-items");
    this.emptyElement = this.element.querySelector(".my-list-panel__empty");
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Close button
    const closeBtn = this.element.querySelector(".my-list-panel__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.hide());
    }

    // Click outside to close
    this.element.addEventListener("click", (e) => {
      if (e.target === this.element) {
        this.hide();
      }
    });

    // Escape key to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isVisible) {
        this.hide();
      }
    });

    // Listen for list changes
    document.addEventListener("mylist:change", () => {
      if (this.isVisible) {
        this.updateList();
      }
    });
  }

  /**
   * Show the panel
   */
  async show() {
    this.isVisible = true;
    this.element.classList.add("my-list-panel--visible");
    await this.updateList();
  }

  /**
   * Hide the panel
   */
  hide() {
    this.isVisible = false;
    this.element.classList.remove("my-list-panel--visible");
  }

  /**
   * Toggle panel visibility
   */
  async toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      await this.show();
    }
  }

  /**
   * Update the fish list display
   */
  async updateList() {
    const fishIds = myListService.getAll();

    // Show/hide empty state
    const hasfish = fishIds.length > 0;
    this.listElement.style.display = hasfish ? "grid" : "none";
    this.emptyElement.style.display = hasfish ? "none" : "block";

    if (!hasfish) {
      this.listElement.innerHTML = "";
      return;
    }

    // Load fish data
    const fishData = await this.fishAPI.getMultipleFish(fishIds);

    // Render fish cards
    this.listElement.innerHTML = fishData.map((fish) => this.renderFishCard(fish)).join("");

    // Bind card events
    this.bindCardEvents();
  }

  /**
   * Render a single fish card
   * @param {Object} fish - Fish data
   * @returns {string} HTML string
   */
  renderFishCard(fish) {
    const svgString = generateFishSVG(fish);

    return `
      <div class="my-list-panel__card" data-fish-id="${fish.id}">
        <button class="my-list-panel__card-remove" aria-label="Remove ${fish.name} from my fish">&times;</button>
        <div class="my-list-panel__card-image">
          ${svgString}
        </div>
        <div class="my-list-panel__card-name">${fish.name}</div>
      </div>
    `;
  }

  /**
   * Bind events to fish cards
   */
  bindCardEvents() {
    // Remove buttons
    this.listElement.querySelectorAll(".my-list-panel__card-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = btn.closest(".my-list-panel__card");
        const fishId = card.dataset.fishId;
        myListService.remove(fishId);
      });
    });

    // Card clicks - view fish
    this.listElement.querySelectorAll(".my-list-panel__card").forEach((card) => {
      card.addEventListener("click", async () => {
        const fishId = card.dataset.fishId;
        if (this.onViewFish) {
          const fishData = await this.fishAPI.getFishById(fishId);
          if (fishData) {
            this.onViewFish(fishData);
            this.hide();
          }
        }
      });
    });
  }
}
