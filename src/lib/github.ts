export type GitHubProfile = {
  login: string;
  name: string;
  bio: string;
  location: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

export type GitHubRepo = {
  name: string;
  description: string;
  html_url: string;
  language: string;
  fork: boolean;
  stargazers_count: number;
  updated_at: string;
};

export async function getGitHubProfile(): Promise<GitHubProfile> {
  const res = await fetch("https://api.github.com/users/omsenjalia", {
    headers: { "User-Agent": "portfolio" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub profile");
  return res.json();
}

export async function getRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    "https://api.github.com/users/omsenjalia/repos?sort=updated&per_page=10",
    {
      headers: { "User-Agent": "portfolio" },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}
