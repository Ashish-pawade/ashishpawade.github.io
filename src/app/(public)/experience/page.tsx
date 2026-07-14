import { experienceTimeline } from "@/data/experience";
import { SectionHeading } from "@/components/public/section-heading";
import { cn } from "@/lib/utils";

export default function ExperiencePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        label="Experience"
        title="Career path"
        description="From teaching to research to securing banking infrastructure."
      />

      <div className="relative">
        <div className="absolute top-2 bottom-2 left-[15px] w-px bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-10">
          {experienceTimeline.map((item) => (
            <div key={item.role} className="relative flex gap-8">
              <div
                className={cn(
                  "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white dark:bg-slate-950",
                  item.active
                    ? "border-blue-500 bg-blue-500"
                    : "border-blue-500"
                )}
              >
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    item.active ? "bg-white" : "bg-blue-500"
                  )}
                />
              </div>
              <div className="flex-1 pb-2">
                <div className="mb-1 font-mono text-xs text-slate-400">{item.date}</div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {item.role}
                </div>
                <div className="mb-3 text-sm text-blue-600 dark:text-blue-400">{item.org}</div>
                <ul className="space-y-1.5">
                  {item.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="ml-4 list-disc text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
