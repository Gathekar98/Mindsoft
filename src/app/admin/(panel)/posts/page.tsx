import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminPageHeader, EmptyState, StatusBadge, Table, fmtDate } from "@/components/admin/ui";

export const metadata = { title: "Blog posts" };

export default async function PostsPage() {
  await requireSession("content");
  const posts = await db.post.findMany({ orderBy: { updatedAt: "desc" } });
  return (
    <>
      <AdminPageHeader title="Blog posts" subtitle="Insights articles. Drafts are not shown on the website." actions={<Link href="/admin/posts/new" className="btn-primary !py-2.5">New post</Link>} />
      {posts.length === 0 ? (
        <EmptyState title="No posts yet" text="Write your first article." action={<Link href="/admin/posts/new" className="btn-primary">New post</Link>} />
      ) : (
        <Table head={["Title", "Category", "Status", "Published", "Updated"]}>
          {posts.map((p) => (
            <tr key={p.id} className="hover:bg-mist">
              <td className="px-4 py-3"><Link href={`/admin/posts/${p.id}`} className="font-semibold hover:text-ocean">{p.title}</Link></td>
              <td className="px-4 py-3">{p.category}</td>
              <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
              <td className="px-4 py-3 whitespace-nowrap">{fmtDate(p.publishedAt)}</td>
              <td className="px-4 py-3 whitespace-nowrap">{fmtDate(p.updatedAt)}</td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
}
