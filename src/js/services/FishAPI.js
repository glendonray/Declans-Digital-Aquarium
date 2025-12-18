/**
 * FishAPI Service
 * Loads fish data with lazy loading and caching for scalability
 */

export class FishAPI {
  constructor() {
    this.index = []; // Lightweight fish list from index.json
    this.fishCache = {}; // Cache for full fish data
    this.sources = {};
    this.indexLoaded = false;
    this.sourcesLoaded = false;
  }

  /**
   * Load the lightweight fish index
   * @returns {Promise<Array>} Array of fish summary objects
   */
  async loadIndex() {
    if (this.indexLoaded) {
      return this.index;
    }

    try {
      const response = await fetch("api/index.json");
      if (!response.ok) {
        throw new Error(`Failed to load index: ${response.status}`);
      }
      const data = await response.json();
      this.index = data.fish;
      this.indexLoaded = true;
      return this.index;
    } catch (error) {
      console.error("Error loading fish index:", error);
      return [];
    }
  }

  /**
   * Load source attribution data
   * @returns {Promise<Object>} Sources object
   */
  async loadSources() {
    if (this.sourcesLoaded) {
      return this.sources;
    }

    try {
      const response = await fetch("api/sources.json");
      if (!response.ok) {
        throw new Error(`Failed to load sources: ${response.status}`);
      }
      const data = await response.json();
      this.sources = data.sources;
      this.sourcesLoaded = true;
      return this.sources;
    } catch (error) {
      console.error("Error loading sources:", error);
      return {};
    }
  }

  /**
   * Get full fish data by ID (lazy loaded with cache)
   * @param {string} id - Fish ID
   * @returns {Promise<Object|null>} Full fish data or null
   */
  async getFishById(id) {
    // Check cache first
    if (this.fishCache[id]) {
      return this.fishCache[id];
    }

    try {
      const response = await fetch(`api/fish/${id}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load fish ${id}: ${response.status}`);
      }
      const fish = await response.json();
      this.fishCache[id] = fish;
      return fish;
    } catch (error) {
      console.error(`Error loading fish ${id}:`, error);
      return null;
    }
  }

  /**
   * Get multiple fish by IDs (parallel loading)
   * @param {Array<string>} ids - Array of fish IDs
   * @returns {Promise<Array>} Array of fish data objects
   */
  async getMultipleFish(ids) {
    const results = await Promise.all(ids.map((id) => this.getFishById(id)));
    return results.filter((fish) => fish !== null);
  }

  /**
   * Load all fish data (for backward compatibility)
   * @returns {Promise<Array>} Array of full fish objects
   */
  async loadFish() {
    await this.loadIndex();
    const ids = this.index.map((f) => f.id);
    return this.getMultipleFish(ids);
  }

  /**
   * Get a random fact from a fish
   * @param {Object} fish - Fish object with facts array
   * @returns {Object|null} Fact object with text and source
   */
  getRandomFact(fish) {
    if (!fish.facts || fish.facts.length === 0) {
      return null;
    }
    const factIndex = Math.floor(Math.random() * fish.facts.length);
    const fact = fish.facts[factIndex];
    const source = this.sources[fact.sourceId] || { name: "Unknown", url: "#" };

    return {
      ...fact,
      source,
      index: factIndex,
      total: fish.facts.length,
    };
  }

  /**
   * Get a specific fact by index
   * @param {Object} fish - Fish object
   * @param {number} index - Fact index
   * @returns {Object|null} Fact object with text and source
   */
  getFact(fish, index) {
    if (!fish.facts || fish.facts.length === 0) {
      return null;
    }
    const factIndex = index % fish.facts.length;
    const fact = fish.facts[factIndex];
    const source = this.sources[fact.sourceId] || { name: "Unknown", url: "#" };

    return {
      ...fact,
      source,
      index: factIndex,
      total: fish.facts.length,
    };
  }

  /**
   * Get fish summary from index by ID
   * @param {string} id - Fish ID
   * @returns {Object|null} Fish summary or null
   */
  getIndexEntry(id) {
    return this.index.find((f) => f.id === id) || null;
  }

  /**
   * Clear the cache (useful for memory management with many fish)
   */
  clearCache() {
    this.fishCache = {};
  }
}

// Export a singleton instance
export const fishAPI = new FishAPI();
