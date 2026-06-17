import type { Metadata } from "next";
import { getNow } from "@/lib/content";
import Markdown from "@/components/misc/Markdown";

export const metadata: Metadata = {
  title: "Now",
};

export default async function Now() {
  const now = await getNow();

  return (
    <div className="max-w-prose mx-auto px-6 py-section">
      <Markdown content={now} />
    </div>
  );
}
