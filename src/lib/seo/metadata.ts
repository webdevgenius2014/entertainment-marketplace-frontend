import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://outfrontentertainment.com.au";
const SITE_NAME = "Out Front Entertainment";
const DEFAULT_DESCRIPTION = "Australia's premier marketplace connecting customers with talented entertainers. Find and book musicians, DJs, bands, comedians, and more for your next event.";

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  image = "/og-image.jpg",
  url = "/",
  type = "website",
  noIndex = false,
}: SEOConfig = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullUrl = `${SITE_URL}${url}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  const defaultKeywords = [
    "entertainment",
    "entertainers",
    "book entertainer",
    "hire musician",
    "wedding band",
    "corporate entertainment",
    "DJ hire",
    "live music",
    "event entertainment",
    "Australia",
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_AU",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };
}

// Structured data generators
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: DEFAULT_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressCountry: "AU",
    },
    sameAs: [
      // Add social media URLs here
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/entertainers?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateEntertainerSchema(entertainer: {
  name: string;
  description: string;
  image: string;
  slug: string;
  category: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/entertainers/${entertainer.slug}`,
    name: entertainer.name,
    description: entertainer.description,
    image: entertainer.image,
    url: `${SITE_URL}/entertainers/${entertainer.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: entertainer.location,
      addressCountry: "AU",
    },
    ...(entertainer.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: entertainer.rating,
        reviewCount: entertainer.reviewCount || 0,
      },
    }),
    ...(entertainer.priceRange && {
      priceRange: entertainer.priceRange,
    }),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  performer: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "AU",
      },
    },
    performer: {
      "@type": "PerformingGroup",
      name: event.performer,
    },
    ...(event.image && { image: event.image }),
  };
}
