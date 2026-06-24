export const siteConfig = {
  name: "Out Front Entertainment",
  shortName: "Out Front",
  description:
    "Australia's premier marketplace connecting customers with talented entertainers. Find and book musicians, DJs, bands, comedians, and more for your next event.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://outfrontentertainment.com.au",
  ogImage: "/og-image.jpg",
  links: {
    facebook: "https://facebook.com/outfrontentertainment",
    instagram: "https://instagram.com/outfrontentertainment",
    twitter: "https://twitter.com/outfrontent",
  },
  contact: {
    email: "info@outfrontentertainment.com.au",
    phone: "",
  },
  // Brand colors - Deep red/maroon theme for theatrical feel
  colors: {
    primary: {
      DEFAULT: "#8B0000", // Dark Red
      light: "#B22222", // Firebrick
      dark: "#5C0000", // Darker red
    },
    secondary: {
      DEFAULT: "#FFD700", // Gold
      light: "#FFEC8B", // Light Gold
      dark: "#B8860B", // Dark Goldenrod
    },
    accent: {
      DEFAULT: "#C0C0C0", // Silver
      light: "#E8E8E8", // Light Silver
      dark: "#808080", // Gray
    },
    background: {
      DEFAULT: "#0A0A0A", // Near Black
      light: "#1A1A1A", // Dark Gray
      paper: "#242424", // Card background
    },
  },
  // Categories for entertainers
  categories: [
    { name: "Musicians", slug: "musicians" },
    { name: "DJs", slug: "djs" },
    { name: "Bands", slug: "bands" },
    { name: "Comedians", slug: "comedians" },
    { name: "Magicians", slug: "magicians" },
    { name: "Dancers", slug: "dancers" },
    { name: "MCs & Hosts", slug: "mcs-hosts" },
    { name: "Tribute Acts", slug: "tribute-acts" },
    { name: "Circus Acts", slug: "circus-acts" },
    { name: "Corporate Entertainment", slug: "corporate" },
  ],
  // Event types
  eventTypes: [
    "Wedding",
    "Corporate Event",
    "Birthday Party",
    "Private Party",
    "Festival",
    "Club/Venue",
    "Concert",
    "Charity Event",
    "School Event",
    "Other",
  ],
  // Australian locations
  locations: [
    "Sydney, NSW",
    "Melbourne, VIC",
    "Brisbane, QLD",
    "Perth, WA",
    "Adelaide, SA",
    "Gold Coast, QLD",
    "Newcastle, NSW",
    "Canberra, ACT",
    "Hobart, TAS",
    "Darwin, NT",
  ],
  // Platform commission percentage
  platformCommission: 10,
} as const;

export type SiteConfig = typeof siteConfig;
