import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto px-6 pt-24">
      <div className="notebook-header-line mb-6"></div>
      <h1 className="text-2xl font-bold font-display text-ink mb-6">Sign In</h1>
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/admin" });
        }}
      >
        <button
          type="submit"
          className="px-4 py-2 bg-ink text-paper text-sm font-body rounded-sm
                     hover:bg-ink-light transition-colors"
        >
          Continue with GitHub →
        </button>
      </form>
    </div>
  );
}
