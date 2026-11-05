import { cacheLife } from "next/cache";

export const REPO = "https://github.com/acceleratio-cloud/core";

/** Star count for acceleratio-cloud/core, cached for an hour. Returns null if GitHub is unreachable. */
export async function getStars(): Promise<number | null> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch("https://api.github.com/repos/acceleratio-cloud/core", {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "acceleratio-landing",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
    });
    if (!res.ok) return null;
    const data: { stargazers_count?: number } = await res.json();
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

export function formatStars(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return `${k >= 10 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, "")}k`;
}
