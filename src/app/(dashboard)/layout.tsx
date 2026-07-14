import { auth } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar />
      <div className="min-w-0 flex-1">
        <header className="flex h-14 items-center justify-between gap-2 border-b border-border px-4 sm:px-6">
          <span className="truncate text-sm text-muted-foreground">{session?.user?.email}</span>
          <SignOutButton />
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
