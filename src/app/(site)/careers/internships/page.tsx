import type { Metadata } from "next";
import { CareersListing } from "@/components/site/CareersListing";
import { listPublicJobs } from "@/content/jobs";

// Re-compute "Posted …" labels hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Internships — Web, Data, Cloud, Design & More",
  description:
    "Remote internships at Mindsoft Tech Solutions for students and freshers: React, Python, full stack, Java, mobile, data science, UI/UX, cloud, DevOps, cybersecurity and digital marketing, with mentoring on real projects.",
  alternates: { canonical: "/careers/internships" },
};

export default function InternshipsPage() {
  return <CareersListing jobs={listPublicJobs()} initialTeam="Internships" internships />;
}
