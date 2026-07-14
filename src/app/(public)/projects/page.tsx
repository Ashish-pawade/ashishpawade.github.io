import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/public/section-heading";

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        label="Projects"
        title="Research & builds"
        description="Bridging efficient computation and computer vision."
      />

      <div className="space-y-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="relative overflow-hidden rounded-xl bg-slate-950 p-8 sm:p-10"
          >
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(#378ADD 1px, transparent 1px), linear-gradient(90deg, #378ADD 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative">
              <span className="mb-5 inline-block rounded-md border border-teal-500/25 bg-teal-500/15 px-3 py-1 font-mono text-[11px] text-teal-400">
                {project.badge}
              </span>
              <h3 className="mb-4 max-w-2xl text-xl leading-snug font-semibold text-white">
                {project.title}
              </h3>
              <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-400">
                {project.description}
              </p>
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                {project.results.map((result) => (
                  <div
                    key={result.label}
                    className="rounded-lg border border-white/10 bg-white/5 p-5"
                  >
                    <div className="text-2xl font-semibold text-blue-300">{result.value}</div>
                    <div className="mt-1 text-xs text-slate-400">{result.label}</div>
                  </div>
                ))}
              </div>
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 transition-colors hover:text-white"
              >
                {project.link.label} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
