import { Link, NavLink } from "react-router-dom";
import { PROJECT_NAME } from "../config.js";

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    isActive ? "bg-leaf text-forest" : "text-ink/70 hover:text-forest"
  }`;

export default function Navbar() {
  return (
    <header className="border-b border-forest/10 bg-white/80 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-forest">
          <img src="/favicon.svg" alt="" width="28" height="28" />
          <span>{PROJECT_NAME}</span>
        </Link>
        <div className="flex gap-1">
          <NavLink to="/" end className={linkClass}>Trees</NavLink>
          <NavLink to="/qr-codes" className={linkClass}>QR codes</NavLink>
        </div>
      </nav>
    </header>
  );
}
