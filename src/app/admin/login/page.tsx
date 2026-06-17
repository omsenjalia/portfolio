import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="section-full flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-6">
        <h1 className="text-3xl font-display font-bold mb-6">Sign In</h1>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/admin" });
          }}
        >
          <button
            type="submit"
            className="px-6 py-3 bg-ink text-paper font-body rounded-md
                       hover:bg-ink-light transition-colors duration-300"
          >
            Continue with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}
