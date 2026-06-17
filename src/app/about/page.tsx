import type { Metadata } from "next";
import { getGitHubProfile } from "@/lib/github";

export const metadata: Metadata = {
  title: "About",
};

export default async function About() {
  const profile = await getGitHubProfile();

  return (
    <div className="max-w-prose mx-auto px-6 py-section">
      <h1 className="text-4xl font-display font-bold text-ink mb-8">About</h1>

      <div className="flex items-start gap-6 mb-8">
        <img
          src={profile.avatar_url}
          alt={profile.name || profile.login}
          className="w-20 h-20 rounded-full border-2 border-border"
        />
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">
            {profile.name || profile.login}
          </h2>
          <p className="text-sm font-body text-ink-muted mt-1">
            {profile.location && `📍 ${profile.location}`}
          </p>
        </div>
      </div>

      <div className="space-y-6 font-body text-ink leading-relaxed">
        <p>
          {profile.bio || "Aspiring software engineer, always learning."}
        </p>
        <p>
          I&apos;m currently in 12th grade, exploring the world of software
          engineering through hands-on projects. From Hyprland ricing to web
          development, I love building things that look good and work well.
        </p>
        <p>
          This portfolio is my corner of the internet — a place where I share
          what I&apos;m building, learning, and thinking about.
        </p>
      </div>

      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="text-lg font-display font-bold text-ink mb-3">Find me</h3>
        <ul className="space-y-2 font-body text-sm">
          <li>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              GitHub → {profile.login}
            </a>
          </li>
          {profile.public_repos > 0 && (
            <li className="text-ink-faint">
              {profile.public_repos} public repos · {profile.followers} followers
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
