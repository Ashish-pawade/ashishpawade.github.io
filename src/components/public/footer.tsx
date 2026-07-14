import { footer } from "@/data/site-meta";

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-8 text-center">
      <p className="text-xs text-slate-400">
        {footer.text} ·{" "}
        <a href={footer.link.href} className="text-blue-400 hover:underline">
          {footer.link.label}
        </a>
      </p>
    </footer>
  );
}
