import type { Metadata } from "next";
import { CareersListing } from "@/components/site/CareersListing";
import { listPublicJobs } from "@/content/jobs";

// Re-compute "Posted …" labels hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Careers — Developer, Design, QA & Business Jobs",
  description:
    "Remote-first careers at Mindsoft Tech Solutions, Pune: React, Python, Java, .NET, PHP, mobile, DevOps, QA, design and business roles, plus internships.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return <CareersListing jobs={listPublicJobs()} />;
}
