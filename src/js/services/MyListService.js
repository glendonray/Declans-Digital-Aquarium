/**
 * MyListService
 * Manages Declan's saved fish list with localStorage persistence
 */

const STORAGE_KEY = "declans-aquarium-my-fish";

class MyListService {
  constructor() {
    this.fishIds = this.load();
  }

  /**
   * Load saved fish IDs from localStorage
   * @returns {Set<string>} Set of fish IDs
   */
  load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ids = JSON.parse(stored);
        return new Set(ids);
      }
    } catch (error) {
      console.error("Error loading my fish list:", error);
    }
    return new Set();
  }

  /**
   * Save fish IDs to localStorage
   */
  save() {
    try {
      const ids = Array.from(this.fishIds);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (error) {
      console.error("Error saving my fish list:", error);
    }
  }

  /**
   * Add a fish to the list
   * @param {string} fishId - Fish ID to add
   */
  add(fishId) {
    if (!this.fishIds.has(fishId)) {
      this.fishIds.add(fishId);
      this.save();
      this.emit("add", fishId);
      this.emit("change", { action: "add", fishId });
    }
  }

  /**
   * Remove a fish from the list
   * @param {string} fishId - Fish ID to remove
   */
  remove(fishId) {
    if (this.fishIds.has(fishId)) {
      this.fishIds.delete(fishId);
      this.save();
      this.emit("remove", fishId);
      this.emit("change", { action: "remove", fishId });
    }
  }

  /**
   * Toggle a fish in the list
   * @param {string} fishId - Fish ID to toggle
   * @returns {boolean} True if now saved, false if removed
   */
  toggle(fishId) {
    if (this.has(fishId)) {
      this.remove(fishId);
      return false;
    } else {
      this.add(fishId);
      return true;
    }
  }

  /**
   * Check if a fish is in the list
   * @param {string} fishId - Fish ID to check
   * @returns {boolean}
   */
  has(fishId) {
    return this.fishIds.has(fishId);
  }

  /**
   * Get all saved fish IDs
   * @returns {Array<string>}
   */
  getAll() {
    return Array.from(this.fishIds);
  }

  /**
   * Get the count of saved fish
   * @returns {number}
   */
  count() {
    return this.fishIds.size;
  }

  /**
   * Clear all saved fish
   */
  clear() {
    this.fishIds.clear();
    this.save();
    this.emit("clear");
    this.emit("change", { action: "clear" });
  }

  /**
   * Emit a custom event
   * @param {string} eventName - Event name
   * @param {*} detail - Event detail data
   */
  emit(eventName, detail = null) {
    const event = new CustomEvent(`mylist:${eventName}`, {
      detail,
      bubbles: true,
    });
    document.dispatchEvent(event);
  }
}

// Export a singleton instance
export const myListService = new MyListService();
