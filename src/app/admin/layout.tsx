import SmoothScroll from "@/components/providers/SmoothScroll";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 border-b border-ink-border">
          <Link
            href="/"
            className="font-bold font-display text-sm tracking-widest text-ink uppercase hover:text-accent transition-colors"
          >
            Om Senjalia
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-xs font-bold font-body tracking-widest text-ink-muted uppercase hover:text-accent hover:underline transition-all duration-300"
            >
              Dashboard
            </Link>
            <Link
              href="/api/auth/signout"
              className="text-xs font-bold font-body tracking-widest text-ink-muted uppercase hover:text-accent hover:underline transition-all duration-300"
            >
              Sign Out
            </Link>
          </nav>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </SmoothScroll>
  );
}
