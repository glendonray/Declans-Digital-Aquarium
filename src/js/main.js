/**
 * Declan's Digital Aquarium
 * Main entry point - initializes and connects all components
 */

import { Tank } from "./components/Tank.js";
import { MyListPanel } from "./components/MyListPanel.js";
import { fishAPI } from "./services/FishAPI.js";
import { myListService } from "./services/MyListService.js";

/**
 * Initialize the aquarium
 */
async function init() {
  const aquariumEl = document.getElementById("aquarium");

  if (!aquariumEl) {
    console.error("Aquarium container not found!");
    return;
  }

  // Create the tank
  const tank = new Tank(aquariumEl, fishAPI);

  // Create My List Panel
  const myListPanel = new MyListPanel(fishAPI, (fishData) => {
    // When a fish is clicked in the panel, show it in the tank
    tank.showFishFromList(fishData);
  });

  // Wire up My Fish button
  const myListButton = document.getElementById("my-list-button");
  const myListCount = document.getElementById("my-list-count");

  if (myListButton) {
    myListButton.addEventListener("click", () => {
      myListPanel.toggle();
    });
  }

  // Update count badge
  function updateMyListCount() {
    const count = myListService.count();
    if (myListCount) {
      myListCount.textContent = count > 0 ? count : "";
    }
  }

  // Initial count update
  updateMyListCount();

  // Listen for list changes to update count
  document.addEventListener("mylist:change", updateMyListCount);

  // Wire up swap button
  const swapButton = document.getElementById("swap-fish");
  if (swapButton) {
    swapButton.addEventListener("click", async () => {
      swapButton.disabled = true;
      swapButton.classList.add("swap-button--loading");
      swapButton.textContent = "🔄 Loading...";

      await tank.swapAllFish();

      swapButton.disabled = false;
      swapButton.classList.remove("swap-button--loading");
      swapButton.textContent = "🐠 Meet New Fish";
    });
  }

  // Expose tank globally for debugging (optional)
  window.aquarium = tank;

  console.log("🐠 Declan's Digital Aquarium initialized!");
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
