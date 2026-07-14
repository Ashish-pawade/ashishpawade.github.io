import { SectionHeading } from "@/components/public/section-heading";

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading label="Blog" title="Writing" />
      <div className="rounded-xl border border-dashed border-slate-300 px-8 py-20 text-center dark:border-slate-700">
        <p className="font-mono text-sm text-slate-400">coming soon</p>
      </div>
    </section>
  );
}
