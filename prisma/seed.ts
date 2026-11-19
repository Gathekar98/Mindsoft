/**
 * Seeds the first admin user and the four draft vacancies.
 * Safe to run more than once (upserts by email / slug).
 *
 *   npm run db:seed
 */
import { PrismaClient, JobKind, JobStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const LOCATION = "Remote · Pune, Maharashtra, India";

const jobs = [
  {
    slug: "react-js-developer",
    title: "React.js Developer",
    kind: JobKind.JOB,
    department: "Engineering",
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
    kind: JobKind.JOB,
    department: "Engineering",
    employmentType: "Full-time",
    experience: "[CONFIRM: 1–3 years]",
    summary:
      "Design and build reliable APIs, backends and automation with Python, Django and FastAPI.",
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
    kind: JobKind.INTERNSHIP,
    department: "Engineering",
    employmentType: "Internship · [CONFIRM: duration, stipend]",
    experience: "Students and freshers",
    summary:
      "Learn professional React development by working on real features with guidance from experienced developers.",
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
    kind: JobKind.INTERNSHIP,
    department: "Engineering",
    employmentType: "Internship · [CONFIRM: duration, stipend]",
    experience: "Students and freshers",
    summary:
      "Get hands-on with Python backends, APIs and automation on real projects, with mentoring throughout.",
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

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password || password.length < 10) {
    throw new Error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD (min 10 chars) in .env before seeding.");
  }

  await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: {},
    create: {
      email: email.toLowerCase(),
      name: "Administrator",
      role: "ADMIN",
      passwordHash: await bcrypt.hash(password, 12),
    },
  });

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: {},
      // Draft until approved for publication in the admin panel.
      create: { ...job, location: LOCATION, status: JobStatus.DRAFT },
    });
  }

  console.log(`Seeded admin ${email} and ${jobs.length} draft vacancies.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
