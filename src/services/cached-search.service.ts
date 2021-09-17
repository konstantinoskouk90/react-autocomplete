export default class CachedSearch<T> {
  cache: Map<string, T[]>;
  searchPromise: (searchTerm: string) => Promise<T[]>;
  
  constructor(searchPromise: (searchTerm: string) => Promise<T[]>) {
    this.cache = new Map();
    this.searchPromise = searchPromise;
  }

  async changeSearch(searchTerm: string): Promise<T[]> {
    const cachedSearchTerm = this.cache.get(searchTerm);

    if (cachedSearchTerm) {
      return cachedSearchTerm;
    } else {
      const results = await this.searchPromise(searchTerm);

      this.cache.set(searchTerm, results);

      return results;
    }
  }
}