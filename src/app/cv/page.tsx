import type { Metadata } from "next";
import { getCV } from "@/lib/content";

export const metadata: Metadata = {
  title: "CV",
};

export default async function CV() {
  const cv = await getCV();

  return (
    <div className="max-w-page mx-auto px-6 pt-12 pb-16">
      <div className="max-w-prose mx-auto">
        <div className="notebook-header-line mb-6"></div>
        <h1 className="text-2xl font-bold font-display text-ink mb-1">CV</h1>
        <p className="text-xs font-body text-ink-faint mb-6">
          {cv.name} — {cv.title}
        </p>

        {cv.summary && (
          <section className="mb-8">
            <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-2">
              Summary
            </h2>
            <p className="text-sm font-body text-ink leading-relaxed">{cv.summary}</p>
          </section>
        )}

        {cv.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {cv.experience.map((exp, i) => (
                <div key={i} className="border-l-2 border-border-light pl-3">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="text-sm font-bold font-body text-ink">
                        {exp.role}
                      </h3>
                      <p className="text-xs font-body text-ink-muted">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs font-body text-ink-faint whitespace-nowrap">
                      {exp.startDate}–{exp.endDate}
                    </span>
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-xs font-body text-ink space-y-0.5 mt-1">
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
            <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {cv.education.map((edu, i) => (
                <div key={i} className="border-l-2 border-border-light pl-3">
                  <h3 className="text-sm font-bold font-body text-ink">
                    {edu.institution}
                  </h3>
                  <div className="flex items-center justify-between text-xs font-body">
                    <span className="text-ink-muted">{edu.degree}</span>
                    <span className="text-ink-faint">
                      {edu.startDate}–{edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {cv.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {cv.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 border border-border rounded-sm text-xs font-body text-ink"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {cv.links.length > 0 && (
          <section>
            <h2 className="text-xs font-bold tracking-widest font-body text-ink-faint uppercase mb-3">
              Links
            </h2>
            <div className="flex flex-wrap gap-3 text-xs font-body">
              {cv.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
