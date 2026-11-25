import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Faq } from "@/components/site/Faq";
import { generalFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about working with Mindsoft Tech Solutions: pricing, timelines, ownership, support, careers and more.",
  alternates: { canonical: "/faqs" },
};

const groups = [
  { t: "Working with us", items: generalFaqs },
  {
    t: "Payments & contracts",
    items: [
      { q: "How do payments work?", a: "For most websites and smaller projects we ask for 50% upfront to start and 50% at launch. Larger projects are split into agreed milestones, so you pay as work is delivered. The exact schedule is written in your proposal before anything starts." },
      { q: "Do you sign NDAs?", a: "Yes. We're happy to sign a non-disclosure agreement before you share sensitive details." },
      { q: "What if requirements change during the project?", a: "Changes are normal. We estimate the impact on time and cost, and only proceed once you approve the change in writing." },
    ],
  },
  {
    t: "Careers",
    items: [
      { q: "Do you offer internships?", a: "Yes. We offer remote internships for students and freshers in web development, data science, mobile, UI/UX design, cloud, DevOps, cybersecurity and digital marketing. See the Internships page for current openings." },
      { q: "Is the work remote?", a: "Yes. Mindsoft is remote-first, based in Pune, Maharashtra, India." },
      { q: "How will I know the status of my application?", a: "We review every application and contact shortlisted candidates by email." },
    ],
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero eyebrow="FAQs" title="Frequently asked questions" intro="Can't find your answer? Contact us and we'll be happy to help." crumbs={[{ label: "FAQs" }]} />
      <section className="container-ms flex max-w-[900px] flex-col gap-14 pb-20">
        {groups.map((g, i) => (
          <div key={g.t} className="flex flex-col gap-5">
            <h2 className="font-display text-2xl font-extrabold">{g.t}</h2>
            <Faq items={g.items} withSchema={i === 0} />
          </div>
        ))}
      </section>
      <CtaBand title="Still have questions?" primary={{ label: "Contact us", href: "/contact" }} secondary={{ label: "Get a quote", href: "/quote" }} />
    </>
  );
}
