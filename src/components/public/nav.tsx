"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/data/site-meta";
import { cn } from "@/lib/utils";

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image src="/pawade-logo.svg" alt="Ashish Pawade" width={380} height={300} className="h-14 w-auto" priority />
        </Link>

        <nav className="hidden gap-8 md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] font-medium tracking-wide text-slate-400 transition-colors hover:text-white",
                pathname === link.href && "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="flex flex-col gap-1.5 p-1 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-5 bg-slate-400" />
          <span className="block h-0.5 w-5 bg-slate-400" />
          <span className="block h-0.5 w-5 bg-slate-400" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-white/10 bg-slate-950/98 px-6 py-4 md:hidden">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-sm font-medium text-slate-400 transition-colors hover:text-white",
                pathname === link.href && "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
