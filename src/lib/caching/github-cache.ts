import { GitHubRepo } from '~/types/github';
import { CacheStore } from '~/types/github-cache';

class GitHubCache {
  private cache: CacheStore = {};
  private readonly TTL_MS = 60 * 60 * 1000;

  get(repoName: string): GitHubRepo | null {
    const entry = this.cache[repoName];

    if (!entry) {
      return null;
    }

    const now = Date.now();
    const isExpired = now - entry.timestamp > this.TTL_MS;

    if (isExpired) {
      delete this.cache[repoName];
      return null;
    }

    return entry.data;
  }

  set(repoName: string, data: GitHubRepo): void {
    this.cache[repoName] = {
      data,
      timestamp: Date.now(),
    };
  }

  has(repoName: string): boolean {
    return this.get(repoName) !== null;
  }

  delete(repoName: string): boolean {
    return delete this.cache[repoName];
  }

  clear(): void {
    this.cache = {};
  }

  getStats(): { totalEntries: number; cacheKeys: string[] } {
    return {
      totalEntries: Object.keys(this.cache).length,
      cacheKeys: Object.keys(this.cache),
    };
  }

  cleanup(): number {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of Object.entries(this.cache)) {
      if (now - entry.timestamp > this.TTL_MS) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => delete this.cache[key]);
    return keysToDelete.length;
  }
}

export const githubCache = new GitHubCache();

if (
  typeof globalThis !== 'undefined' &&
  !(globalThis as any)._githubCacheCleanupStarted
) {
  (globalThis as any)._githubCacheCleanupStarted = true;
  setInterval(
    () => {
      const cleaned = githubCache.cleanup();
      if (cleaned > 0) {
        console.log(`GitHub cache cleanup: removed ${cleaned} expired entries`);
      }
    },
    30 * 60 * 1000
  );
}
