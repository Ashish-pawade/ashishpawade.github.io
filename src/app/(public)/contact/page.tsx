import { contact } from "@/data/profile";

export default function ContactPage() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-center text-white">
      <div className="mb-2 font-mono text-xs tracking-wider text-teal-400 uppercase">
        Contact
      </div>
      <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">{contact.title}</h2>
      <p className="mx-auto mb-10 max-w-md text-slate-400">{contact.description}</p>
      <div className="flex flex-wrap justify-center gap-4">
        {contact.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="rounded-md border border-white/15 px-6 py-3 text-sm font-medium transition-colors hover:border-blue-400 hover:bg-blue-400/10"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
