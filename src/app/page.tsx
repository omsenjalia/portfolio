import { getGitHubProfile } from "@/lib/github";
import { getCV, getNow, getUses, getPinned, type Pin } from "@/lib/content";
import { auth } from "@/auth";
import Book from "@/components/book/Book";

export const dynamic = "force-dynamic";

export default async function Home() {
  let profile = null;
  let cv = null;
  let now = null;
  let uses = null;
  let pins: Pin[] = [];

  try { profile = await getGitHubProfile(); } catch {}
  try { cv = await getCV(); } catch {}
  try { now = await getNow(); } catch {}
  try { uses = await getUses(); } catch {}

  const session = await auth();
  const isAdmin =
    !!session?.user &&
    (session.user.email === process.env.ADMIN_EMAIL ||
      (session.user as any).login === "omsenjalia");

  if (isAdmin) {
    try {
      const data = await getPinned();
      pins = data.pins;
    } catch {}
  }

  return (
    <Book
      profile={profile}
      cv={cv}
      now={now}
      uses={uses}
      pins={pins}
      isAdmin={isAdmin}
    />
  );
}
