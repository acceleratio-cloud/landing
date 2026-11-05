import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://acceleratio.cloud/sitemap.xml",
    host: "https://acceleratio.cloud",
  };
}
