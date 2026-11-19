import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { getPublicJob, isAcceptingApplications } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublicJob(slug);
  return { title: job ? `Apply: ${job.title}` : "Apply", robots: { index: false } };
}

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getPublicJob(slug);
  if (!job) notFound();
  const open = isAcceptingApplications(job);

  return (
    <>
      <PageHero
        eyebrow="Job application"
        title={`Apply for ${job.title}`}
        intro="Fill in your details below. Fields marked optional can be left blank."
        crumbs={[{ label: "Careers", href: "/careers" }, { label: job.title, href: `/careers/${job.slug}` }, { label: "Apply" }]}
      />
      <section className="container-ms pb-20">
        {open ? (
          <div className="mx-auto max-w-[860px]">
            <ApplicationForm jobSlug={job.slug} jobTitle={job.title} />
          </div>
        ) : (
          <div className="mx-auto max-w-[680px] rounded-[24px] bg-mist p-10 text-center">
            <h2 className="font-display text-2xl font-extrabold">This position is closed</h2>
            <p className="mt-2 text-slate">It is no longer accepting applications.</p>
            <Link href="/careers" className="btn-primary mt-6">See other openings</Link>
          </div>
        )}
      </section>
    </>
  );
}
