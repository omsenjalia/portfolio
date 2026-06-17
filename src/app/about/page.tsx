import type { Metadata } from "next";
import { getGitHubProfile } from "@/lib/github";

export const metadata: Metadata = {
  title: "About",
};

export default async function About() {
  const profile = await getGitHubProfile();

  return (
    <div className="max-w-page mx-auto px-6 pt-12 pb-16">
      <div className="max-w-prose mx-auto">
        <div className="notebook-header-line mb-6"></div>
        <h1 className="text-2xl font-bold font-display text-ink mb-6">About</h1>

        <div className="font-body text-sm text-ink space-y-4 leading-relaxed">
          <div className="flex items-center gap-4 mb-6 p-3 border border-border rounded-sm">
            <img
              src={profile.avatar_url}
              alt={profile.name || profile.login}
              className="w-12 h-12 rounded-full border border-border"
            />
            <div>
              <p className="font-bold text-ink">
                {profile.name || profile.login}
              </p>
              <p className="text-xs text-ink-faint">
                {profile.location && `📍 ${profile.location}`}
              </p>
            </div>
          </div>

          <p>{profile.bio || "Aspiring software engineer, always learning."}</p>

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

        <div className="mt-8 pt-4 border-t border-border">
          <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-3">
            Find me
          </h2>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-body text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
          >
            github.com/{profile.login} →
          </a>
          <p className="text-xs text-ink-faint mt-1 font-body">
            {profile.public_repos} public repos · {profile.followers} followers
          </p>
        </div>
      </div>
    </div>
  );
}
