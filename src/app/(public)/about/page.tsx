import { about } from "@/data/profile";
import { SectionHeading } from "@/components/public/section-heading";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading label="About" title={about.title} />

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="rounded-xl bg-slate-950 p-8 text-white">
          <div className="mb-6 font-mono text-xs tracking-wider text-teal-400 uppercase">
            At a glance
          </div>
          <div className="space-y-5">
            {about.atAGlance.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <div>
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
