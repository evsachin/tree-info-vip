import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { treeUrl } from "../config.js";

const PRINT_SIZE = 1024; // pixels in the downloaded PNG

export default function QRCodeCard({ tree }) {
  const wrapRef = useRef(null);
  const url = treeUrl(tree);

  const download = () => {
    const canvas = wrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${tree.id}-${tree.slug}-qr.png`;
    link.click();
  };

  return (
    <article className="flex flex-col items-center rounded-3xl bg-white p-5 text-center shadow-md shadow-forest/10 ring-1 ring-forest/5">
      <h2 className="text-xl font-bold text-forest">{tree.commonName}</h2>
      <p className="text-ink/60">{tree.id}</p>
      <p className="mt-1 break-all text-sm text-ink/70">{url}</p>

      <div ref={wrapRef} className="my-4 rounded-2xl border border-forest/10 bg-white p-2">
        {/* Canvas is 1024px internally (print quality) but shown small on screen */}
        <QRCodeCanvas
          value={url}
          size={PRINT_SIZE}
          level="M"
          marginSize={4}
          bgColor="#ffffff"
          fgColor="#000000"
          style={{ width: 200, height: 200 }}
          aria-label={`QR code for ${tree.commonName}`}
        />
      </div>

      <button
        type="button"
        onClick={download}
        className="min-h-12 w-full rounded-full bg-forest px-5 font-semibold text-white transition-colors hover:bg-moss"
      >
        Download QR code
      </button>
    </article>
  );
}
