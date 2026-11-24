import { redirect } from "next/navigation";

/** The application form now lives on the job page itself (#apply). */
export default async function ApplyRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/careers/${slug}#apply`);
}
