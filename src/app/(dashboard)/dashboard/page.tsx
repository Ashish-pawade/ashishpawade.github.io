import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const modules = [
  {
    label: "Expenses",
    href: "/dashboard/expenses",
    description: "Track income and spending, monthly summaries, category breakdown.",
  },
  {
    label: "Certifications",
    href: "/dashboard/certifications",
    description: "Exam countdowns, expiry tracking, and credential roadmap.",
  },
  {
    label: "Learning",
    href: "/dashboard/learning",
    description: "Courses in progress across NPTEL, Udemy, Coursera, and more.",
  },
  {
    label: "Habits",
    href: "/dashboard/habits",
    description: "Daily habit tracking with a GitHub-style streak calendar.",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">Jump into a module below.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {modules.map((m) => (
          <Link key={m.href} href={m.href}>
            <Card className="transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="text-base">{m.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{m.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
