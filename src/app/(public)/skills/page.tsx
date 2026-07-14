import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/public/section-heading";

export default function SkillsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        label="Skills"
        title="Technical competencies"
        description="Spanning cybersecurity, systems research, and development."
      />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <div className="mb-4 border-b border-slate-200 pb-2 font-mono text-xs tracking-wider text-blue-600 uppercase dark:border-slate-800 dark:text-blue-400">
              {category.name}
            </div>
            <ul className="space-y-1.5">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 py-1 text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
