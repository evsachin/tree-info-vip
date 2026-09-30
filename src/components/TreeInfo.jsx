export default function TreeInfo({ tree }) {
  const rows = [
    ["Common name", tree.commonName],
    ["Scientific name", tree.scientificName],
    ["Family", tree.family],
    ["Tree ID", tree.id],
    ["Location", tree.location],
    ["Approx. age", tree.age],
    ["Height", tree.height],
  ].filter(([, value]) => value);

  return (
    <section aria-labelledby="info-heading" className="rounded-3xl bg-white p-5 shadow-md shadow-forest/10 ring-1 ring-forest/5 sm:p-6">
      <h2 id="info-heading" className="mb-3 text-2xl font-bold text-forest">Tree information</h2>
      <dl className="divide-y divide-forest/10">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:gap-4">
            <dt className="text-ink/60 sm:w-44 sm:shrink-0">{label}</dt>
            <dd className="font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
