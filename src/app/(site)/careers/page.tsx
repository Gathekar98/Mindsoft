import type { Metadata } from "next";
import { CareersListing } from "@/components/site/CareersListing";
import { listPublicJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers — React.js & Python Developer Jobs",
  description: "Careers at Mindsoft Tech Solutions, Pune: remote-first React.js and Python developer roles and internships.",
  alternates: { canonical: "/careers" },
};

export default async function CareersPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const filter = type === "jobs" ? "jobs" : "all";
  const jobs = await listPublicJobs(filter === "jobs" ? "JOB" : undefined);
  return <CareersListing jobs={jobs} filter={filter} base="/careers" />;
}
