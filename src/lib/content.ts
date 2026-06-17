interface GitHubContentResponse {
  name: string;
  path: string;
  content: string;
  encoding: string;
  sha: string;
}

type PinsData = {
  pins: Pin[];
};

export type Pin = {
  type: "github" | "url" | "note";
  label: string;
  url?: string;
  desc?: string;
  content?: string;
};

export type CVData = {
  name: string;
  title: string;
  email: string;
  github: string;
  website: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  links: Link[];
};

export type Experience = {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
};

export type Education = {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export type Link = {
  label: string;
  url: string;
};

export type UsesData = {
  os: string;
  wm: string;
  terminal: string;
  editor: string;
  ai: string[];
  homelab: string[];
  dotfiles: string;
};

const OWNER = process.env.GITHUB_OWNER || "omsenjalia";
const REPO = `${OWNER}/portfolio-content`;
const PAT = process.env.GITHUB_PAT;

async function fetchFromGitHub(path: string): Promise<{ content: string; sha: string }> {
  const url = `https://api.github.com/repos/${REPO}/contents/${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${PAT}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status} ${res.statusText}`);
  const data: GitHubContentResponse & { content: string; sha: string } = await res.json();
  return {
    content: atob(data.content),
    sha: data.sha,
  };
}

export async function getCV(): Promise<CVData> {
  const { content } = await fetchFromGitHub("cv.json");
  return JSON.parse(content);
}

export async function getNow(): Promise<string> {
  const { content } = await fetchFromGitHub("now.md");
  return content;
}

export async function getUses(): Promise<UsesData> {
  const { content } = await fetchFromGitHub("uses.json");
  return JSON.parse(content);
}

export async function getPinned(): Promise<{ pins: Pin[]; sha: string }> {
  const { content, sha } = await fetchFromGitHub("pinned.json");
  return { pins: JSON.parse(content).pins, sha };
}
