/**
 * JSON-LD structured data component.
 *
 * Renders schema.org markup inline as a <script type="application/ld+json">
 * tag. Search engines parse it to understand the page's content type,
 * organization, services, etc.
 *
 * Use the helper builders below (organizationSchema, serviceSchema, etc.)
 * to keep the call sites tidy.
 */

import { site } from "@/lib/site";

interface JsonLdProps {
  data: object | object[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Top-level Organization schema. Suitable for the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressLocality: "Tampa",
      addressRegion: "FL",
      postalCode: "33607",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+1-${site.contact.phone}`,
      contactType: "Customer Service",
      email: site.contact.email,
      areaServed: "US",
      availableLanguage: ["English"],
    },
    sameAs: [site.social.instagram, site.social.vimeo].filter(Boolean),
    parentOrganization: undefined,
    subOrganization: {
      "@type": "Organization",
      name: "Nautical Network",
      url: "https://www.nautical.network",
      description:
        "The largest multi-platform editorial and social ecosystem in premium marine.",
    },
  };
}

/** WebSite schema with search action. Useful on the root layout. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
  };
}

/** Service schema for individual service detail pages. */
export function serviceSchema(params: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    url: params.url,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    areaServed: "United States",
  };
}

/**
 * FAQ schema. Pass question/answer pairs. Eligible for the FAQ rich
 * result in Google, and helps the page rank for long-tail buyer queries.
 */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/**
 * Breadcrumb schema. Pass ordered list of breadcrumbs from root down.
 * Search engines render these as the breadcrumb trail in result pages.
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
