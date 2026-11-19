"use client";

import { ActionForm } from "@/components/admin/ActionForm";
import { TextField } from "@/components/admin/Fields";
import { changePasswordAction } from "../../actions/auth";

export function PasswordForm() {
  return (
    <ActionForm action={changePasswordAction} submitLabel="Update password">
      <TextField name="current" label="Current password" type="password" />
      <TextField name="next" label="New password" type="password" hint="At least 10 characters." />
      <TextField name="confirm" label="Confirm new password" type="password" />
    </ActionForm>
  );
}
