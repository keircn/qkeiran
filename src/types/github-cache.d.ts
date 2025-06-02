export interface CacheEntry {
  data: GitHubRepo;
  timestamp: number;
}

export interface CacheStore {
  [repoName: string]: CacheEntry;
}
