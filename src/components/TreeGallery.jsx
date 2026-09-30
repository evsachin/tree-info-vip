export default function TreeGallery({ images, name }) {
  if (!images || images.length < 2) return null;

  return (
    <section aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="mb-3 text-2xl font-bold text-forest">Photos</h2>
      {/* Mobile: swipeable row, one image at a time. Desktop: grid. */}
      <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {images.map((src, i) => (
          <li key={src} className="w-[85%] shrink-0 snap-center sm:w-auto">
            <img
              src={src}
              alt={`${name}, photo ${i + 1} of ${images.length}`}
              width="800"
              height="600"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-md shadow-forest/10"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
