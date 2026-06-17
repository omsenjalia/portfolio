export default function Footer() {
  return (
    <footer className="border-t border-border mt-section">
      <div className="max-w-page mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-faint font-body">
        <p>&copy; {new Date().getFullYear()} Om Senjalia</p>
        <p>Built with Next.js, Tailwind, GSAP & Lenis</p>
      </div>
    </footer>
  );
}
