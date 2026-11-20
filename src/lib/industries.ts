export interface Industry {
  slug: string;
  name: string;
  blurb: string;
  tags: string[];
  image: string;
  icon: string; // SVG path, 24x24
  service: string; // related service slug
}

/** Industries shown on the homepage and /industries (photos: Unsplash License). */
export const industries: Industry[] = [
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    blurb: "Online stores and retailers that want more orders from every visitor.",
    tags: ["Online store", "Inventory", "Payments"],
    image: "/images/ind-retail.jpg",
    icon: "M4 9l2-5h12l2 5M4 9h16v11H4zM9 20v-6h6v6",
    service: "ecommerce-development",
  },
  {
    slug: "healthcare",
    name: "Healthcare & Clinics",
    blurb: "Clinics and practices that need easy booking and patient-friendly websites.",
    tags: ["Appointments", "Patient portals", "Secure records"],
    image: "/images/ind-healthcare.jpg",
    icon: "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z",
    service: "custom-web-application-development",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    blurb: "Builders and agents who want listings that turn into site visits.",
    tags: ["Property listings", "Lead CRM", "Site visits"],
    image: "/images/ind-real-estate.jpg",
    icon: "M3 10l9-6 9 6M5 10v9h14v-9M9 19v-5h6v5",
    service: "crm-erp-solutions",
  },
  {
    slug: "education",
    name: "Education & Training",
    blurb: "Schools, colleges and coaching institutes moving admissions and learning online.",
    tags: ["Admissions", "Student portals", "Online tests"],
    image: "/images/ind-education.jpg",
    icon: "M3 8l9-4 9 4-9 4zM7 10v5c3 2 7 2 10 0v-5",
    service: "custom-software-development",
  },
  {
    slug: "finance",
    name: "Finance & Professional Services",
    blurb: "Firms that need trustworthy websites, client portals and reporting.",
    tags: ["Client portals", "Calculators", "Reports"],
    image: "/images/ind-finance.jpg",
    icon: "M3 20h18M6 20V10M10 20V6M14 20v-8M18 20V4",
    service: "corporate-website-development",
  },
  {
    slug: "logistics",
    name: "Logistics & Warehousing",
    blurb: "Operators that need real-time tracking and fewer manual updates.",
    tags: ["Tracking", "Warehouse tools", "Integrations"],
    image: "/images/ind-logistics.jpg",
    icon: "M3 17h2l2-6h8l2 6h4M7 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0",
    service: "api-development-integrations",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    blurb: "Manufacturers replacing spreadsheets with ERP, dealer portals and dashboards.",
    tags: ["ERP", "Dealer portals", "Dashboards"],
    image: "/images/ind-manufacturing.jpg",
    icon: "M3 20V10l6 4V10l6 4V6h6v14z",
    service: "crm-erp-solutions",
  },
  {
    slug: "startups",
    name: "Startups & SaaS",
    blurb: "Founders who need an MVP fast and a platform that can scale.",
    tags: ["MVPs", "SaaS platforms", "Dedicated devs"],
    image: "/images/ind-startups.jpg",
    icon: "M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.8 7.1 18.2 8 12.7 4 8.8l5.5-.8z",
    service: "full-stack-development",
  },
];

/** Bento layout spans for an 8-card grid on large screens (4 columns). */
export const industrySpans = [
  "lg:col-span-2",
  "",
  "",
  "",
  "",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];
