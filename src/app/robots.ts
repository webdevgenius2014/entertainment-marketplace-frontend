import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://outfrontentertainment.com.au";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/dashboard/",
          "/api/",
          "/auth/",
          "/checkout/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/dashboard/", "/api/", "/auth/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
