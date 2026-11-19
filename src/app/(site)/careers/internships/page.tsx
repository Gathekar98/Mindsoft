import type { Metadata } from "next";
import { CareersListing } from "@/components/site/CareersListing";
import { listPublicJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Internships — React.js & Python",
  description: "Internships at Mindsoft Tech Solutions for students and freshers: hands-on React.js and Python experience with mentoring.",
  alternates: { canonical: "/careers/internships" },
};

export default async function InternshipsPage() {
  const jobs = await listPublicJobs("INTERNSHIP");
  return <CareersListing jobs={jobs} filter="internships" base="/careers/internships" />;
}
