import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { AdminPageHeader, Card } from "@/components/admin/ui";
import { PostForm } from "@/components/admin/ContentForms";

export const metadata = { title: "New post" };

export default async function NewPostPage() {
  await requireSession("content");
  return (
    <>
      <Link href="/admin/posts" className="mb-3 inline-block text-sm font-semibold text-ocean">← All posts</Link>
      <AdminPageHeader title="New post" subtitle="Saved as a draft until you publish it." />
      <Card><PostForm /></Card>
    </>
  );
}
