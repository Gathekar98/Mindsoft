import { Role } from "@prisma/client";
import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminPageHeader, Card, Table, fmtDate } from "@/components/admin/ui";
import { NewUserForm } from "./NewUserForm";
import { updateUser } from "../../actions/users";

export const metadata = { title: "Users" };

const roleHelp: Record<Role, string> = {
  ADMIN: "Everything, including users",
  HR: "Jobs and applications",
  SALES: "Leads and quote requests",
  EDITOR: "Blog posts and portfolio",
};

export default async function UsersPage() {
  const session = await requireSession("users");
  const users = await db.user.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <>
      <AdminPageHeader title="Users" subtitle="Staff who can sign in to the admin panel." />
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Table head={["User", "Role & access", "Created", ""]}>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="px-4 py-3"><p className="font-semibold">{u.name}{u.id === session.sub && <span className="ml-2 text-xs text-muted">(you)</span>}</p><p className="text-xs text-muted">{u.email}</p></td>
              <td className="px-4 py-3" colSpan={1}>
                <form action={updateUser} className="flex flex-wrap items-center gap-2">
                  <input type="hidden" name="id" value={u.id} />
                  <label htmlFor={`role-${u.id}`} className="sr-only">Role</label>
                  <select id={`role-${u.id}`} name="role" defaultValue={u.role} disabled={u.id === session.sub} className="field !w-auto !py-2">
                    {Object.values(Role).map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <label className="flex items-center gap-1.5 text-sm">
                    <input type="checkbox" name="active" defaultChecked={u.active} disabled={u.id === session.sub} className="h-4 w-4 accent-ocean" /> Active
                  </label>
                  {u.id !== session.sub && <button className="rounded-lg border border-line px-3 py-1.5 text-sm font-semibold hover:border-ocean">Save</button>}
                </form>
                <p className="mt-1 text-xs text-muted">{roleHelp[u.role]}</p>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">{fmtDate(u.createdAt)}</td>
              <td />
            </tr>
          ))}
        </Table>
        <Card>
          <h2 className="mb-3 font-display font-bold">Add a user</h2>
          <NewUserForm />
        </Card>
      </div>
    </>
  );
}
