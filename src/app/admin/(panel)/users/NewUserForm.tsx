"use client";

import { ActionForm } from "@/components/admin/ActionForm";
import { SelectField, TextField } from "@/components/admin/Fields";
import { createUser } from "../../actions/users";

export function NewUserForm() {
  return (
    <ActionForm action={createUser} submitLabel="Create user">
      {(err, val) => (
        <>
          <TextField name="name" label="Full name" defaultValue={val.name} error={err.name} />
          <TextField name="email" label="Email" type="email" defaultValue={val.email} error={err.email} />
          <SelectField name="role" label="Role" defaultValue={val.role ?? "EDITOR"} options={[{ value: "EDITOR", label: "Editor — blog & portfolio" }, { value: "SALES", label: "Sales — leads" }, { value: "HR", label: "HR — careers" }, { value: "ADMIN", label: "Admin — everything" }]} />
          <TextField name="password" label="Temporary password" type="password" error={err.password} hint="At least 10 characters. They should change it after signing in." />
        </>
      )}
    </ActionForm>
  );
}
