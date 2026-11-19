import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LogoMark } from "@/components/site/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[linear-gradient(180deg,#E1F6FF,#fff)] p-5">
      <div className="w-full max-w-[420px] rounded-[28px] border border-line bg-white p-8 shadow-[var(--shadow-float)]">
        <div className="mb-6 flex items-center gap-3">
          <LogoMark />
          <div>
            <p className="font-display text-lg font-extrabold">Mindsoft Admin</p>
            <p className="text-sm text-muted">Sign in to manage the website</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
