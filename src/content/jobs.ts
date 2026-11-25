/**
 * Job openings and internships.
 *
 * HOW TO MANAGE ROLES (no database needed):
 *   - Show / hide a role:  status "open" (visible, accepting applications),
 *                          "closed" (visible, no applications) or "draft" (hidden).
 *   - Add a role: add one line to `roleList` below, e.g.
 *       role("Go Developer", "Backend", "node", "ic"),
 *     then optionally pass overrides (experience, skills, summary, extra duties…).
 *   - Role descriptions come from src/content/job-profiles.ts (by technology)
 *     plus the seniority level, so similar roles stay consistent.
 * Save, commit and push to GitHub — Netlify updates the site automatically.
 */
import { levels, profiles, type LevelKey, type ProfileKey } from "./job-profiles";

export type JobStatus = "draft" | "open" | "closed";
export type JobKind = "job" | "internship";

export const teams = [
  "Frontend",
  "Backend",
  "Full-stack",
  "CMS & E-commerce",
  "Mobile",
  "Data & AI",
  "Cloud & DevOps",
  "QA & Testing",
  "Design",
  "Architecture",
  "Project & Product",
  "Sales & Marketing",
  "Operations",
  "Internships",
] as const;
export type Team = (typeof teams)[number];

export interface Job {
  slug: string;
  title: string;
  team: Team;
  kind: JobKind;
  status: JobStatus;
  level: LevelKey;
  experience: string;
  employmentType: string;
  workMode: string;
  location: string;
  openings: number;
  postedOn: string; // YYYY-MM-DD
  closesOn?: string; // YYYY-MM-DD — applications stop after this date
  hiringNow?: boolean; // shows a "Hiring now" badge
  summary: string;
  about: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

interface Overrides {
  slug?: string;
  status?: JobStatus;
  experience?: string;
  employmentType?: string;
  openings?: number;
  postedOn?: string;
  closesOn?: string;
  hiringNow?: boolean;
  summary?: string;
  skills?: string[];
  extraDo?: string[];
  extraNeed?: string[];
  /** Replace the profile's duties / requirements / nice-to-haves (used for internships). */
  do?: string[];
  need?: string[];
  nice?: string[];
}

const DEFAULT_POSTED = "2026-11-24";

const defaultExperience: Record<LevelKey, string> = {
  intern: "Students & freshers",
  fresher: "0–1 year",
  ic: "2–5 years",
  lead: "5–8 years",
  architect: "8+ years",
  manager: "10+ years",
  specialist: "3–5 years",
};

const levelIntro: Record<LevelKey, string> = {
  intern: "As an intern you'll learn by doing, with a mentor reviewing your work and helping you grow.",
  fresher: "This is an entry-level role with training and close guidance from experienced colleagues.",
  ic: "You'll work in a small, senior-friendly team where your work ships to real users.",
  lead: "As a lead you'll guide a small team, own technical decisions and be a trusted point of contact for clients.",
  architect: "As an architect you'll set technical direction across projects and help teams build systems that last.",
  manager: "You'll lead a team, set quality standards and help shape how Mindsoft delivers.",
  specialist: "You'll work closely with leadership and teams across the company.",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\.js/g, "js")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function role(title: string, team: Team, profileKey: ProfileKey, level: LevelKey, o: Overrides = {}): Job {
  const p = profiles[profileKey];
  const l = levels[level];
  const internship = level === "intern";
  const experience = o.experience ?? defaultExperience[level];
  return {
    slug: o.slug ?? slugify(title),
    title,
    team: internship ? "Internships" : team,
    kind: internship ? "internship" : "job",
    status: o.status ?? "open",
    level,
    experience,
    employmentType: o.employmentType ?? (internship ? "Internship · 3–6 months" : "Full-time"),
    workMode: "Remote",
    location: "Anywhere in India",
    openings: o.openings ?? 1,
    postedOn: o.postedOn ?? DEFAULT_POSTED,
    closesOn: o.closesOn,
    hiringNow: o.hiringNow,
    summary: o.summary ?? p.about,
    about: `${o.summary ?? p.about} ${levelIntro[level]}`,
    skills: o.skills ?? p.skills,
    responsibilities: [...(o.do ?? p.do), ...(o.extraDo ?? []), ...l.do],
    requirements: [
      ...(internship || level === "fresher" ? [] : [`${experience} of relevant professional experience`]),
      ...(o.need ?? p.need),
      ...(o.extraNeed ?? []),
      ...l.need,
    ],
    niceToHave: o.nice ?? p.nice,
  };
}

// ---------------------------------------------------------------------------
// Roles. Order = order on the careers page (within each team filter).
// ---------------------------------------------------------------------------
const roleList: Job[] = [
  // Frontend
  role("React.js Developer", "Frontend", "react", "ic", { hiringNow: true, openings: 2, slug: "react-js-developer" }),
  role("Angular Developer", "Frontend", "angular", "ic"),
  role("Vue.js Developer", "Frontend", "vue", "ic"),
  role("Frontend Developer (React / Angular / Vue)", "Frontend", "frontend", "ic", { slug: "frontend-developer" }),
  role("Tech Lead – Frontend (React / Angular / Vue)", "Frontend", "frontend", "lead", { slug: "tech-lead-frontend" }),

  // Backend
  role("Python / Django Developer", "Backend", "python", "ic", { hiringNow: true, slug: "python-django-developer" }),
  role("Java / Backend Developer", "Backend", "java", "ic", { slug: "java-backend-developer" }),
  role("Node.js Developer", "Backend", "node", "ic"),
  role("ASP.NET Core Developer", "Backend", "dotnetCore", "ic", { slug: "aspnet-core-developer" }),
  role("Tech Lead – Python", "Backend", "python", "lead"),
  role("Tech Lead – Java", "Backend", "java", "lead"),
  role("Tech Lead – Node.js / MongoDB", "Backend", "node", "lead", { slug: "tech-lead-nodejs" }),
  role("Tech Lead – Microsoft Technologies", "Backend", "dotnetCore", "lead", { slug: "tech-lead-microsoft" }),

  // Full-stack
  role("Java / Full-Stack Developer", "Full-stack", "javaFullstack", "ic", { slug: "java-full-stack-developer" }),
  role("MERN Stack Developer", "Full-stack", "mern", "ic", { hiringNow: true }),
  role("MEAN Stack Developer", "Full-stack", "mean", "ic"),
  role("PHP / Laravel Full-Stack Developer", "Full-stack", "php", "ic", { slug: "php-laravel-developer" }),
  role("Ruby on Rails / Full-Stack Developer", "Full-stack", "ror", "ic", { slug: "ruby-on-rails-developer" }),
  role("ASP.NET MVC / Full-Stack Developer", "Full-stack", "dotnetMvc", "ic", { slug: "aspnet-mvc-developer" }),
  role("ASP.NET Web Forms / Full-Stack Developer", "Full-stack", "dotnetWebforms", "ic", { slug: "aspnet-webforms-developer" }),
  role("Tech Lead – PHP", "Full-stack", "php", "lead"),
  role("Tech Lead – Ruby on Rails", "Full-stack", "ror", "lead", { slug: "tech-lead-ruby-on-rails" }),

  // CMS & E-commerce
  role("WordPress Developer", "CMS & E-commerce", "wordpress", "ic"),
  role("Magento Developer", "CMS & E-commerce", "magento", "ic"),
  role("Drupal Developer", "CMS & E-commerce", "drupal", "ic"),
  role("SharePoint / Office 365 Developer", "CMS & E-commerce", "sharepoint", "ic", { slug: "sharepoint-developer" }),
  role("Team Lead – SharePoint / Office 365", "CMS & E-commerce", "sharepoint", "lead", { slug: "team-lead-sharepoint" }),

  // Mobile
  role("Flutter Developer", "Mobile", "flutter", "ic", { hiringNow: true }),
  role("React Native Developer", "Mobile", "reactNative", "ic"),
  role("Android Developer", "Mobile", "android", "ic"),
  role("iOS Developer", "Mobile", "ios", "ic"),
  role("Tech Lead – Flutter", "Mobile", "flutter", "lead"),
  role("Tech Lead – Android", "Mobile", "android", "lead"),
  role("Tech Lead – iOS", "Mobile", "ios", "lead"),
  role("Tech Lead – JavaScript Mobile", "Mobile", "reactNative", "lead", { slug: "tech-lead-react-native" }),

  // Data & AI
  role("AI / ML Developer", "Data & AI", "aiml", "ic", { hiringNow: true, slug: "ai-ml-developer" }),
  role("Data Engineer / ETL Developer", "Data & AI", "data", "ic", { slug: "data-engineer" }),
  role("IoT Developer", "Data & AI", "iot", "ic"),
  role("Blockchain Developer", "Data & AI", "blockchain", "ic"),
  role("Tech Lead – Data Science", "Data & AI", "data", "lead", { skills: ["Python", "SQL", "Machine learning", "Spark", "Cloud data platforms"] }),
  role("Tech Lead – Blockchain", "Data & AI", "blockchain", "lead"),

  // Cloud & DevOps
  role("DevOps Engineer", "Cloud & DevOps", "devops", "ic"),
  role("Cloud Engineer (AWS / Azure / GCP)", "Cloud & DevOps", "cloud", "ic", { slug: "cloud-engineer", experience: "4–6 years" }),
  role("RPA Developer", "Cloud & DevOps", "rpa", "ic"),
  role("Tech Lead – DevOps / Cloud", "Cloud & DevOps", "devops", "lead", { slug: "tech-lead-devops" }),
  role("Tech Lead – RPA", "Cloud & DevOps", "rpa", "lead"),

  // QA & Testing
  role("Automation Test Engineer", "QA & Testing", "qaAutomation", "ic"),
  role("Manual Test Engineer", "QA & Testing", "qaManual", "ic", { experience: "1–4 years" }),
  role("Performance Test Engineer", "QA & Testing", "qaPerformance", "ic"),
  role("Security Test Engineer", "QA & Testing", "qaSecurity", "ic"),
  role("QC Lead – Automation", "QA & Testing", "qaAutomation", "lead"),
  role("QC Lead – Manual", "QA & Testing", "qaManual", "lead"),
  role("QC Lead – Performance", "QA & Testing", "qaPerformance", "lead"),
  role("QC Manager", "QA & Testing", "qaAutomation", "manager", { experience: "10–12 years" }),

  // Design
  role("UI / Graphic Designer (Web & Mobile)", "Design", "ui", "ic", { slug: "ui-graphic-designer" }),
  role("UX Designer", "Design", "ux", "ic"),
  role("Frontend Designer (HTML / CSS / JS)", "Design", "frontendDesigner", "ic", { slug: "frontend-designer" }),
  role("Lead – UI / Graphic Designer", "Design", "ui", "lead", { slug: "lead-ui-graphic-designer" }),
  role("Lead – UX Designer", "Design", "ux", "lead", { slug: "lead-ux-designer" }),
  role("Lead – Frontend Designer", "Design", "frontendDesigner", "lead", { slug: "lead-frontend-designer" }),
  role("UX Architect", "Design", "ux", "architect", { experience: "7–10 years" }),
  role("Creative Head", "Design", "ui", "manager", { experience: "10–12 years", extraDo: ["Own the creative direction and brand quality across projects"] }),

  // Architecture
  role("Solution Architect (Java / .NET / Node.js / Cloud)", "Architecture", "architectGeneric", "architect", { slug: "solution-architect" }),
  role("Enterprise Architect", "Architecture", "architectGeneric", "architect", { experience: "10+ years", extraDo: ["Align technology roadmaps with business strategy across systems"] }),
  role("Cloud Solution Architect", "Architecture", "cloud", "architect"),
  role("Mobile Architect", "Architecture", "mobileArchitect", "architect"),
  role("Technical Architect – Java", "Architecture", "java", "architect"),
  role("Technical Architect – Node.js / MongoDB", "Architecture", "node", "architect", { slug: "technical-architect-nodejs" }),
  role("Technical Architect – Frontend (React / Angular / Vue)", "Architecture", "frontend", "architect", { slug: "technical-architect-frontend" }),
  role("Technical Architect – Microsoft Technologies", "Architecture", "dotnetCore", "architect", { slug: "technical-architect-microsoft" }),
  role("Technical Architect – PHP", "Architecture", "php", "architect"),
  role("Technical Architect – Python", "Architecture", "python", "architect"),

  // Project & Product
  role("Project Manager / Scrum Master", "Project & Product", "pm", "manager", { slug: "project-manager-scrum-master", experience: "5–10 years" }),
  role("Product Owner", "Project & Product", "productOwner", "specialist", { experience: "5–10 years" }),
  role("Key Account Manager", "Project & Product", "kam", "specialist", { experience: "4–5 years" }),

  // Sales & Marketing
  role("Business Development Manager (International)", "Sales & Marketing", "bizdev", "specialist", { slug: "business-development-international", experience: "4–5 years" }),
  role("Business Development Associate", "Sales & Marketing", "bizdev", "fresher"),
  role("Lead Generation Executive", "Sales & Marketing", "leadgen", "specialist", { experience: "3–4 years" }),
  role("Marketing Communications Executive", "Sales & Marketing", "marcom", "specialist", { slug: "marketing-communications", experience: "4–5 years" }),
  role("Content Writer", "Sales & Marketing", "content", "specialist", { experience: "3–4 years" }),

  // Operations
  role("HR Payroll Executive", "Operations", "payroll", "specialist", { experience: "3–4 years" }),
  role("Pricing Analyst (FP&A)", "Operations", "pricing", "specialist", { slug: "pricing-analyst", experience: "3–4 years" }),

  // Internships
  role("React.js Developer Intern", "Internships", "react", "intern", { slug: "react-js-developer-intern" }),
  role("Python Developer Intern", "Internships", "python", "intern", { slug: "python-developer-intern" }),
  role("Full Stack Web Development Intern", "Internships", "mern", "intern", {
    employmentType: "Internship · 1–3 months",
    summary: "Build complete web features, from a React interface to a Node.js API and database, on real client work.",
    skills: ["HTML & CSS", "JavaScript", "React", "Node.js", "MongoDB / SQL"],
    do: [
      "Build responsive pages and reusable React components",
      "Create REST APIs with Node.js and Express",
      "Connect front-ends to databases and third-party APIs",
      "Deploy features and fix bugs found in testing",
    ],
    need: ["Basic HTML, CSS and JavaScript", "Some exposure to React or another front-end framework", "Understanding of how the web works (HTTP, APIs)"],
    nice: ["A deployed personal project", "Familiarity with Git and GitHub"],
  }),
  role("Data Science & Machine Learning Intern", "Internships", "aiml", "intern", {
    employmentType: "Internship · 1–3 months",
    summary: "Turn real business data into insights and simple machine-learning models, with a mentor guiding each step.",
    skills: ["Python", "Pandas", "SQL", "scikit-learn", "Data visualisation"],
    do: [
      "Clean, explore and visualise datasets",
      "Build and evaluate basic ML models with scikit-learn",
      "Write SQL queries for reports and analysis",
      "Present findings in short, clear summaries",
    ],
    need: ["Python fundamentals", "Basic statistics (mean, distribution, correlation)", "Comfort working with spreadsheets or tables of data"],
    nice: ["A Kaggle or academic data project", "Exposure to Jupyter notebooks"],
  }),
  role("Java Backend & API Development Intern", "Internships", "java", "intern", {
    employmentType: "Internship · 2–3 months",
    summary: "Learn to build reliable backend services with Java and Spring Boot, from API design to database.",
    skills: ["Core Java", "Spring Boot", "REST APIs", "SQL", "Git"],
    do: [
      "Build REST endpoints with Spring Boot",
      "Design simple database schemas and queries",
      "Add validation, logging and error handling",
      "Write unit tests for the code you ship",
    ],
    need: ["Core Java and object-oriented programming", "Basic SQL", "Willingness to learn Spring Boot"],
    nice: ["A Java project on GitHub", "Familiarity with Postman or similar tools"],
  }),
  role("Mobile App Development Intern", "Internships", "reactNative", "intern", {
    employmentType: "Internship · 2–3 months",
    summary: "Help build cross-platform mobile apps with React Native, from first screen to a working release build.",
    skills: ["React Native", "JavaScript", "Expo", "REST APIs", "Git"],
    do: [
      "Build app screens and navigation with React Native",
      "Connect screens to APIs and handle loading and errors",
      "Test on Android and iOS devices or emulators",
      "Fix UI and performance issues found in reviews",
    ],
    need: ["JavaScript fundamentals", "Basic React knowledge", "An Android phone or emulator for testing"],
    nice: ["A small app you've built, even a practice one", "Interest in mobile UI design"],
  }),
  role("UI/UX Design Intern", "Internships", "ux", "intern", {
    employmentType: "Internship · 1–2 months",
    summary: "Design clear, usable screens for websites and apps, from research and wireframes to polished Figma prototypes.",
    skills: ["Figma", "Wireframing", "Prototyping", "User research", "Design systems"],
    do: [
      "Create wireframes and user flows for new features",
      "Design polished screens in Figma using our design system",
      "Build clickable prototypes for reviews",
      "Help run quick usability tests and note findings",
    ],
    need: ["Working knowledge of Figma", "A portfolio with at least 2–3 design pieces", "An eye for layout, spacing and typography"],
    nice: ["Understanding of accessibility basics", "Interest in how designs are built in code"],
  }),
  role("Cloud Computing & AWS Intern", "Internships", "cloud", "intern", {
    employmentType: "Internship · 2–3 months",
    summary: "Learn how real applications are hosted on AWS, from compute and storage to access control and monitoring.",
    skills: ["AWS", "Linux", "Networking basics", "IAM", "Monitoring"],
    do: [
      "Set up compute, storage and databases on AWS",
      "Deploy sample and client applications to the cloud",
      "Configure users, roles and basic security",
      "Watch costs, logs and alerts with your mentor",
    ],
    need: ["Basic Linux command line", "Understanding of networking basics (IP, DNS, HTTP)", "Curiosity about how websites run in production"],
    nice: ["An AWS free-tier project", "Progress towards an AWS Cloud Practitioner certificate"],
  }),
  role("DevOps & Cloud Engineering Intern", "Internships", "devops", "intern", {
    employmentType: "Internship · 2–3 months",
    summary: "Automate how software is built, tested and shipped, using Git, Docker and CI/CD pipelines.",
    skills: ["Linux", "Git", "Docker", "CI/CD", "Shell scripting"],
    do: [
      "Write Dockerfiles for web applications",
      "Build and improve CI/CD pipelines",
      "Automate routine tasks with shell scripts",
      "Help monitor deployments and respond to issues",
    ],
    need: ["Comfort with the Linux command line", "Basic Git usage", "Interest in automation and infrastructure"],
    nice: ["A project using Docker", "Exposure to GitHub Actions or similar tools"],
  }),
  role("Cybersecurity & Ethical Hacking Intern", "Internships", "qaSecurity", "intern", {
    employmentType: "Internship · 2–3 months",
    summary: "Build practical security skills by testing our own applications responsibly and helping fix what you find.",
    skills: ["Networking", "Linux", "OWASP Top 10", "Burp Suite", "Web security"],
    do: [
      "Test web applications against the OWASP Top 10 in approved environments",
      "Document findings with clear steps and fixes",
      "Review code and configuration for common security mistakes",
      "Help set up basic monitoring and alerts",
    ],
    need: ["Networking and Linux fundamentals", "Basic understanding of how web applications work", "A strong sense of ethics: testing only what you're authorised to test"],
    nice: ["CTF or lab experience (TryHackMe, Hack The Box)", "Familiarity with Burp Suite or OWASP ZAP"],
  }),
  role("Digital Marketing Intern", "Internships", "marcom", "intern", {
    employmentType: "Internship · 1–2 months",
    summary: "Help grow Mindsoft's online presence through content, social media, SEO and simple campaigns.",
    skills: ["Social media", "SEO basics", "Content writing", "Canva", "Google Analytics"],
    do: [
      "Plan and schedule social media posts",
      "Write short blog posts and website copy",
      "Research keywords and help improve page SEO",
      "Track campaign results and share weekly numbers",
    ],
    need: ["Good written English", "Active interest in social media and online marketing", "Basic design skills with Canva or similar"],
    nice: ["A blog, page or channel you've grown", "Google Analytics or Digital Marketing certificate"],
  }),
];

export const jobs: Job[] = roleList;

// ---------------- helpers ----------------

function closed(job: Job) {
  if (job.status === "closed") return true;
  if (!job.closesOn) return false;
  return new Date(`${job.closesOn}T23:59:59+05:30`) < new Date();
}

/** Roles visible on the website (open first, then closed). Drafts are hidden. */
export function listPublicJobs(kind?: JobKind) {
  return jobs
    .filter((j) => j.status !== "draft" && (!kind || j.kind === kind))
    .sort((a, b) => Number(closed(a)) - Number(closed(b)));
}

export function getPublicJob(slug: string) {
  const job = jobs.find((j) => j.slug === slug);
  return job && job.status !== "draft" ? job : null;
}

export function isAcceptingApplications(job: Job) {
  return job.status === "open" && !closed(job);
}

export function postedLabel(date: string) {
  const days = Math.floor((Date.now() - new Date(`${date}T00:00:00+05:30`).getTime()) / 86_400_000);
  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted yesterday";
  if (days < 7) return `Posted ${days} days ago`;
  if (days < 30) return `Posted ${Math.floor(days / 7)} week${days < 14 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  return `Posted ${months} month${months === 1 ? "" : "s"} ago`;
}
