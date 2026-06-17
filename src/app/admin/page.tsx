import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  return (
    <div className="max-w-prose mx-auto px-6 pt-12">
      <div className="notebook-header-line mb-6"></div>
      <h1 className="text-2xl font-bold font-display text-ink mb-2">
        Admin
      </h1>
      <p className="text-sm font-body text-ink-muted mb-4">
        Welcome, {session.user.name || "admin"}
      </p>
      <p className="text-xs font-body text-ink-faint">
        Dashboard UI coming in a later phase.
      </p>
    </div>
  );
}
