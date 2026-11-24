import type { Metadata } from "next";
import { CareersListing } from "@/components/site/CareersListing";
import { listPublicJobs } from "@/content/jobs";

export const metadata: Metadata = {
  title: "Internships — React.js & Python",
  description: "Internships at Mindsoft Tech Solutions for students and freshers: hands-on React.js and Python experience with mentoring.",
  alternates: { canonical: "/careers/internships" },
};

export default function InternshipsPage() {
  return <CareersListing jobs={listPublicJobs("internship")} filter="internships" base="/careers/internships" />;
}
