import Link from "next/link";

export function AdminPageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-extrabold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-white p-5 ${className}`}>{children}</div>;
}

const tones: Record<string, string> = {
  NEW: "bg-sky text-ocean",
  CONTACTED: "bg-sun-soft text-[#8A5A00]",
  QUALIFIED: "bg-mint-soft text-mint-text",
  PROPOSAL_SENT: "bg-[#EEF0FF] text-[#3B3FB5]",
  WON: "bg-mint text-white",
  LOST: "bg-[#F1F2F6] text-muted",
  SPAM: "bg-[#fef3f2] text-[#b42318]",
  DRAFT: "bg-[#F1F2F6] text-muted",
  PUBLISHED: "bg-mint-soft text-mint-text",
  CLOSED: "bg-coral-soft text-coral-text",
  REVIEWING: "bg-sun-soft text-[#8A5A00]",
  SHORTLISTED: "bg-mint-soft text-mint-text",
  INTERVIEW: "bg-[#EEF0FF] text-[#3B3FB5]",
  OFFERED: "bg-mint-soft text-mint-text",
  HIRED: "bg-mint text-white",
  REJECTED: "bg-[#F1F2F6] text-muted",
  WITHDRAWN: "bg-[#F1F2F6] text-muted",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${tones[status] ?? "bg-sky text-ocean"}`}>
      {status.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
    </span>
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#CDEBF6] bg-mist p-10 text-center">
      <p className="font-display text-lg font-bold">{title}</p>
      <p className="mt-1 text-sm text-slate">{text}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function FilterTabs({ items, current, param, base }: { items: { value: string; label: string; count?: number }[]; current?: string; param: string; base: string }) {
  return (
    <nav aria-label="Filter" className="mb-4 flex flex-wrap gap-1.5">
      <Link href={base} aria-current={!current ? "page" : undefined} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${!current ? "bg-navy text-white" : "bg-white text-slate hover:text-ocean"}`}>
        All
      </Link>
      {items.map((i) => (
        <Link
          key={i.value}
          href={`${base}?${param}=${i.value}`}
          aria-current={current === i.value ? "page" : undefined}
          className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${current === i.value ? "bg-navy text-white" : "bg-white text-slate hover:text-ocean"}`}
        >
          {i.label}
          {i.count !== undefined && <span className="ml-1.5 opacity-70">{i.count}</span>}
        </Link>
      ))}
    </nav>
  );
}

export function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-line bg-mist text-xs tracking-wide text-muted uppercase">
          <tr>{head.map((h) => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}

export function fmtDate(d: Date | null | undefined) {
  return d ? d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";
}
