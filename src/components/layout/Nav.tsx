import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/now", label: "Now" },
  { href: "/uses", label: "Uses" },
  { href: "/colophon", label: "Colophon" },
];

export default function Nav() {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-border">
      <Link
        href="/"
        className="font-bold font-display text-sm tracking-widest text-ink uppercase hover:text-accent transition-colors"
      >
        Om Senjalia
      </Link>
      <nav className="flex items-center gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs font-bold font-body tracking-widest text-ink-muted uppercase hover:text-accent hover:underline transition-all duration-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
