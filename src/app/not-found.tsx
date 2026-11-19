import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { GlobeRing } from "@/components/site/Art";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="relative overflow-hidden bg-[linear-gradient(180deg,#E1F6FF,#fff)]">
        <div className="container-ms grid items-center gap-10 py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">Error 404</p>
            <h1 className="font-display text-[40px] leading-tight font-extrabold sm:text-[56px]">This page drifted off the map.</h1>
            <p className="max-w-md text-lg text-slate">The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of these instead:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="btn-primary">Go to homepage</Link>
              <Link href="/services" className="btn-outline">Our services</Link>
              <Link href="/contact" className="btn px-2 text-ocean">Contact us →</Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            <GlobeRing className="absolute inset-0 h-full w-full" />
            <span className="absolute inset-0 flex items-center justify-center font-display text-[96px] font-extrabold text-white drop-shadow-[0_10px_30px_rgba(10,62,110,0.5)]">404</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
