import type { Metadata } from "next";
import { getNow } from "@/lib/content";
import Markdown from "@/components/misc/Markdown";

export const metadata: Metadata = {
  title: "Now",
};

export default async function Now() {
  const now = await getNow();

  return (
    <div className="max-w-page mx-auto px-6 pt-12 pb-16">
      <div className="max-w-prose mx-auto">
        <div className="notebook-header-line mb-6"></div>
        <Markdown content={now} />
      </div>
    </div>
  );
}
