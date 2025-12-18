/**
 * FishAPI Service
 * Loads and provides fish data from local JSON files
 */

export class FishAPI {
  constructor() {
    this.fish = [];
    this.sources = {};
    this.loaded = false;
  }

  /**
   * Load all fish data from the local JSON API
   * @returns {Promise<Array>} Array of fish objects
   */
  async loadFish() {
    if (this.loaded) {
      return this.fish;
    }

    try {
      const response = await fetch('api/fish.json');
      if (!response.ok) {
        throw new Error(`Failed to load fish data: ${response.status}`);
      }
      const data = await response.json();
      this.fish = data.fish;
      this.loaded = true;
      return this.fish;
    } catch (error) {
      console.error('Error loading fish data:', error);
      return [];
    }
  }

  /**
   * Load source attribution data
   * @returns {Promise<Object>} Sources object
   */
  async loadSources() {
    if (Object.keys(this.sources).length > 0) {
      return this.sources;
    }

    try {
      const response = await fetch('api/sources.json');
      if (!response.ok) {
        throw new Error(`Failed to load sources: ${response.status}`);
      }
      const data = await response.json();
      this.sources = data.sources;
      return this.sources;
    } catch (error) {
      console.error('Error loading sources:', error);
      return {};
    }
  }

  /**
   * Load all data (fish and sources)
   * @returns {Promise<Object>} Object with fish and sources
   */
  async loadAll() {
    const [fish, sources] = await Promise.all([
      this.loadFish(),
      this.loadSources()
    ]);
    return { fish, sources };
  }

  /**
   * Get a random fact from a fish
   * @param {Object} fish - Fish object
   * @returns {Object} Fact object with text and source
   */
  getRandomFact(fish) {
    if (!fish.facts || fish.facts.length === 0) {
      return null;
    }
    const factIndex = Math.floor(Math.random() * fish.facts.length);
    const fact = fish.facts[factIndex];
    const source = this.sources[fact.sourceId] || { name: 'Unknown', url: '#' };
    
    return {
      ...fact,
      source,
      index: factIndex,
      total: fish.facts.length
    };
  }

  /**
   * Get a specific fact by index
   * @param {Object} fish - Fish object
   * @param {number} index - Fact index
   * @returns {Object} Fact object with text and source
   */
  getFact(fish, index) {
    if (!fish.facts || fish.facts.length === 0) {
      return null;
    }
    const factIndex = index % fish.facts.length;
    const fact = fish.facts[factIndex];
    const source = this.sources[fact.sourceId] || { name: 'Unknown', url: '#' };
    
    return {
      ...fact,
      source,
      index: factIndex,
      total: fish.facts.length
    };
  }

  /**
   * Get fish by ID
   * @param {string} id - Fish ID
   * @returns {Object|null} Fish object or null
   */
  getFishById(id) {
    return this.fish.find(f => f.id === id) || null;
  }
}

// Export a singleton instance
export const fishAPI = new FishAPI();
