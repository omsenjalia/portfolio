import { Octokit } from "octokit";

export type ProjectOverview = {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  readme_preview?: string;
  featured: boolean;
  blurb?: string;
};

type ProjectOverrides = Record<string, { featured?: boolean; blurb?: string }>;

const OWNER = process.env.GITHUB_OWNER || "omsenjalia";
const PAT = process.env.GITHUB_PAT;

let octokit: Octokit | null = null;

function getOctokit(): Octokit {
  if (!octokit) {
    octokit = new Octokit({ auth: PAT });
  }
  return octokit;
}

async function fetchOverrides(): Promise<ProjectOverrides> {
  try {
    const url = `https://api.github.com/repos/${OWNER}/portfolio-content/contents/projects.json`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${PAT}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "portfolio",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return {};
    const data = await res.json();
    const { projects } = JSON.parse(atob(data.content));
    return projects as ProjectOverrides;
  } catch {
    return {};
  }
}

export async function getProjectRepos(): Promise<ProjectOverview[]> {
  try {
    const { data } = await getOctokit().rest.repos.listForUser({
      username: OWNER,
      sort: "updated",
      per_page: 50,
      type: "owner",
    });

    const repos = data.map((repo) => ({
      name: repo.name,
      description: repo.description || "",
      html_url: repo.html_url,
      language: repo.language || "",
      stargazers_count: repo.stargazers_count ?? 0,
      topics: (repo.topics || []) as string[],
      updated_at: repo.updated_at || "",
    }));

    const overrides = await fetchOverrides();

    const withReadmes = await Promise.all(
      repos.slice(0, 10).map(async (repo) => {
        try {
          const { data: readmeData } = await getOctokit().rest.repos.getReadme({
            owner: OWNER,
            repo: repo.name,
            mediaType: { format: "raw" },
          });
          const text = String(readmeData);
          const preview = text
            .split("\n")
            .slice(0, 5)
            .join("\n")
            .substring(0, 300);
          return { ...repo, readme_preview: preview };
        } catch {
          return repo;
        }
      })
    );

    return withReadmes.map((repo) => ({
      ...repo,
      featured: overrides[repo.name]?.featured ?? false,
      blurb: overrides[repo.name]?.blurb,
    }));
  } catch {
    return [];
  }
}
