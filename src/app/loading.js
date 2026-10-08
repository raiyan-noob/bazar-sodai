export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6" role="status" aria-label="Loading">
      <div className="skeleton h-52 w-full rounded-2xl" />
      <div className="skeleton h-6 w-40" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-28 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}