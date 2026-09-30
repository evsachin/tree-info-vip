import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTreeBySlug } from "../data/trees.js";
import TreeInfo from "../components/TreeInfo.jsx";
import TreeBenefits from "../components/TreeBenefits.jsx";
import TreeGallery from "../components/TreeGallery.jsx";
import NotFound from "./NotFound.jsx";

export default function TreePage() {
  const { slug } = useParams();
  const tree = getTreeBySlug(slug);

  useEffect(() => {
    document.title = tree
      ? `${tree.commonName} (${tree.scientificName}) | Tree Information`
      : "Tree Not Found | Tree Information";
    window.scrollTo(0, 0);
  }, [tree]);

  if (!tree) return <NotFound message="The requested tree information could not be found." title="Tree Not Found" />;

  const mapUrl = tree.coordinates
    ? `https://www.google.com/maps?q=${tree.coordinates.lat},${tree.coordinates.lng}`
    : null;

  return (
    <article className="space-y-8">
      <header>
        <img
          src={tree.images[0]}
          alt={tree.commonName}
          width="800"
          height="600"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-md shadow-forest/10 sm:aspect-[16/9]"
        />
        <h1 className="mt-5 text-4xl font-bold text-forest">{tree.commonName}</h1>
        <p className="text-lg italic text-ink/70">{tree.scientificName}</p>
        <p className="mt-1 text-sm font-semibold text-moss">Tree ID: {tree.id}</p>
      </header>

      <TreeInfo tree={tree} />

      <section aria-labelledby="about-heading">
        <h2 id="about-heading" className="mb-3 text-2xl font-bold text-forest">About this tree</h2>
        <p className="max-w-prose text-lg leading-relaxed text-ink/85">{tree.description}</p>
      </section>

      <TreeBenefits importance={tree.importance} />

      <section aria-labelledby="location-heading" className="rounded-3xl bg-white p-5 shadow-md shadow-forest/10 ring-1 ring-forest/5 sm:p-6">
        <h2 id="location-heading" className="mb-2 text-2xl font-bold text-forest">Location</h2>
        <p className="text-lg">📍 {tree.location}</p>
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-12 items-center rounded-full border-2 border-forest px-6 font-semibold text-forest transition-colors hover:bg-leaf"
          >
            View on map
          </a>
        )}
      </section>

      <TreeGallery images={tree.images} name={tree.commonName} />
    </article>
  );
}
