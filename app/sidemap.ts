import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://de18miljoenstebondscoach.nl",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}