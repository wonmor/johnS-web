import type { MetadataRoute } from "next";

const SITE_URL = "https://johnseong.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now },
    { url: `${SITE_URL}/privacy`, lastModified: now },
  ];
}
