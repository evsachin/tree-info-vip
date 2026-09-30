import { useEffect, useMemo, useState } from "react";
import { trees } from "../data/trees.js";
import QRCodeCard from "../components/QRCodeCard.jsx";
import { BASE_URL } from "../config.js";

export default function QRCodes() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Tree QR Codes | Tree Information";
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return trees;
    return trees.filter((t) =>
      [t.commonName, t.scientificName, t.id, t.slug].some((v) => v.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <section>
      <h1 className="text-3xl font-bold text-forest">Tree QR codes</h1>
      <p className="mt-1 text-ink/70">
        QR codes point to <span className="font-semibold">{BASE_URL}</span>. Change it in <code>src/config.js</code> before printing.
      </p>

      <label htmlFor="search" className="mt-5 block text-sm font-semibold text-ink/70">Search trees</label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Name or tree ID"
        className="mt-1 min-h-12 w-full max-w-md rounded-full border border-forest/20 bg-white px-5 outline-none focus:border-moss"
      />

      {filtered.length === 0 ? (
        <p className="mt-8 text-ink/70">No trees match "{query}".</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tree) => (
            <QRCodeCard key={tree.id} tree={tree} />
          ))}
        </div>
      )}
    </section>
  );
}
