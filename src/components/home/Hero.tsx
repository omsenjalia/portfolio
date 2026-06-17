import { getGitHubProfile } from "@/lib/github";

export default async function Hero() {
  const profile = await getGitHubProfile();

  return (
    <section className="section-full flex items-center justify-center px-6">
      <div className="text-center max-w-prose mx-auto">
        <div className="mb-6">
          <img
            src={profile.avatar_url}
            alt={profile.name || profile.login}
            className="w-24 h-24 rounded-full mx-auto border-2 border-border shadow-sm"
          />
        </div>
        <h1 className="text-hero font-display font-bold tracking-tight text-ink mb-4">
          {profile.name || profile.login}
        </h1>
        <p className="text-lg font-body text-ink-muted mb-3">
          {profile.bio}
        </p>
        <p className="text-sm font-body text-ink-faint">
          <span className="inline-block mr-4">📍 {profile.location}</span>
          <span className="inline-block mr-4">📦 {profile.public_repos} repos</span>
          <span className="inline-block">👥 {profile.followers} followers</span>
        </p>
        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-5 py-2.5 bg-accent text-paper font-body text-sm rounded-md hover:bg-accent-hover transition-colors"
        >
          View GitHub Profile →
        </a>
      </div>
    </section>
  );
}
