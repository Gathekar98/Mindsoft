export type ServiceCategoryId = "web" | "engineering" | "systems" | "cloud";

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategoryId;
  short: string; // one line for cards and menus
  intro: string; // hero paragraph on the service page
  whoFor: string[];
  includes: string[];
  benefits: { title: string; text: string }[];
  process: { title: string; text: string }[];
  tech: string[];
  faqs: { q: string; a: string }[];
}

export const categories: Record<ServiceCategoryId, { name: string; blurb: string; image: string; icon: string; tags: string[] }> = {
  web: {
    name: "Design & Web Presence",
    blurb: "Websites, online stores and interface design that turn visitors into enquiries.",
    image: "/images/svc-web.jpg",
    icon: "M3 4h18v14H3zM8 21h8M12 18v3",
    tags: ["Websites", "E-commerce", "UI/UX"],
  },
  engineering: {
    name: "Product Engineering",
    blurb: "Custom web applications and software, from first version to full platform.",
    image: "/images/developers-coding.jpg",
    icon: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
    tags: ["React & Next.js", "Python", "Full-stack"],
  },
  systems: {
    name: "Systems, Data & AI",
    blurb: "Databases, integrations, CRM/ERP and automation that remove manual work.",
    image: "/images/svc-systems.jpg",
    icon: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
    tags: ["Databases", "APIs", "CRM/ERP", "AI"],
  },
  cloud: {
    name: "Cloud, Care & Growth",
    blurb: "Hosting, maintenance, speed and SEO that keep your product healthy and found.",
    image: "/images/svc-cloud.jpg",
    icon: "M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 8.5 4.5 4.5 0 0 1 17.5 18z",
    tags: ["Cloud", "Maintenance", "SEO"],
  },
};

const standardProcess = [
  { title: "Discover", text: "A short call to understand your goals, users, budget and timeline." },
  { title: "Plan & quote", text: "A written scope with milestones, technology choice and a clear quote." },
  { title: "Design & build", text: "Work in short cycles with regular demos so you can give feedback early." },
  { title: "Launch", text: "Testing, performance and SEO checks, then a careful go-live." },
  { title: "Support", text: "Optional care plan for updates, backups, monitoring and improvements." },
];

export const services: Service[] = [
  // ---------------- Design & Web Presence ----------------
  {
    slug: "business-website-development",
    name: "Business Website Development",
    category: "web",
    short: "Fast, professional websites that bring in enquiries.",
    intro:
      "Your website is often the first conversation a customer has with your business. We build clear, fast and mobile-friendly websites that explain what you do and make it easy for visitors to get in touch.",
    whoFor: [
      "Small and medium businesses that need a professional online presence",
      "Businesses whose current site is slow, outdated or hard to update",
      "Service providers who want more enquiries from search and referrals",
    ],
    includes: [
      "Page structure and content guidance",
      "Custom design matched to your brand",
      "Mobile-first, responsive build",
      "Contact and enquiry forms saved to a dashboard",
      "On-page SEO basics and Google Business integration",
      "Simple content editing for your team",
    ],
    benefits: [
      { title: "More enquiries", text: "Clear calls to action and forms placed where visitors need them." },
      { title: "Credibility", text: "A polished, consistent site that reflects the quality of your work." },
      { title: "Easy to manage", text: "Update text, images and pages without calling a developer." },
    ],
    process: standardProcess,
    tech: ["Next.js", "React", "Tailwind CSS", "Headless CMS", "Vercel / cloud hosting"],
    faqs: [
      { q: "How long does a business website take?", a: "Most business websites take a few weeks from approved content to launch. Your proposal includes a timeline based on the number of pages and features." },
      { q: "Can you write the content?", a: "We can structure the pages and help refine your copy. Full copywriting can be included in the quote if needed." },
      { q: "Will I be able to edit the site myself?", a: "Yes. We set up simple editing for the pages and sections you are likely to change." },
    ],
  },
  {
    slug: "corporate-website-development",
    name: "Corporate Website Development",
    category: "web",
    short: "Multi-page corporate sites with structure, governance and scale.",
    intro:
      "Corporate websites need to serve many audiences at once: customers, partners, investors and job seekers. We plan the information architecture, design system and publishing workflow so the site stays consistent as it grows.",
    whoFor: [
      "Established companies with multiple services, teams or locations",
      "Organisations that need several people to publish content safely",
      "Companies preparing for growth, funding or a rebrand",
    ],
    includes: [
      "Information architecture and sitemap",
      "Reusable design system and page templates",
      "Careers, news and resources sections",
      "Role-based content editing",
      "Accessibility and performance standards",
      "Analytics and conversion tracking",
    ],
    benefits: [
      { title: "Consistency", text: "A shared design system keeps every page on-brand." },
      { title: "Scalability", text: "Add sections, languages or teams without a rebuild." },
      { title: "Trust", text: "Clear structure helps every audience find what they need." },
    ],
    process: standardProcess,
    tech: ["Next.js", "TypeScript", "Headless CMS", "PostgreSQL", "Cloud hosting"],
    faqs: [
      { q: "Can you migrate content from our current website?", a: "Yes. We audit the existing content, plan redirects to protect search rankings and migrate what you want to keep." },
      { q: "Do you support multiple editors and approvals?", a: "Yes. We can set up roles so some people draft content and others approve it." },
    ],
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    category: "web",
    short: "Online stores with payments, inventory and order management.",
    intro:
      "We build online stores that are easy to browse and quick to buy from, with secure payments, inventory and order management your team can run day to day.",
    whoFor: [
      "Retailers and brands starting to sell online",
      "Businesses moving from marketplaces to their own store",
      "Stores that have outgrown their current platform",
    ],
    includes: [
      "Product catalogue, search and filters",
      "Cart, checkout and payment gateway integration",
      "Inventory, orders and customer management",
      "Shipping, tax and invoice setup",
      "Discounts, coupons and email notifications",
      "Sales and product analytics",
    ],
    benefits: [
      { title: "Smooth checkout", text: "Fewer steps and clear pricing reduce abandoned carts." },
      { title: "Own your channel", text: "Build direct customer relationships and margins." },
      { title: "Less admin", text: "Orders, stock and invoices handled in one place." },
    ],
    process: standardProcess,
    tech: ["Next.js", "Shopify / headless commerce", "Razorpay / Stripe", "PostgreSQL"],
    faqs: [
      { q: "Which payment gateways do you support?", a: "Common Indian and international gateways such as Razorpay and Stripe. We confirm the best option for your business during planning." },
      { q: "Should we use Shopify or a custom store?", a: "It depends on your catalogue, budget and workflows. We recommend the simplest option that meets your needs and explain the trade-offs." },
    ],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    category: "web",
    short: "Research-led interface design that people find easy to use.",
    intro:
      "Good design is how a product works, not just how it looks. We map user journeys, test ideas with clickable prototypes and hand over a design system developers can build from accurately.",
    whoFor: [
      "Startups shaping a new product",
      "Teams whose app is powerful but hard to use",
      "Businesses planning a redesign",
    ],
    includes: [
      "User journeys and wireframes",
      "Clickable prototypes",
      "Visual design and brand application",
      "Design system and component library",
      "Accessibility review",
      "Developer-ready handover",
    ],
    benefits: [
      { title: "Fewer surprises", text: "Test flows before development, when changes are cheap." },
      { title: "Happier users", text: "Clear interfaces reduce support requests and drop-offs." },
      { title: "Faster builds", text: "A design system speeds up development and keeps it consistent." },
    ],
    process: standardProcess,
    tech: ["Figma", "Design systems", "Prototyping", "Usability testing"],
    faqs: [
      { q: "Can you design only, without development?", a: "Yes. We can deliver designs and a design system for your own development team." },
    ],
  },

  // ---------------- Product Engineering ----------------
  {
    slug: "custom-web-application-development",
    name: "Custom Web Application Development",
    category: "engineering",
    short: "Web apps built around how your business actually works.",
    intro:
      "When off-the-shelf tools don't fit, a custom web application can. We build secure, scalable apps for internal operations, customer portals and SaaS products.",
    whoFor: [
      "Businesses running key processes on spreadsheets and email",
      "Founders building a SaaS product or MVP",
      "Teams that need a client or partner portal",
    ],
    includes: [
      "Requirements and user-role planning",
      "Secure authentication and permissions",
      "Dashboards, forms, reports and exports",
      "Integrations with your existing tools",
      "Automated tests and code reviews",
      "Deployment, monitoring and documentation",
    ],
    benefits: [
      { title: "Fits your process", text: "Software shaped around your workflow, not the other way round." },
      { title: "Saves time", text: "Automate repetitive steps and reduce errors." },
      { title: "Grows with you", text: "Architecture designed for new features and more users." },
    ],
    process: standardProcess,
    tech: ["React", "Next.js", "TypeScript", "Python", "PostgreSQL", "REST / GraphQL"],
    faqs: [
      { q: "Can you build an MVP first?", a: "Yes. We help you choose the smallest set of features that proves the idea, then plan the next releases." },
      { q: "Who owns the code?", a: "You do. Source code, designs and accounts are handed over once the project is paid for." },
    ],
  },
  {
    slug: "react-nextjs-development",
    name: "React.js & Next.js Development",
    category: "engineering",
    short: "Modern, fast frontends and full websites in React and Next.js.",
    intro:
      "React and Next.js power fast, search-friendly websites and rich web applications. We build clean, typed, well-tested frontends that are a pleasure to maintain.",
    whoFor: [
      "Companies modernising an older frontend",
      "Products that need fast, SEO-friendly pages",
      "Teams that need extra React capacity",
    ],
    includes: [
      "Next.js App Router architecture",
      "Server-side rendering and static generation",
      "Component libraries with TypeScript",
      "State management and data fetching",
      "Performance and Core Web Vitals tuning",
      "Accessibility and testing",
    ],
    benefits: [
      { title: "Speed", text: "Fast loading pages improve experience and search rankings." },
      { title: "Maintainability", text: "Typed, modular code your team can extend." },
      { title: "Flexibility", text: "Works with any backend, CMS or API." },
    ],
    process: standardProcess,
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Testing Library", "Vercel"],
    faqs: [
      { q: "Can you work with our existing React codebase?", a: "Yes. We start with a code review, then agree on improvements and new features." },
    ],
  },
  {
    slug: "python-backend-development",
    name: "Python Backend Development",
    category: "engineering",
    short: "Reliable APIs and backends with Django and FastAPI.",
    intro:
      "Python is excellent for business logic, data processing and AI-related work. We build secure, documented backends and APIs with Django and FastAPI.",
    whoFor: [
      "Products that need a robust API",
      "Teams working with data pipelines or reporting",
      "Businesses adding AI or automation features",
    ],
    includes: [
      "API design and documentation",
      "Django or FastAPI services",
      "Background jobs and scheduled tasks",
      "Database modelling and migrations",
      "Authentication and permissions",
      "Testing, logging and monitoring",
    ],
    benefits: [
      { title: "Dependable", text: "Well-tested services that behave predictably." },
      { title: "Data-ready", text: "Python's ecosystem makes reporting and AI integration easier." },
      { title: "Documented", text: "Clear API docs for your team and partners." },
    ],
    process: standardProcess,
    tech: ["Python", "Django", "FastAPI", "PostgreSQL", "Celery / queues", "Docker"],
    faqs: [
      { q: "Django or FastAPI?", a: "Django suits full applications with an admin panel; FastAPI suits lightweight, high-performance APIs. We recommend based on your project." },
    ],
  },
  {
    slug: "full-stack-development",
    name: "Full-Stack Development",
    category: "engineering",
    short: "One team for frontend, backend, database and deployment.",
    intro:
      "Full-stack development means one team owns the whole product, from the screens your users see to the database and servers behind them. Fewer handovers, clearer responsibility.",
    whoFor: [
      "Founders who want one partner for the whole build",
      "Businesses without an in-house technical team",
      "Projects with tight timelines",
    ],
    includes: [
      "Frontend in React / Next.js",
      "Backend in Node.js or Python",
      "Database design and integration",
      "Cloud deployment and CI/CD",
      "Security and performance reviews",
      "Ongoing support",
    ],
    benefits: [
      { title: "Single point of contact", text: "One team accountable for the whole product." },
      { title: "Faster delivery", text: "No waiting between separate frontend and backend vendors." },
      { title: "Consistent quality", text: "Shared standards across every layer." },
    ],
    process: standardProcess,
    tech: ["React", "Next.js", "Node.js", "Python", "PostgreSQL", "Cloud"],
    faqs: [
      { q: "Do you handle hosting too?", a: "Yes. We can set up and manage hosting, or deploy to your own cloud account." },
    ],
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    category: "engineering",
    short: "Tailored software for workflows off-the-shelf tools can't handle.",
    intro:
      "Every business has processes that make it different. We design and build custom software around them: booking systems, internal tools, portals, calculators and more.",
    whoFor: [
      "Businesses with unique workflows",
      "Teams paying for several tools that don't talk to each other",
      "Companies with ideas for new digital services",
    ],
    includes: [
      "Process mapping and requirements",
      "Prototype and user testing",
      "Development in iterations",
      "Data migration from existing tools",
      "Training and documentation",
      "Maintenance plan",
    ],
    benefits: [
      { title: "Competitive edge", text: "Software that supports what makes your business different." },
      { title: "Lower tool costs", text: "Replace overlapping subscriptions with one fitting system." },
      { title: "Control", text: "Own your data and roadmap." },
    ],
    process: standardProcess,
    tech: ["React", "Next.js", "Python", "PostgreSQL", "REST APIs", "Cloud"],
    faqs: [
      { q: "How do you estimate custom software?", a: "We break the work into features and milestones after a discovery session, then provide a written estimate you can review before committing." },
    ],
  },

  // ---------------- Systems, Data & AI ----------------
  {
    slug: "database-development-integration",
    name: "Database Development & Integration",
    category: "systems",
    short: "Well-designed databases, migrations and reporting.",
    intro:
      "Data is only useful if it is accurate, secure and easy to query. We design databases, clean up and migrate existing data and connect systems so information flows where it is needed.",
    whoFor: [
      "Businesses with data spread across spreadsheets and tools",
      "Applications with slow or unreliable databases",
      "Teams that need reporting and dashboards",
    ],
    includes: [
      "Database design and normalisation",
      "Data migration and cleaning",
      "Performance tuning and indexing",
      "Backups and recovery planning",
      "Reporting views and exports",
      "Access control",
    ],
    benefits: [
      { title: "One source of truth", text: "Everyone works from the same accurate data." },
      { title: "Faster apps", text: "Tuned queries and indexes speed up your software." },
      { title: "Safer data", text: "Backups and permissions protect what matters." },
    ],
    process: standardProcess,
    tech: ["PostgreSQL", "MySQL", "Prisma", "SQL", "Redis"],
    faqs: [
      { q: "Can you move our data from Excel into a proper system?", a: "Yes. We clean, structure and import it, then give your team a simple way to work with it." },
    ],
  },
  {
    slug: "api-development-integrations",
    name: "API Development & Integrations",
    category: "systems",
    short: "Connect your website, apps and business tools.",
    intro:
      "APIs let your systems talk to each other. We build secure APIs and integrate payment gateways, CRMs, accounting tools, messaging platforms and third-party services.",
    whoFor: [
      "Businesses re-entering the same data in several tools",
      "Products that need partner or mobile app access",
      "Teams adding payments, SMS, email or WhatsApp",
    ],
    includes: [
      "REST and webhook design",
      "Third-party API integrations",
      "Authentication and rate limiting",
      "Error handling and retries",
      "API documentation",
      "Monitoring and alerts",
    ],
    benefits: [
      { title: "Less manual work", text: "Data moves automatically between your tools." },
      { title: "New channels", text: "Open your product to apps and partners safely." },
      { title: "Reliability", text: "Integrations built to handle failures gracefully." },
    ],
    process: standardProcess,
    tech: ["REST", "Webhooks", "OAuth", "Node.js", "Python"],
    faqs: [
      { q: "Can you integrate with tools we already use?", a: "Usually, yes, as long as the tool offers an API. We check this during discovery." },
    ],
  },
  {
    slug: "crm-erp-solutions",
    name: "CRM / ERP Solutions",
    category: "systems",
    short: "Custom or configured CRM and ERP systems that fit your team.",
    intro:
      "We help businesses manage customers, sales, inventory and operations in one place, either by building a focused custom system or by configuring and integrating a proven platform.",
    whoFor: [
      "Sales teams tracking leads in spreadsheets",
      "Growing businesses needing inventory and order control",
      "Companies with disconnected departmental tools",
    ],
    includes: [
      "Process mapping across teams",
      "Custom modules or platform configuration",
      "Data migration",
      "Role-based dashboards and reports",
      "Integrations with accounting, email and messaging",
      "Training and support",
    ],
    benefits: [
      { title: "Visibility", text: "See pipeline, orders and stock at a glance." },
      { title: "Accountability", text: "Clear ownership of every lead and task." },
      { title: "Efficiency", text: "Automate follow-ups and repetitive admin." },
    ],
    process: standardProcess,
    tech: ["Custom (React + Python)", "Odoo / open-source ERP", "PostgreSQL", "Integrations"],
    faqs: [
      { q: "Should we build a custom CRM or use an existing one?", a: "If an existing platform fits 80% of your needs, configuring it is usually faster and cheaper. We recommend custom only when it clearly pays off." },
    ],
  },
  {
    slug: "automation-ai-integrations",
    name: "Automation & AI Integrations",
    category: "systems",
    short: "Practical automation and AI features that save hours every week.",
    intro:
      "We automate repetitive tasks and add practical AI features, such as document extraction, smart search, chat assistants and report generation, with clear human oversight.",
    whoFor: [
      "Teams spending hours on copy-paste work",
      "Businesses exploring AI with a clear use case",
      "Support teams answering the same questions",
    ],
    includes: [
      "Process review to find automation opportunities",
      "Workflow automation and scheduled jobs",
      "AI assistants grounded in your own content",
      "Document and data extraction",
      "Human review steps and audit logs",
      "Cost and quality monitoring",
    ],
    benefits: [
      { title: "Time back", text: "Free your team from repetitive tasks." },
      { title: "Faster responses", text: "Help customers and staff find answers quickly." },
      { title: "Controlled", text: "Clear limits, logging and human checks." },
    ],
    process: standardProcess,
    tech: ["Python", "LLM APIs", "Vector search", "Workflow automation", "Webhooks"],
    faqs: [
      { q: "Is our data safe with AI tools?", a: "We choose providers and settings that match your data requirements and avoid sending sensitive information where it isn't needed." },
    ],
  },

  // ---------------- Cloud, Care & Growth ----------------
  {
    slug: "cloud-hosting-deployment",
    name: "Cloud, Hosting & Deployment",
    category: "cloud",
    short: "Secure, reliable hosting and automated deployments.",
    intro:
      "We set up hosting that matches your traffic and budget, with automated deployments, backups, SSL and monitoring, so releases are safe and downtime is rare.",
    whoFor: [
      "New products going live",
      "Sites on slow or unreliable shared hosting",
      "Teams deploying manually",
    ],
    includes: [
      "Hosting selection and setup",
      "CI/CD pipelines",
      "SSL, domains and email DNS",
      "Backups and disaster recovery",
      "Monitoring and alerts",
      "Cost optimisation",
    ],
    benefits: [
      { title: "Uptime", text: "Monitoring and backups reduce risk." },
      { title: "Safe releases", text: "Automated deployments with easy rollbacks." },
      { title: "Right-sized costs", text: "Pay for what you actually use." },
    ],
    process: standardProcess,
    tech: ["AWS", "Vercel", "DigitalOcean", "Docker", "GitHub Actions", "Cloudflare"],
    faqs: [
      { q: "Can you move our site to a new host?", a: "Yes. We plan the move to avoid downtime and keep email and DNS working." },
    ],
  },
  {
    slug: "website-maintenance-support",
    name: "Website Maintenance & Support",
    category: "cloud",
    short: "Monthly care plans: updates, backups, fixes and improvements.",
    intro:
      "Websites and apps need regular care to stay secure and useful. Our monthly plans cover updates, backups, monitoring, fixes and a set amount of improvement work.",
    whoFor: [
      "Businesses without an in-house developer",
      "Sites built by a previous agency that is no longer available",
      "Products that need ongoing small changes",
    ],
    includes: [
      "Software and security updates",
      "Daily backups and uptime monitoring",
      "Bug fixes",
      "Monthly hours for content and feature changes",
      "Performance and SEO health checks",
      "Monthly report",
    ],
    benefits: [
      { title: "Peace of mind", text: "Someone is watching your site every day." },
      { title: "Predictable cost", text: "A fixed monthly fee instead of surprise bills." },
      { title: "Continuous improvement", text: "Small upgrades every month add up." },
    ],
    process: [
      { title: "Audit", text: "We review your current site, hosting and code." },
      { title: "Stabilise", text: "Fix urgent issues and set up backups and monitoring." },
      { title: "Maintain", text: "Ongoing updates, checks and requested changes." },
      { title: "Report", text: "A monthly summary of what was done and what's next." },
    ],
    tech: ["Monitoring", "Backups", "Security scanning", "Analytics"],
    faqs: [
      { q: "Can you maintain a site you didn't build?", a: "Yes. We start with an audit so we understand the code and hosting before taking over." },
      { q: "What happens to unused hours?", a: "Unused hours carry over to the next month only, then expire. Your monthly report shows hours used and any hours carried forward." },
    ],
  },
  {
    slug: "seo-performance-optimization",
    name: "SEO & Website Performance Optimization",
    category: "cloud",
    short: "Faster pages and stronger search visibility.",
    intro:
      "Speed and search visibility go together. We fix technical SEO issues, improve Core Web Vitals and structure content so search engines and visitors understand your pages.",
    whoFor: [
      "Sites that load slowly on mobile",
      "Businesses not appearing for important searches",
      "Sites that lost traffic after a redesign",
    ],
    includes: [
      "Technical SEO audit",
      "Core Web Vitals improvements",
      "Metadata and structured data",
      "Image and font optimisation",
      "Internal linking and content structure",
      "Search Console and analytics setup",
    ],
    benefits: [
      { title: "Better experience", text: "Faster pages keep visitors engaged." },
      { title: "More visibility", text: "Technical fixes help search engines index your site correctly." },
      { title: "Measurable", text: "Before-and-after reports so you can see the difference." },
    ],
    process: standardProcess,
    tech: ["Lighthouse", "Search Console", "Schema.org", "Next.js", "CDN"],
    faqs: [
      { q: "Can you guarantee first-page rankings?", a: "No honest provider can. We focus on the technical and content factors within our control and report clearly on progress." },
    ],
  },
];

/** Short labels for tags and chips. */
const shortLabels: Record<string, string> = {
  "business-website-development": "Business Websites",
  "corporate-website-development": "Corporate Websites",
  "ecommerce-development": "E-commerce",
  "ui-ux-design": "UI/UX Design",
  "custom-web-application-development": "Web Apps",
  "react-nextjs-development": "React & Next.js",
  "python-backend-development": "Python Backend",
  "full-stack-development": "Full-stack",
  "custom-software-development": "Custom Software",
  "database-development-integration": "Databases",
  "api-development-integrations": "APIs",
  "crm-erp-solutions": "CRM / ERP",
  "automation-ai-integrations": "Automation & AI",
  "cloud-hosting-deployment": "Cloud & Hosting",
  "website-maintenance-support": "Maintenance",
  "seo-performance-optimization": "SEO & Speed",
};

export function serviceLabel(slug: string) {
  return shortLabels[slug] ?? getService(slug)?.name ?? slug;
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function servicesByCategory(id: ServiceCategoryId) {
  return services.filter((s) => s.category === id);
}

export const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }));
