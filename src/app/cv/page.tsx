import type { Metadata } from "next";
import { getCV } from "@/lib/content";

export const metadata: Metadata = {
  title: "CV",
};

export default async function CV() {
  const cv = await getCV();

  return (
    <div className="max-w-prose mx-auto px-6 py-section">
      <h1 className="text-4xl font-display font-bold text-ink mb-2">CV</h1>
      <p className="text-lg font-body text-ink-muted mb-1">
        {cv.name} — {cv.title}
      </p>
      <div className="flex flex-wrap gap-3 mb-8 text-sm font-body text-ink-faint">
        {cv.email && <span>{cv.email}</span>}
        <a
          href={`https://github.com/${cv.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover transition-colors"
        >
          github.com/{cv.github}
        </a>
      </div>

      {cv.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-display font-bold text-ink mb-3">Summary</h2>
          <p className="font-body text-ink leading-relaxed">{cv.summary}</p>
        </section>
      )}

      {cv.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display font-bold text-ink mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {cv.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-display font-bold text-ink">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-body text-ink-muted">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs font-body text-ink-faint whitespace-nowrap">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-sm font-body text-ink-muted mb-2">
                    {exp.description}
                  </p>
                )}
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-sm font-body text-ink space-y-1">
                    {exp.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {cv.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display font-bold text-ink mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {cv.education.map((edu, i) => (
              <div key={i} className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-bold text-ink">
                    {edu.institution}
                  </h3>
                  <p className="text-sm font-body text-ink-muted">
                    {edu.degree}
                  </p>
                </div>
                <span className="text-xs font-body text-ink-faint whitespace-nowrap">
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {cv.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display font-bold text-ink mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {cv.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-surface-elevated border border-border-light rounded-full text-sm font-body text-ink"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {cv.links.length > 0 && (
        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">
            Links
          </h2>
          <div className="flex flex-wrap gap-3 text-sm font-body">
            {cv.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition-colors"
              >
                {link.label} →
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
