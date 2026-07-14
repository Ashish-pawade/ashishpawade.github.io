import Link from "next/link";
import { hero } from "@/data/profile";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#378ADD 1px, transparent 1px), linear-gradient(90deg, #378ADD 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-28 sm:py-36">
        <div className="mb-6 font-mono text-sm text-teal-400">
          <span className="mr-2 opacity-60">&gt;</span>
          {hero.eyebrow}
        </div>
        <h1 className="mb-6 max-w-3xl text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {hero.heading}
          <br />
          <span className="text-blue-400">{hero.headingAccent}</span>
        </h1>
        <p className="mb-10 max-w-xl text-lg text-slate-400">{hero.subtext}</p>

        <div className="mb-10 flex flex-wrap gap-2.5">
          {hero.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-blue-400/20 bg-blue-400/10 px-3.5 py-1.5 font-mono text-xs text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button render={<Link href={hero.ctaPrimary.href} />} nativeButton={false} size="lg">
            {hero.ctaPrimary.label} →
          </Button>
          <Button
            render={
              <a href={hero.ctaSecondary.href} target="_blank" rel="noopener noreferrer" />
            }
            nativeButton={false}
            size="lg"
            variant="outline"
            className="border-white/15 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white"
          >
            {hero.ctaSecondary.label}
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap gap-10 border-t border-white/10 pt-8">
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-semibold text-white">{stat.value}</div>
              <div className="mt-0.5 text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
