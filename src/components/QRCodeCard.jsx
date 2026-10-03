import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { treeUrl } from "../config.js";
import { organization } from "../data/trees.js";

const QR_SIZE = 700;
const DOWNLOAD_WIDTH = 1200;
const DOWNLOAD_HEIGHT = 1600;

/**
 * Draw rounded rectangle on canvas
 */
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();

  ctx.moveTo(x + radius, y);

  ctx.lineTo(x + width - radius, y);

  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );

  ctx.lineTo(
    x + width,
    y + height - radius
  );

  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );

  ctx.lineTo(x + radius, y + height);

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  ctx.lineTo(x, y + radius);

  ctx.quadraticCurveTo(
    x,
    y,
    x + radius,
    y
  );

  ctx.closePath();
}

/**
 * Draw centered text
 */
function drawCenteredText(
  ctx,
  text,
  x,
  y,
  font,
  color
) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, x, y);
}

/**
 * Draw wrapped text
 */
function drawWrappedText(
  ctx,
  text,
  x,
  y,
  maxWidth,
  lineHeight,
  font,
  color
) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";

  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, currentY);

  return currentY;
}

export default function QRCodeCard({ tree }) {
  const wrapRef = useRef(null);

  const url = treeUrl(tree);

  /**
   * Download the complete printable QR card.
   */
  const download = () => {
    const qrCanvas =
      wrapRef.current?.querySelector("canvas");

    if (!qrCanvas) {
      alert("QR code is not ready yet.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = DOWNLOAD_WIDTH;
    canvas.height = DOWNLOAD_HEIGHT;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const centerX = DOWNLOAD_WIDTH / 2;

    // --------------------------------------------------
    // Background
    // --------------------------------------------------

    ctx.fillStyle = "#f5f5f0";
    ctx.fillRect(
      0,
      0,
      DOWNLOAD_WIDTH,
      DOWNLOAD_HEIGHT
    );

    // --------------------------------------------------
    // Outer green border
    // --------------------------------------------------

    roundedRect(
      ctx,
      50,
      50,
      DOWNLOAD_WIDTH - 100,
      DOWNLOAD_HEIGHT - 100,
      45
    );

    ctx.fillStyle = "#0f6842";
    ctx.fill();

    // --------------------------------------------------
    // Inner white card
    // --------------------------------------------------

    roundedRect(
      ctx,
      100,
      100,
      DOWNLOAD_WIDTH - 200,
      DOWNLOAD_HEIGHT - 200,
      40
    );

    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // --------------------------------------------------
    // Organization Name
    // --------------------------------------------------

    drawCenteredText(
      ctx,
      organization.name,
      centerX,
      185,
      "bold 42px Arial",
      "#145c3b"
    );

    // --------------------------------------------------
    // CSR Initiative
    // --------------------------------------------------

    drawCenteredText(
      ctx,
      organization.initiativeName,
      centerX,
      240,
      "bold 30px Arial",
      "#145c3b"
    );

    // --------------------------------------------------
    // Organization Head
    // --------------------------------------------------

    drawCenteredText(
      ctx,
      `Head: ${organization.headName}`,
      centerX,
      295,
      "24px Arial",
      "#555555"
    );

    // --------------------------------------------------
    // QR Code
    // --------------------------------------------------

    const qrDisplaySize = 650;

    const qrX =
      centerX - qrDisplaySize / 2;

    const qrY = 340;

    ctx.drawImage(
      qrCanvas,
      qrX,
      qrY,
      qrDisplaySize,
      qrDisplaySize
    );

    // --------------------------------------------------
    // Separator line
    // --------------------------------------------------

    ctx.beginPath();

    ctx.moveTo(220, 1040);
    ctx.lineTo(980, 1040);

    ctx.strokeStyle = "#145c3b";
    ctx.lineWidth = 3;

    ctx.stroke();

    // --------------------------------------------------
    // Tree Name
    // --------------------------------------------------

    drawCenteredText(
      ctx,
      "Tree Name:",
      centerX,
      1095,
      "bold 30px Arial",
      "#145c3b"
    );

    // Local name + scientific name
    const treeName =
      `${tree.localName || tree.commonName} - ${tree.scientificName}`;

    drawWrappedText(
      ctx,
      treeName,
      centerX,
      1145,
      850,
      45,
      "bold 34px Arial",
      "#145c3b"
    );

    // --------------------------------------------------
    // Tree Number
    // --------------------------------------------------

    drawCenteredText(
      ctx,
      `Tree No: ${tree.treeNumber || tree.id}`,
      centerX,
      1250,
      "30px Arial",
      "#555555"
    );

    // --------------------------------------------------
    // Scan instruction
    // --------------------------------------------------

    drawCenteredText(
      ctx,
      "Scan to know more",
      centerX,
      1320,
      "bold 28px Arial",
      "#145c3b"
    );

    // --------------------------------------------------
    // Project Footer
    // --------------------------------------------------

    const footerText =
      `${organization.totalTrees} TREES — ${organization.projectName}`;

    drawCenteredText(
      ctx,
      footerText,
      centerX,
      1435,
      "bold 22px Arial",
      "#145c3b"
    );

    // --------------------------------------------------
    // Download
    // --------------------------------------------------

    const link =
      document.createElement("a");

    link.download =
      `${tree.treeNumber || tree.id}-${tree.slug}-qr-card.png`;

    link.href =
      canvas.toDataURL("image/png");

    link.click();
  };

  return (
    <article
      className="
        flex
        flex-col
        items-center
        rounded-3xl
        bg-white
        p-5
        text-center
        shadow-md
        shadow-forest/10
        ring-1
        ring-forest/5
      "
    >

      {/* Tree Name */}

      <h2 className="text-xl font-bold text-forest">
        {tree.commonName}
      </h2>

      <p className="text-ink/60">
        {tree.treeNumber || tree.id}
      </p>

      {/* URL */}

      <p className="mt-1 break-all text-sm text-ink/70">
        {url}
      </p>

      {/* QR Preview */}

      <div
        ref={wrapRef}
        className="
          my-4
          rounded-2xl
          border
          border-forest/10
          bg-white
          p-2
        "
      >
        <QRCodeCanvas
          value={url}
          size={QR_SIZE}
          level="H"
          marginSize={4}
          bgColor="#ffffff"
          fgColor="#000000"
          style={{
            width: 200,
            height: 200,
          }}
          aria-label={`QR code for ${tree.commonName}`}
        />
      </div>

      {/* Download */}

      <button
        type="button"
        onClick={download}
        className="
          min-h-12
          w-full
          rounded-full
          bg-forest
          px-5
          font-semibold
          text-white
          transition-colors
          hover:bg-moss
        "
      >
        Download QR Card
      </button>

    </article>
  );
}