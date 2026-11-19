import { requireSession } from "@/lib/auth";
import { AdminPageHeader, Card } from "@/components/admin/ui";
import { PasswordForm } from "./PasswordForm";

export const metadata = { title: "My account" };

export default async function AccountPage() {
  const session = await requireSession();
  return (
    <>
      <AdminPageHeader title="My account" subtitle={`${session.email} · ${session.role}`} />
      <Card className="max-w-lg">
        <h2 className="mb-3 font-display font-bold">Change password</h2>
        <PasswordForm />
      </Card>
    </>
  );
}
