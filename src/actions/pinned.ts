"use server";

import { auth } from "@/auth";
import { type Pin } from "@/lib/content";

const OWNER = process.env.GITHUB_OWNER || "omsenjalia";
const REPO = `${OWNER}/portfolio-content`;
const PAT = process.env.GITHUB_PAT;

export async function savePins(pins: Pin[], sha: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const isOwner =
    session.user.email === process.env.ADMIN_EMAIL ||
    (session.user as any).login === "omsenjalia";
  if (!isOwner) throw new Error("Not authorized");

  const url = `https://api.github.com/repos/${REPO}/contents/pinned.json`;
  const body = JSON.stringify({
    message: "Update pinned tabs (via portfolio)",
    content: btoa(JSON.stringify({ pins }, null, 2)),
    sha,
  });

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${PAT}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio",
      "Content-Type": "application/json",
    },
    body,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub write failed: ${res.status} — ${err}`);
  }

  return { ok: true };
}
