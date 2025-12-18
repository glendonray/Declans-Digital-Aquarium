/**
 * Declan's Digital Aquarium
 * Main entry point - initializes and connects all components
 */

import { Tank } from "./components/Tank.js";
import { MyListPanel } from "./components/MyListPanel.js";
import { fishAPI } from "./services/FishAPI.js";
import { myListService } from "./services/MyListService.js";
import * as PWAService from "./services/PWAService.js";
import * as DailyFishService from "./services/DailyFishService.js";
import * as NotificationService from "./services/NotificationService.js";

/**
 * Initialize the aquarium
 */
async function init() {
  // Initialize PWA (service worker + install prompt)
  PWAService.init();

  const aquariumEl = document.getElementById("aquarium");

  if (!aquariumEl) {
    console.error("Aquarium container not found!");
    return;
  }

  // Check if it's a new day and handle notifications
  const isNewDay = DailyFishService.isNewDay();

  if (isNewDay) {
    // Show notification if permission granted
    if (NotificationService.getPermission() === "granted") {
      NotificationService.showNewFishNotification();
    }
    // Mark today as visited
    DailyFishService.markVisited();
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

  // Request notification permission after first user interaction
  // (browsers require user gesture for notification permission)
  if (!NotificationService.hasAskedPermission() && NotificationService.isSupported()) {
    const requestPermissionOnInteraction = async () => {
      await NotificationService.requestPermission();
      // Remove listeners after first interaction
      document.removeEventListener("click", requestPermissionOnInteraction);
    };
    // Wait for a click anywhere to request permission
    document.addEventListener("click", requestPermissionOnInteraction, { once: true });
  }

  // Expose tank globally for debugging (optional)
  window.aquarium = tank;

  console.log("🐠 Declan's Digital Aquarium initialized!");
  if (isNewDay) {
    console.log("🌅 New day! Fresh fish are swimming today.");
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
