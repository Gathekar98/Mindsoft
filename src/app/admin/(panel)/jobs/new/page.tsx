import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { AdminPageHeader, Card } from "@/components/admin/ui";
import { JobForm } from "@/components/admin/JobForm";

export const metadata = { title: "New job" };

export default async function NewJobPage() {
  await requireSession("careers");
  return (
    <>
      <Link href="/admin/jobs" className="mb-3 inline-block text-sm font-semibold text-ocean">← All jobs</Link>
      <AdminPageHeader title="New job" subtitle="Saved as a draft. Publish it when it's approved." />
      <Card><JobForm /></Card>
    </>
  );
}
