import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon, PageHero } from "@/components/site/PageHero";
import { getPublicJob, isAcceptingApplications } from "@/lib/jobs";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublicJob(slug);
  if (!job) return { title: "Position not found" };
  return {
    title: `${job.title} — Careers`,
    description: job.summary.slice(0, 160),
    alternates: { canonical: `/careers/${job.slug}` },
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getPublicJob(slug);
  if (!job) notFound();
  const open = isAcceptingApplications(job);
  const parentCrumb = job.kind === "INTERNSHIP" ? { label: "Internships", href: "/careers/internships" } : { label: "Careers", href: "/careers" };

  const blocks = [
    { t: "What you'll do", items: job.responsibilities },
    { t: "What we're looking for", items: job.requirements },
    { t: "Nice to have", items: job.niceToHave },
    { t: "Qualifications", items: job.qualifications },
    { t: "What we offer", items: job.benefits },
  ].filter((b) => b.items.length);

  return (
    <>
      <PageHero
        eyebrow={job.kind === "INTERNSHIP" ? "Internship" : job.department}
        title={job.title}
        intro={job.summary}
        crumbs={[{ label: "Careers", href: "/careers" }, ...(job.kind === "INTERNSHIP" ? [parentCrumb] : []), { label: job.title }]}
      >
        {open ? (
          <Link href={`/careers/${job.slug}/apply`} className="btn-primary">Apply for this role</Link>
        ) : (
          <p className="inline-block rounded-xl bg-[#F1F2F6] px-4 py-3 font-semibold text-muted">This position is closed and no longer accepting applications.</p>
        )}
      </PageHero>

      <section className="container-ms grid gap-12 py-16 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-10">
          {blocks.map((b) => (
            <div key={b.t} className="reveal flex flex-col gap-4">
              <h2 className="font-display text-2xl font-extrabold">{b.t}</h2>
              <ul className="flex flex-col gap-3">
                {b.items.map((x) => (
                  <li key={x} className="flex gap-3 text-[16px] leading-relaxed text-slate"><CheckIcon className="mt-1" /> {x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-4 rounded-[24px] border border-line bg-mist p-7">
            <h2 className="font-display text-lg font-bold">Role details</h2>
            <dl className="flex flex-col gap-3 text-sm">
              {[
                ["Type", job.employmentType],
                ["Experience", job.experience],
                ["Location", job.location],
                ["Department", job.department],
                ...(job.closesAt ? [["Apply by", job.closesAt.toLocaleDateString("en-IN", { dateStyle: "medium" })]] : []),
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            {open && <Link href={`/careers/${job.slug}/apply`} className="btn-primary mt-2">Apply now</Link>}
            <p className="text-xs text-muted">Applications take about 5 minutes. Have your resume (PDF/DOC, max 5 MB) ready.</p>
          </div>
        </aside>
      </section>

      {open && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              title: job.title,
              description: [job.summary, ...job.responsibilities, ...job.requirements].join(" "),
              datePosted: (job.publishedAt ?? job.createdAt).toISOString(),
              ...(job.closesAt ? { validThrough: job.closesAt.toISOString() } : {}),
              employmentType: job.kind === "INTERNSHIP" ? "INTERN" : "FULL_TIME",
              jobLocationType: "TELECOMMUTE",
              applicantLocationRequirements: { "@type": "Country", name: "India" },
              hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url },
            }),
          }}
        />
      )}
    </>
  );
}
