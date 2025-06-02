export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  homepage: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface RepoRequest {
  repos: string[];
}