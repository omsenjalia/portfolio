import Hero from "@/components/home/Hero";
import PinnedTabs from "@/components/home/PinnedTabs";
import { getPinned, type Pin } from "@/lib/content";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const isAdmin =
    !!session?.user &&
    (session.user.email === process.env.ADMIN_EMAIL ||
      (session.user as any).login === "omsenjalia");

  let pins: Pin[] = [];
  let sha = "";
  if (isAdmin) {
    try {
      const data = await getPinned();
      pins = data.pins;
      sha = data.sha;
    } catch {
      // pinned.json may not exist yet
    }
  }

  return (
    <>
      <Hero />
      {isAdmin && <PinnedTabs initialPins={pins} initialSha={sha} isAdmin={isAdmin} />}
    </>
  );
}
