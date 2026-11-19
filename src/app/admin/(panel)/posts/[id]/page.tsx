import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminPageHeader, Card, StatusBadge } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/ActionForm";
import { PostForm } from "@/components/admin/ContentForms";
import { deletePost, setPostStatus } from "../../../actions/content";

export const metadata = { title: "Edit post" };

export default async function EditPostPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  await requireSession("content");
  const { id } = await params;
  const { created } = await searchParams;
  const post = await db.post.findUnique({ where: { id } });
  if (!post) notFound();
  return (
    <>
      <Link href="/admin/posts" className="mb-3 inline-block text-sm font-semibold text-ocean">← All posts</Link>
      <AdminPageHeader
        title={post.title}
        actions={<><StatusBadge status={post.status} />{post.status === "PUBLISHED" && <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-ocean">View ↗</a>}</>}
      />
      {created && <p role="status" className="mb-4 rounded-xl bg-mint-soft px-4 py-3 text-sm text-mint-text">Draft created.</p>}
      <div className="mb-6 flex flex-wrap gap-2">
        {post.status === "DRAFT" ? (
          <ActionButton action={setPostStatus} hidden={{ id: post.id, status: "PUBLISHED" }} label="Publish" confirm="Publish this post?" className="!border-mint !text-mint-text" />
        ) : (
          <ActionButton action={setPostStatus} hidden={{ id: post.id, status: "DRAFT" }} label="Unpublish" />
        )}
        <ActionButton action={deletePost} hidden={{ id: post.id }} label="Delete" confirm="Delete this post permanently?" className="!border-[#f5c2bd] !text-[#b42318]" />
      </div>
      <Card><PostForm post={post} /></Card>
    </>
  );
}
