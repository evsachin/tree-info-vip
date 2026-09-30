const META = {
  environmental: { icon: "🌍", title: "Environmental importance" },
  ecological: { icon: "🌿", title: "Ecological benefits" },
  medicinal: { icon: "🍃", title: "Medicinal uses" },
  cultural: { icon: "🪔", title: "Cultural importance" },
  wildlife: { icon: "🦜", title: "Wildlife support" },
};

export default function TreeBenefits({ importance }) {
  const items = Object.entries(META).filter(([key]) => importance?.[key]);
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="benefits-heading">
      <h2 id="benefits-heading" className="mb-3 text-2xl font-bold text-forest">Why this tree matters</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map(([key, { icon, title }]) => (
          <li key={key} className="rounded-3xl bg-leaf/70 p-5 ring-1 ring-forest/5">
            <p className="mb-1 flex items-center gap-2 text-lg font-bold text-forest">
              <span aria-hidden="true">{icon}</span>
              {title}
            </p>
            <p className="leading-relaxed text-ink/80">{importance[key]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
