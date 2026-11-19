import type { MetadataRoute } from "next";
import { allPublicRoutes } from "@/lib/routes";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await allPublicRoutes();
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    lastModified: r.updatedAt ?? new Date(),
    changeFrequency: r.path === "/" || r.path.startsWith("/blog") || r.path.startsWith("/careers") ? "weekly" : "monthly",
    priority: r.path === "/" ? 1 : r.path.startsWith("/services") ? 0.8 : 0.6,
  }));
}
