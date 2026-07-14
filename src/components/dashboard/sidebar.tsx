"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const modules = [
  { label: "Overview", href: "/dashboard" },
  { label: "Expenses", href: "/dashboard/expenses" },
  { label: "Certifications", href: "/dashboard/certifications" },
  { label: "Learning", href: "/dashboard/learning" },
  { label: "Habits", href: "/dashboard/habits" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="shrink-0 border-b border-border bg-muted/30 p-3 sm:p-4 md:w-56 md:border-r md:border-b-0">
      <Link href="/" className="mb-3 hidden md:mb-6 md:block">
        <Image src="/pawade-logo.svg" alt="Ashish Pawade" width={380} height={300} className="h-16 w-auto" />
      </Link>
      <nav className="flex gap-1 overflow-x-auto md:flex-col md:space-y-1 md:overflow-visible">
        {modules.map((m) => {
          const active = pathname === m.href;
          return (
            <Link
              key={m.href}
              href={m.href}
              className={cn(
                "shrink-0 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors md:block",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {m.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
