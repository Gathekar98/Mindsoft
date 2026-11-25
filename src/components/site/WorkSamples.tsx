/* "What we build" cards for the Work page: a real photo with a crisp UI preview on top,
   so each sample project type reads like a portfolio piece. These are project TYPES, not
   client work, so the previews use neutral placeholder names ("Your Store", "Your Brand"). */
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Mock = "store" | "crm" | "corporate" | "booking" | "ai" | "tracking";

interface Sample {
  mock: Mock;
  image: string;
  tag: string;
  title: string;
  text: string;
  features: string[];
  stack: string[];
  timeline: string;
  href: string;
}

const samples: Sample[] = [
  {
    mock: "store",
    image: "/images/ind-retail.jpg",
    tag: "E-commerce",
    title: "Online store with payments and inventory",
    text: "A fast storefront your team can run day to day, from listing products to shipping orders.",
    features: ["Catalogue, cart and UPI / card checkout", "Stock, orders and GST invoices in one admin", "Order emails and WhatsApp updates"],
    stack: ["Next.js", "Razorpay", "PostgreSQL"],
    timeline: "6–10 weeks",
    href: "/services/ecommerce-development",
  },
  {
    mock: "crm",
    image: "/images/svc-systems.jpg",
    tag: "CRM / ERP",
    title: "Sales CRM that replaces spreadsheets",
    text: "One place for leads, follow-ups and quotations, with reports managers actually open.",
    features: ["Lead pipeline with reminders", "Quotes and invoices from templates", "Role-based access for each team"],
    stack: ["React", "Python", "PostgreSQL"],
    timeline: "8–14 weeks",
    href: "/services/crm-erp-solutions",
  },
  {
    mock: "corporate",
    image: "/images/svc-web.jpg",
    tag: "Corporate website",
    title: "Company website built to win enquiries",
    text: "A clear, quick website that explains what you do and turns visitors into conversations.",
    features: ["Service pages written for search", "Enquiry forms that email your team", "Editable content, no developer needed"],
    stack: ["Next.js", "Headless CMS", "SEO"],
    timeline: "3–6 weeks",
    href: "/services/corporate-website-development",
  },
  {
    mock: "booking",
    image: "/images/ind-healthcare.jpg",
    tag: "Web app · Bookings",
    title: "Appointment booking and customer portal",
    text: "Customers book online and get reminders; your staff see the day at a glance.",
    features: ["Live slots by staff and location", "SMS / email reminders", "Patient or customer history"],
    stack: ["React", "Node.js", "Twilio"],
    timeline: "6–10 weeks",
    href: "/services/custom-web-application-development",
  },
  {
    mock: "ai",
    image: "/images/developers-coding.jpg",
    tag: "AI & Automation",
    title: "AI assistant trained on your documents",
    text: "Answers routine customer and staff questions from your own content, and hands over to a person when needed.",
    features: ["Answers from your FAQs and policies", "Website and WhatsApp chat", "Hand-off to your team with context"],
    stack: ["Python", "OpenAI / Claude", "Vector search"],
    timeline: "4–8 weeks",
    href: "/services/automation-ai-integrations",
  },
  {
    mock: "tracking",
    image: "/images/ind-logistics.jpg",
    tag: "Dashboards",
    title: "Operations dashboard for shipments",
    text: "Live status for every order or delivery, pulled together from the tools you already use.",
    features: ["Live tracking and delay alerts", "Data synced from existing systems", "Daily reports by email"],
    stack: ["React", "FastAPI", "APIs"],
    timeline: "6–12 weeks",
    href: "/services/database-development-integration",
  },
];

/* ---------- tiny UI previews (pure HTML/CSS, decorative) ---------- */

function Browser({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-t-[12px] border border-white/60 bg-white shadow-[0_24px_48px_rgba(7,11,31,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-[#E7ECF3] bg-[#F5F7FA] px-2.5 py-1.5">
        <span className="h-[7px] w-[7px] rounded-full bg-[#FF6B6B]" />
        <span className="h-[7px] w-[7px] rounded-full bg-[#FFC857]" />
        <span className="h-[7px] w-[7px] rounded-full bg-[#3DD68C]" />
        <span className="ml-2 flex-1 truncate rounded-[5px] bg-white px-2 py-[2px] text-[8px] text-[#8A94A6]">{url}</span>
      </div>
      <div className="h-[168px] overflow-hidden text-[#0C122D]">{children}</div>
    </div>
  );
}

const Bar = ({ w, c = "bg-[#E7ECF3]", h = "h-[5px]" }: { w: string; c?: string; h?: string }) => <span className={`block rounded-full ${h} ${c}`} style={{ width: w }} />;

function StoreMock() {
  const items = [
    ["#FFE3D6", "#FF8A5B", "₹1,299"],
    ["#D9F3FB", "#1A8EBF", "₹899"],
    ["#DDF6EC", "#1AA67A", "₹2,450"],
    ["#FFF3D1", "#E0A100", "₹649"],
  ];
  return (
    <Browser url="yourstore.in/shop">
      <div className="flex items-center justify-between px-3 py-2">
        <span className="font-display text-[10px] font-extrabold">Your Store</span>
        <span className="flex gap-2 text-[7px] text-[#5B6478]"><span>New</span><span>Men</span><span>Women</span><span>Sale</span></span>
        <span className="rounded-full bg-[#0C122D] px-2 py-[2px] text-[7px] font-bold text-white">Cart · 2</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 px-3">
        {items.map(([bg, fg, price]) => (
          <div key={price} className="rounded-[6px] border border-[#EEF1F6] p-1">
            <div className="flex h-[58px] items-end justify-center rounded-[4px]" style={{ background: bg }}>
              <span className="mb-1.5 h-[30px] w-[22px] rounded-t-[10px] rounded-b-[3px]" style={{ background: fg }} />
            </div>
            <Bar w="80%" h="h-[4px]" c="bg-[#D5DBE5] mt-1.5" />
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[7.5px] font-bold">{price}</span>
              <span className="rounded-[3px] bg-[#0A5C91] px-1 text-[6px] font-bold text-white">Add</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-2 flex items-center justify-between rounded-[6px] bg-[#0C122D] px-2.5 py-1.5 text-white">
        <span className="text-[7.5px]">Free delivery over ₹999 · Pay by UPI or card</span>
        <span className="rounded-[4px] bg-[#3EC0D5] px-1.5 py-[1px] text-[7px] font-bold text-[#0C122D]">Checkout</span>
      </div>
    </Browser>
  );
}

function CrmMock() {
  const bars = [38, 52, 44, 66, 58, 78, 70];
  return (
    <Browser url="app.yourcrm.in/pipeline">
      <div className="flex h-full">
        <div className="flex w-[58px] flex-col gap-1.5 bg-[#0C122D] p-2">
          <span className="mb-1 text-[8px] font-extrabold text-white">CRM</span>
          {["Dashboard", "Leads", "Quotes", "Reports"].map((l, i) => (
            <span key={l} className={`rounded-[4px] px-1 py-[2px] text-[6.5px] ${i === 1 ? "bg-white/15 text-white" : "text-white/55"}`}>{l}</span>
          ))}
        </div>
        <div className="flex-1 p-2">
          <div className="grid grid-cols-3 gap-1.5">
            {[["New leads", "48", "#1A8EBF"], ["Follow-ups", "17", "#FF8A5B"], ["Won", "₹6.2L", "#1AA67A"]].map(([l, v, c]) => (
              <div key={l} className="rounded-[5px] border border-[#EEF1F6] p-1.5">
                <span className="block text-[6.5px] text-[#8A94A6]">{l}</span>
                <span className="block text-[11px] font-extrabold" style={{ color: c }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex h-[46px] items-end gap-[5px] rounded-[5px] border border-[#EEF1F6] px-2 pb-1.5">
            {bars.map((h, i) => (
              <span key={i} className="flex-1 rounded-t-[2px] bg-[linear-gradient(180deg,#3EC0D5,#0A5C91)]" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mt-1.5 flex flex-col gap-1">
            {[["Demo Traders", "Proposal", "#FFF3D1", "#9A6B00"], ["Sample Foods", "Call today", "#FFE3D6", "#B3471F"], ["Example Pvt Ltd", "Won", "#DDF6EC", "#167A55"]].map(([n, s, bg, fg]) => (
              <div key={n} className="flex items-center justify-between rounded-[4px] bg-[#F7F9FC] px-1.5 py-[3px]">
                <span className="text-[7px] font-semibold">{n}</span>
                <span className="rounded-full px-1.5 text-[6px] font-bold" style={{ background: bg, color: fg }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  );
}

function CorporateMock() {
  return (
    <Browser url="yourbrand.com">
      <div className="flex items-center justify-between px-3 py-2">
        <span className="flex items-center gap-1 font-display text-[9px] font-extrabold"><span className="h-2.5 w-2.5 rounded-[3px] bg-[#0A5C91]" />Your Brand</span>
        <span className="flex gap-2 text-[7px] text-[#5B6478]"><span>Services</span><span>Industries</span><span>About</span></span>
        <span className="rounded-full bg-[#FF8A5B] px-2 py-[2px] text-[7px] font-bold text-white">Get a quote</span>
      </div>
      <div className="mx-3 grid grid-cols-[1.2fr_1fr] gap-2 rounded-[8px] bg-[linear-gradient(135deg,#0A5C91,#3EC0D5)] p-2.5 text-white">
        <div className="flex flex-col gap-1">
          <span className="text-[6.5px] font-bold tracking-widest text-white/75 uppercase">Engineering services</span>
          <span className="font-display text-[11px] leading-tight font-extrabold">Precision parts, delivered on time.</span>
          <span className="mt-0.5 w-fit rounded-full bg-white px-1.5 py-[2px] text-[6.5px] font-bold text-[#0A5C91]">Talk to our team</span>
        </div>
        <div className="flex items-end gap-1">
          {[60, 85, 45].map((h) => <span key={h} className="flex-1 rounded-[4px] bg-white/25" style={{ height: `${h}%` }} />)}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5 px-3">
        {["#D9F3FB", "#FFE3D6", "#DDF6EC"].map((c) => (
          <div key={c} className="rounded-[6px] border border-[#EEF1F6] p-1.5">
            <span className="mb-1 block h-3 w-3 rounded-[3px]" style={{ background: c }} />
            <Bar w="85%" c="bg-[#C9D1DD]" />
            <Bar w="60%" c="bg-[#E7ECF3] mt-1" h="h-[4px]" />
          </div>
        ))}
      </div>
    </Browser>
  );
}

function BookingMock() {
  const slots = ["9:30", "10:00", "10:30", "11:30", "12:00", "4:00", "4:30", "5:30"];
  return (
    <Browser url="book.yourclinic.in">
      <div className="grid h-full grid-cols-[1fr_1.15fr] gap-2 p-2.5">
        <div className="rounded-[6px] border border-[#EEF1F6] p-1.5">
          <span className="block text-[8px] font-bold">December</span>
          <div className="mt-1 grid grid-cols-7 gap-[3px] text-center text-[6px] text-[#5B6478]">
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} className={`rounded-[3px] py-[2px] ${i === 10 ? "bg-[#0A5C91] font-bold text-white" : i % 7 === 6 ? "text-[#C9D1DD]" : ""}`}>{i + 1}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[8px] font-bold">Dr. available · Wed 11</span>
          <div className="grid grid-cols-4 gap-1">
            {slots.map((s, i) => (
              <span key={s} className={`rounded-[4px] border py-[3px] text-center text-[6.5px] font-semibold ${i === 2 ? "border-[#1AA67A] bg-[#DDF6EC] text-[#167A55]" : i === 4 ? "border-[#EEF1F6] text-[#C9D1DD] line-through" : "border-[#EEF1F6]"}`}>{s}</span>
            ))}
          </div>
          <div className="mt-auto rounded-[6px] bg-[#F7F9FC] p-1.5">
            <span className="block text-[6.5px] text-[#8A94A6]">Your booking</span>
            <span className="block text-[7.5px] font-bold">Wed 11 Dec · 10:30 AM</span>
            <span className="mt-1 block rounded-[4px] bg-[#1AA67A] py-[3px] text-center text-[7px] font-bold text-white">Confirm booking</span>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function AiMock() {
  return (
    <Browser url="yourbrand.com/help">
      <div className="flex h-full flex-col gap-1.5 bg-[#F7F9FC] p-2.5">
        <div className="flex items-center gap-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0A5C91,#3EC0D5)] text-[6px] font-bold text-white">AI</span>
          <span className="text-[8px] font-bold">Support assistant</span>
          <span className="ml-auto flex items-center gap-1 text-[6.5px] text-[#167A55]"><span className="h-1.5 w-1.5 rounded-full bg-[#3DD68C]" />Online</span>
        </div>
        <span className="ml-auto max-w-[75%] rounded-[8px] rounded-br-[2px] bg-[#0A5C91] px-2 py-1 text-[7px] text-white">What is your return policy for damaged items?</span>
        <span className="max-w-[82%] rounded-[8px] rounded-bl-[2px] bg-white px-2 py-1 text-[7px] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          Damaged items can be returned within 7 days for a full refund. I can start the return for you now.
          <span className="mt-1 block text-[6px] text-[#8A94A6]">Source: Returns policy, section 2</span>
        </span>
        <span className="flex gap-1">
          <span className="rounded-full border border-[#CDEBF6] bg-white px-1.5 py-[2px] text-[6.5px] font-semibold text-[#0A5C91]">Start a return</span>
          <span className="rounded-full border border-[#CDEBF6] bg-white px-1.5 py-[2px] text-[6.5px] font-semibold text-[#0A5C91]">Talk to a person</span>
        </span>
        <span className="mt-auto flex items-center rounded-full border border-[#E7ECF3] bg-white px-2 py-1 text-[7px] text-[#8A94A6]">
          Type your question…<span className="ml-auto h-3 w-3 rounded-full bg-[#0A5C91]" />
        </span>
      </div>
    </Browser>
  );
}

function TrackingMock() {
  const rows = [
    ["#SH-2041", "Pune → Mumbai", "In transit", "#D9F3FB", "#0A6C9E", 70],
    ["#SH-2038", "Pune → Nashik", "Delivered", "#DDF6EC", "#167A55", 100],
    ["#SH-2044", "Pune → Goa", "Delayed", "#FFE3D6", "#B3471F", 40],
  ] as const;
  return (
    <Browser url="ops.yourcompany.in/shipments">
      <div className="grid h-full grid-cols-[1.1fr_1fr] gap-2 p-2.5">
        <div className="relative overflow-hidden rounded-[6px] bg-[#E9F4F8]">
          <svg viewBox="0 0 120 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M0 70 C30 60 40 80 70 62 S110 40 120 45" stroke="#C3DCE6" strokeWidth="6" fill="none" />
            <path d="M20 0 C25 30 50 40 45 100" stroke="#C3DCE6" strokeWidth="4" fill="none" />
            <path d="M28 66 C45 55 70 50 92 30" stroke="#0A5C91" strokeWidth="2" strokeDasharray="4 3" fill="none" />
            <circle cx="28" cy="66" r="4" fill="#0A5C91" />
            <circle cx="92" cy="30" r="4" fill="#FF8A5B" />
            <circle cx="66" cy="49" r="3" fill="#fff" stroke="#0A5C91" strokeWidth="2" />
          </svg>
          <span className="absolute top-1.5 left-1.5 rounded-[4px] bg-white px-1.5 py-[2px] text-[6.5px] font-bold shadow">ETA 4h 20m</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="grid grid-cols-2 gap-1">
            <div className="rounded-[5px] border border-[#EEF1F6] p-1"><span className="block text-[6px] text-[#8A94A6]">On time</span><span className="text-[10px] font-extrabold text-[#167A55]">94%</span></div>
            <div className="rounded-[5px] border border-[#EEF1F6] p-1"><span className="block text-[6px] text-[#8A94A6]">Active</span><span className="text-[10px] font-extrabold text-[#0A5C91]">126</span></div>
          </div>
          {rows.map(([id, route, s, bg, fg, pct]) => (
            <div key={id} className="rounded-[5px] bg-[#F7F9FC] px-1.5 py-1">
              <div className="flex items-center justify-between">
                <span className="text-[6.5px] font-bold">{id}</span>
                <span className="rounded-full px-1 text-[5.5px] font-bold" style={{ background: bg, color: fg }}>{s}</span>
              </div>
              <span className="block text-[6px] text-[#8A94A6]">{route}</span>
              <span className="mt-0.5 block h-[3px] rounded-full bg-[#E7ECF3]"><span className="block h-full rounded-full" style={{ width: `${pct}%`, background: fg }} /></span>
            </div>
          ))}
        </div>
      </div>
    </Browser>
  );
}

const mocks: Record<Mock, () => ReactNode> = {
  store: StoreMock,
  crm: CrmMock,
  corporate: CorporateMock,
  booking: BookingMock,
  ai: AiMock,
  tracking: TrackingMock,
};

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 flex-none">
    <circle cx="12" cy="12" r="10" fill="#DDF6EC" />
    <path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="#167A55" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function WorkSamples() {
  return (
    <ul className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
      {samples.map((s) => {
        const Preview = mocks[s.mock];
        return (
          <li key={s.mock} className="reveal">
            <Link
              href={s.href}
              className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_rgba(12,18,45,0.18)]"
            >
              {/* Visual: real photo + UI preview */}
              <div className="relative isolate h-[250px] overflow-hidden bg-navy">
                <Image src={s.image} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px" className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(160deg,rgba(7,11,31,0.15),rgba(10,92,145,0.55)_55%,rgba(7,11,31,0.85))]" />
                <span className="absolute top-4 left-4 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">{s.tag}</span>
                <div aria-hidden="true" className="absolute right-5 -bottom-2 left-8 translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
                  <Preview />
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                <span className="text-xs font-bold tracking-widest text-ocean-text uppercase">Sample project type</span>
                <h3 className="font-display text-xl leading-snug font-bold group-hover:text-ocean">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate">{s.text}</p>
                <ul className="flex flex-col gap-2 text-sm text-ink">
                  {s.features.map((f) => (
                    <li key={f} className="flex gap-2"><Check />{f}</li>
                  ))}
                </ul>
                <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Typical technology">
                  {s.stack.map((t) => <li key={t} className="rounded-full bg-sky px-2.5 py-1 text-xs font-medium text-ocean">{t}</li>)}
                </ul>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
                  <span className="text-muted">Typical timeline <strong className="font-semibold text-ink">{s.timeline}</strong></span>
                  <span className="inline-flex items-center gap-1 font-semibold text-ocean">
                    Build this <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
