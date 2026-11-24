/**
 * Job openings and internships.
 *
 * HOW TO MANAGE ROLES (no database needed):
 *   - Show a role on the website:   status: "open"
 *   - Show it as closed:            status: "closed"   (visible, no applications)
 *   - Hide it completely:           status: "draft"
 *   - Add a role: copy one block below, change the slug/title/details.
 * Save, commit and push to GitHub — Netlify updates the site automatically.
 *
 * Replace every [CONFIRM: …] before setting a role to "open".
 */

export type JobStatus = "draft" | "open" | "closed";
export type JobKind = "job" | "internship";

export interface Job {
  slug: string; // used in the URL: /careers/<slug>
  title: string;
  kind: JobKind;
  status: JobStatus;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  qualifications: string[];
  benefits: string[];
  postedOn?: string; // YYYY-MM-DD, shown on the job page
  closesOn?: string; // YYYY-MM-DD, applications stop after this date
}

const LOCATION = "Remote · Pune, Maharashtra, India";

export const jobs: Job[] = [
  {
    slug: "react-js-developer",
    title: "React.js Developer",
    kind: "job",
    status: "draft",
    department: "Engineering",
    location: LOCATION,
    employmentType: "Full-time",
    experience: "[CONFIRM: 1–3 years]",
    summary:
      "Build fast, accessible interfaces for client websites and web applications using React, Next.js and TypeScript.",
    responsibilities: [
      "Build responsive pages and reusable components in React and Next.js",
      "Turn Figma designs into accessible, pixel-accurate interfaces",
      "Integrate REST APIs and handle loading, error and empty states",
      "Improve performance and Core Web Vitals",
      "Write clean, typed code and take part in code reviews",
      "Communicate progress clearly with the team and clients",
    ],
    requirements: [
      "Solid JavaScript (ES2020+) and TypeScript",
      "Hands-on experience with React hooks and component design",
      "Working knowledge of Next.js routing and rendering",
      "Comfortable with HTML, CSS and Tailwind CSS",
      "Git and pull-request based workflow",
    ],
    niceToHave: ["Testing Library / Playwright", "Experience with a headless CMS", "Basic Node.js or Python"],
    qualifications: ["Degree in Computer Science or related field, or equivalent practical experience"],
    benefits: ["Remote-first working", "Real client projects", "Mentoring and code reviews", "[CONFIRM: salary range and benefits]"],
  },
  {
    slug: "python-developer",
    title: "Python Developer",
    kind: "job",
    status: "draft",
    department: "Engineering",
    location: LOCATION,
    employmentType: "Full-time",
    experience: "[CONFIRM: 1–3 years]",
    summary: "Design and build reliable APIs, backends and automation with Python, Django and FastAPI.",
    responsibilities: [
      "Develop REST APIs with Django or FastAPI",
      "Model data in PostgreSQL and write migrations",
      "Build background jobs, integrations and automation scripts",
      "Write tests and documentation",
      "Monitor, debug and improve services in production",
      "Work closely with frontend developers on API contracts",
    ],
    requirements: [
      "Strong Python fundamentals",
      "Experience with Django or FastAPI",
      "SQL and relational database design",
      "Understanding of authentication and API security basics",
      "Git and pull-request based workflow",
    ],
    niceToHave: ["Docker", "Celery or task queues", "Experience with LLM APIs or data processing"],
    qualifications: ["Degree in Computer Science or related field, or equivalent practical experience"],
    benefits: ["Remote-first working", "Real client projects", "Mentoring and code reviews", "[CONFIRM: salary range and benefits]"],
  },
  {
    slug: "react-js-developer-intern",
    title: "React.js Developer Intern",
    kind: "internship",
    status: "draft",
    department: "Engineering",
    location: LOCATION,
    employmentType: "Internship · [CONFIRM: duration, stipend]",
    experience: "Students and freshers",
    summary: "Learn professional React development by working on real features with guidance from experienced developers.",
    responsibilities: [
      "Build UI components and pages under guidance",
      "Fix bugs and improve responsiveness",
      "Learn code review, Git workflows and testing",
      "Document what you build",
    ],
    requirements: [
      "Good understanding of HTML, CSS and JavaScript",
      "Basic React knowledge (components, props, state)",
      "At least one personal or academic project to show",
      "Eagerness to learn and ask questions",
    ],
    niceToHave: ["TypeScript basics", "Tailwind CSS", "A GitHub profile"],
    qualifications: ["Pursuing or recently completed a degree or diploma in a computing-related field"],
    benefits: ["Mentoring", "Real project experience", "[CONFIRM: certificate / stipend / pre-placement offer]"],
  },
  {
    slug: "python-developer-intern",
    title: "Python Developer Intern",
    kind: "internship",
    status: "draft",
    department: "Engineering",
    location: LOCATION,
    employmentType: "Internship · [CONFIRM: duration, stipend]",
    experience: "Students and freshers",
    summary: "Get hands-on with Python backends, APIs and automation on real projects, with mentoring throughout.",
    responsibilities: [
      "Write Python scripts and small API endpoints under guidance",
      "Work with databases and SQL queries",
      "Help build automations and integrations",
      "Write tests and documentation",
    ],
    requirements: [
      "Good Python basics (functions, data structures, OOP)",
      "Basic SQL",
      "At least one personal or academic project to show",
      "Eagerness to learn and ask questions",
    ],
    niceToHave: ["Django or FastAPI basics", "Git", "Interest in AI / automation"],
    qualifications: ["Pursuing or recently completed a degree or diploma in a computing-related field"],
    benefits: ["Mentoring", "Real project experience", "[CONFIRM: certificate / stipend / pre-placement offer]"],
  },
];

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
