import { publicCertifications } from "@/data/certifications.public";
import { SectionHeading } from "@/components/public/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CertificationsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        label="Certifications & credentials"
        title="Credentials and roadmap"
        description="Earned credentials and certifications in progress."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {publicCertifications.map((cert) => (
          <div
            key={cert.name}
            className="flex items-start gap-3 rounded-lg border border-slate-200 p-5 transition-colors hover:border-blue-500 dark:border-slate-800"
          >
            <div
              className={cn(
                "mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full",
                cert.statusType === "earned" ? "bg-teal-500" : "bg-blue-500"
              )}
            />
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">
                {cert.name}
              </div>
              <div className="mt-0.5 text-xs text-slate-400">{cert.org}</div>
              <Badge
                variant="secondary"
                className={cn(
                  "mt-2 font-mono text-[11px]",
                  cert.statusType === "earned"
                    ? "bg-teal-500/10 text-teal-600 dark:text-teal-400"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                )}
              >
                {cert.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
