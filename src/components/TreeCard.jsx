import { Link } from "react-router-dom";

export default function TreeCard({ tree }) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-md shadow-forest/10 ring-1 ring-forest/5">
      <img
        src={tree.images[0]}
        alt={`${tree.commonName}`}
        width="800"
        height="600"
        loading="lazy"
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-forest">{tree.commonName}</h3>
        <p className="italic text-ink/70">{tree.scientificName}</p>
        <Link
          to={`/tree/${tree.slug}`}
          className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-forest px-5 font-semibold text-white transition-colors hover:bg-moss"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
