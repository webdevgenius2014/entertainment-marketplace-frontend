"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateBreadcrumbSchema } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/structured-data";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

// Route label mapping for automatic breadcrumb generation
const routeLabels: Record<string, string> = {
  entertainers: "Entertainers",
  categories: "Categories",
  dashboard: "Dashboard",
  bookings: "Bookings",
  messages: "Messages",
  profile: "Profile",
  settings: "Settings",
  admin: "Admin",
  login: "Login",
  register: "Register",
  "forgot-password": "Forgot Password",
  search: "Search Results",
  checkout: "Checkout",
  confirmation: "Confirmation",
};

function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;

    // Check if it's a known route
    const label = routeLabels[segment] ||
      // Capitalize and format unknown segments
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  }

  return breadcrumbs;
}

export function Breadcrumbs({
  items,
  className,
  showHome = true,
}: BreadcrumbsProps) {
  const pathname = usePathname();

  // Use provided items or generate from pathname
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);

  // Don't show breadcrumbs on home page
  if (pathname === "/" || breadcrumbItems.length === 0) {
    return null;
  }

  // Prepare items for schema (including home)
  const schemaItems = [
    ...(showHome ? [{ name: "Home", url: "/" }] : []),
    ...breadcrumbItems.map((item) => ({
      name: item.label,
      url: item.href,
    })),
  ];

  return (
    <>
      {/* Structured data for SEO */}
      <JsonLd data={generateBreadcrumbSchema(schemaItems)} />

      {/* Visual breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={cn("flex items-center text-sm text-gray-500", className)}
      >
        <ol className="flex items-center flex-wrap gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
          {showHome && (
            <li
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                href="/"
                className="flex items-center hover:text-primary transition-colors"
                itemProp="item"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only" itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
              <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" aria-hidden="true" />
            </li>
          )}

          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const position = showHome ? index + 2 : index + 1;

            return (
              <li
                key={item.href}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {isLast ? (
                  <span
                    className="font-medium text-gray-900"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="hover:text-primary transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">{item.label}</span>
                    </Link>
                    <ChevronRight
                      className="h-4 w-4 mx-1 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </>
                )}
                <meta itemProp="position" content={String(position)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
