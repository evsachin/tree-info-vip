import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound({
  title = "Page Not Found",
  message = "The page you are looking for does not exist.",
}) {
  useEffect(() => {
    document.title = `${title} | Tree Information`;
  }, [title]);

  return (
    <section className="mx-auto max-w-md rounded-3xl bg-white px-6 py-14 text-center shadow-md shadow-forest/10 ring-1 ring-forest/5">
      <p className="text-5xl" aria-hidden="true">🍂</p>
      <h1 className="mt-4 text-3xl font-bold text-forest">{title}</h1>
      <p className="mt-2 text-ink/70">{message}</p>
      <Link
        to="/"
        className="mt-6 inline-flex min-h-12 items-center rounded-full bg-forest px-8 font-semibold text-white transition-colors hover:bg-moss"
      >
        See all trees
      </Link>
    </section>
  );
}
