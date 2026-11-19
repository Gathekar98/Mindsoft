import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { AdminPageHeader, Card } from "@/components/admin/ui";
import { ProjectForm } from "@/components/admin/ContentForms";

export const metadata = { title: "New project" };

export default async function NewProjectPage() {
  await requireSession("content");
  return (
    <>
      <Link href="/admin/projects" className="mb-3 inline-block text-sm font-semibold text-ocean">← Portfolio</Link>
      <AdminPageHeader title="New project" subtitle="Saved as a draft until you publish it." />
      <Card><ProjectForm /></Card>
    </>
  );
}
