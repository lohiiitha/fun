export function LoadingSkeleton() {
  return (
    <div className="grid gap-3 md:grid-cols-3" aria-label="loading-state">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="h-24 animate-pulse rounded-xl bg-slate-200" />
      ))}
    </div>
  );
}
