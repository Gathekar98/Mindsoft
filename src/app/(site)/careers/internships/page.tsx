import type { Metadata } from "next";
import { CareersListing } from "@/components/site/CareersListing";
import { listPublicJobs } from "@/content/jobs";

// Re-compute "Posted …" labels hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Internships — React.js & Python",
  description: "Internships at Mindsoft Tech Solutions for students and freshers: hands-on experience on real projects with mentoring.",
  alternates: { canonical: "/careers/internships" },
};

export default function InternshipsPage() {
  return <CareersListing jobs={listPublicJobs()} initialTeam="Internships" internships />;
}
