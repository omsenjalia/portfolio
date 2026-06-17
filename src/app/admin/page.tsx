import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  return (
    <main className="section-full flex items-center justify-center">
      <div className="text-center max-w-prose mx-auto px-6">
        <h1 className="text-4xl font-display font-bold mb-4">
          Admin Dashboard
        </h1>
        <p className="text-ink-muted font-body mb-4">
          Welcome, {session.user.name || "admin"}
        </p>
        <p className="text-sm text-ink-faint">
          Phase 0 — Auth is working. Dashboard UI comes in Phase 5.
        </p>
      </div>
    </main>
  );
}
