"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/validation";

/**
 * Wraps a server action form and shows its success / error message.
 * Field errors are exposed through a render prop.
 */
export function ActionForm({
  action,
  children,
  className = "",
  submitLabel = "Save",
  pendingLabel = "Saving…",
  confirm,
}: {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  children: React.ReactNode | ((errors: Record<string, string>, values: Record<string, string>) => React.ReactNode);
  className?: string;
  submitLabel?: string;
  pendingLabel?: string;
  confirm?: string;
}) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" } as FormState);
  return (
    <form
      action={formAction}
      className={`flex flex-col gap-4 ${className}`}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
    >
      {state.message && (
        <p role={state.status === "error" ? "alert" : "status"} className={`rounded-xl px-4 py-3 text-sm ${state.status === "error" ? "bg-[#fef3f2] text-[#b42318]" : "bg-mint-soft text-mint-text"}`}>
          {state.message}
        </p>
      )}
      {typeof children === "function" ? children(state.fieldErrors ?? {}, state.values ?? {}) : children}
      <div>
        <button type="submit" disabled={pending} className="btn-primary !py-2.5">{pending ? pendingLabel : submitLabel}</button>
      </div>
    </form>
  );
}

/** Small inline form button for one-click actions (publish, close, delete…). */
export function ActionButton({
  action,
  label,
  confirm,
  className = "",
  hidden,
}: {
  action: (fd: FormData) => Promise<void>;
  label: string;
  confirm?: string;
  className?: string;
  hidden?: Record<string, string>;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
    >
      {hidden && Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      <button type="submit" className={`rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold hover:border-ocean hover:text-ocean ${className}`}>
        {label}
      </button>
    </form>
  );
}
