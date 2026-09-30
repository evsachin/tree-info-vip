import { useEffect } from "react";
import { trees } from "../data/trees.js";
import TreeCard from "../components/TreeCard.jsx";

export default function Home() {
  useEffect(() => {
    document.title = "Tree Information";
  }, []);

  return (
    <>
      <section className="rounded-3xl bg-leaf px-6 py-12 text-center sm:py-16">
        <h1 className="text-4xl font-bold text-forest sm:text-5xl">Tree Information</h1>
        <p className="mx-auto mt-3 max-w-md text-lg text-ink/80">
          Discover and learn about the trees around us.
        </p>
        <a
          href="#trees"
          className="mt-6 inline-flex min-h-12 items-center rounded-full bg-forest px-8 font-semibold text-white transition-colors hover:bg-moss"
        >
          Explore trees
        </a>
      </section>

      <section id="trees" aria-labelledby="trees-heading" className="mt-10 scroll-mt-6">
        <h2 id="trees-heading" className="mb-4 text-2xl font-bold text-forest">Trees</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trees.map((tree) => (
            <TreeCard key={tree.id} tree={tree} />
          ))}
        </div>
      </section>
    </>
  );
}
