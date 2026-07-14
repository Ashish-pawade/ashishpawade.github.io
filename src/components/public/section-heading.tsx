export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <div className="mb-2 font-mono text-xs tracking-wider text-blue-600 uppercase dark:text-blue-400">
        {label}
      </div>
      <h2 className="mb-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-slate-600 dark:text-slate-400">{description}</p>
      )}
    </div>
  );
}
