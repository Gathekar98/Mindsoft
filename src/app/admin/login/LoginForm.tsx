"use client";

import { useActionState } from "react";
import { loginAction } from "../actions/auth";
import type { FormState } from "@/lib/validation";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { status: "idle" } as FormState);
  return (
    <form action={action} className="flex flex-col gap-4">
      {state.status === "error" && (
        <p role="alert" className="rounded-xl bg-[#fef3f2] px-4 py-3 text-sm text-[#b42318]">{state.message}</p>
      )}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required defaultValue={state.values?.email} className="field" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="label">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="field" />
      </div>
      <button type="submit" disabled={pending} className="btn-primary mt-2">{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
