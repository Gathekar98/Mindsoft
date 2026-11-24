import type { MetadataRoute } from "next";
import { allPublicRoutes } from "@/lib/routes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPublicRoutes().map((r) => ({
    url: new URL(r.path, site.url).toString(),
    lastModified: r.updated ? new Date(r.updated) : new Date(),
    changeFrequency: r.path === "/" || r.path.startsWith("/blog") || r.path.startsWith("/careers") ? "weekly" : "monthly",
    priority: r.path === "/" ? 1 : r.path.startsWith("/services") ? 0.8 : 0.6,
  }));
}
