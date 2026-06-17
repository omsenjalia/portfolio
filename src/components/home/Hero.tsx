import { getGitHubProfile } from "@/lib/github";

export default async function Hero() {
  const profile = await getGitHubProfile();

  return (
    <section className="max-w-page mx-auto px-6 pt-16 pb-12">
      <div className="max-w-prose mx-auto">
        <div className="notebook-header-line mb-6"></div>

        <div className="font-body text-sm text-ink space-y-2">
          <div>
            <span className="text-accent font-bold">name</span>:
            <span className="text-ink-light ml-1">
              &quot;{profile.name || profile.login}&quot;
            </span>
          </div>
          <div>
            <span className="text-accent font-bold">bio</span>:
            <span className="text-ink-light ml-1">
              &quot;{profile.bio}&quot;
            </span>
          </div>
          <div>
            <span className="text-accent font-bold">location</span>:
            <span className="text-ink-light ml-1">
              &quot;{profile.location || "Earth"}&quot;
            </span>
          </div>
          <div>
            <span className="text-accent font-bold">repos</span>:
            <span className="text-ink-light ml-1">{profile.public_repos}</span>
          </div>
          <div>
            <span className="text-accent font-bold">followers</span>:
            <span className="text-ink-light ml-1">{profile.followers}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar_url}
              alt={profile.name || profile.login}
              className="w-10 h-10 rounded-full border border-border"
            />
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-body text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
            >
              github.com/{profile.login} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
