import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/now", label: "Now" },
  { href: "/uses", label: "Uses" },
  { href: "/colophon", label: "Colophon" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-nav bg-paper/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-page mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-bold text-ink hover:text-accent transition-colors"
        >
          Om Senjalia
        </Link>
        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-body text-ink-muted hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
