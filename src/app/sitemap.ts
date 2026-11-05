import type { MetadataRoute } from "next";

/* A fixed date: `new Date()` is not allowed while prerendering with Cache Components. Bump it when the page changes. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://acceleratio.cloud", lastModified: "2026-11-06", changeFrequency: "weekly", priority: 1 }];
}
