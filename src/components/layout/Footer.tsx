export default function Footer() {
  return (
    <div className="border-t border-border mt-16 px-6 py-4">
      <div className="max-w-page mx-auto flex items-center justify-between text-xs font-body text-ink-faint">
        <span>&copy; {new Date().getFullYear()}</span>
        <span className="tracking-widest uppercase">
          Next.js · Tailwind · GSAP
        </span>
      </div>
    </div>
  );
}
