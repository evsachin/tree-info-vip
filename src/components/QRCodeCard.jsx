import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { treeUrl } from "../config.js";

const WIDTH = 1200;
const HEIGHT = 1450;
const QR_SIZE = 800;

const GREEN = "#075C38";
const DARK_GREEN = "#06482D";
const TEXT_GRAY = "#444444";
const WHITE = "#FFFFFF";

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.closePath();
}

function centerText(ctx, text, x, y, font, color, maxWidth = 950) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(text), x, y, maxWidth);
}

function drawLeaf(ctx, x, y, size, angle = 0) {
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.moveTo(0, 0);

  ctx.bezierCurveTo(
    size * 0.5,
    -size * 0.8,
    size * 1.1,
    -size * 0.8,
    size,
    0
  );

  ctx.bezierCurveTo(
    size * 0.7,
    size * 0.8,
    size * 0.2,
    size * 0.8,
    0,
    0
  );

  ctx.fillStyle = "#198052";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.strokeStyle = DARK_GREEN;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

function drawDecorativeBorder(ctx) {
  for (let y = 125; y < HEIGHT - 100; y += 85) {
    drawLeaf(ctx, 68, y, 25, -0.5);
    drawLeaf(ctx, 1132, y, 25, 3.6);
  }

  for (let x = 125; x < WIDTH - 100; x += 85) {
    drawLeaf(ctx, x, 70, 23, 0.5);
    drawLeaf(ctx, x, HEIGHT - 65, 23, -0.5);
  }
}

function drawLogo(ctx, x, y) {
  ctx.save();

  ctx.beginPath();
  ctx.arc(x, y, 36, 0, Math.PI * 2);
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.beginPath();

  ctx.moveTo(x - 12, y + 17);

  ctx.quadraticCurveTo(
    x - 24,
    y - 13,
    x + 13,
    y - 23
  );

  ctx.quadraticCurveTo(
    x + 22,
    y + 4,
    x - 12,
    y + 17
  );

  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - 12, y + 17);
  ctx.lineTo(x + 12, y - 17);
  ctx.stroke();

  ctx.restore();
}

function drawScanIcon(ctx, x, y) {
  const size = 45;

  ctx.save();

  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 4;

  const corners = [
    [0, 0, 1, 1],
    [size, 0, -1, 1],
    [0, size, 1, -1],
    [size, size, -1, -1],
  ];

  corners.forEach(([cx, cy, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(x + cx + dx * 12, y + cy);
    ctx.lineTo(x + cx, y + cy);
    ctx.lineTo(x + cx, y + cy + dy * 12);
    ctx.stroke();
  });

  roundedRect(ctx, x + 14, y + 8, 18, 29, 4);

  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 23, y + 31, 2, 0, Math.PI * 2);
  ctx.fillStyle = GREEN;
  ctx.fill();

  ctx.restore();
}

export default function QRCodeCard({ tree }) {
  const qrRef = useRef(null);

  const url = treeUrl(tree);
  const organization = tree.organization;

  const download = () => {
    const qrCanvas = qrRef.current?.querySelector("canvas");

    if (!qrCanvas) {
      alert("QR code is not ready.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const centerX = WIDTH / 2;

    ctx.fillStyle = "#F2F1EC";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    roundedRect(
      ctx,
      45,
      45,
      WIDTH - 90,
      HEIGHT - 90,
      50
    );

    ctx.fillStyle = GREEN;
    ctx.fill();

    drawDecorativeBorder(ctx);

    roundedRect(
      ctx,
      105,
      105,
      WIDTH - 210,
      HEIGHT - 210,
      42
    );

    ctx.fillStyle = WHITE;
    ctx.fill();

    drawLogo(ctx, 270, 195);

    centerText(
      ctx,
      organization?.name || "",
      centerX + 35,
      175,
      "900 43px Arial",
      DARK_GREEN,
      650
    );

    centerText(
      ctx,
      organization?.initiativeName || "",
      centerX + 35,
      222,
      "900 38px Arial",
      DARK_GREEN,
      650
    );

    const qrDisplaySize = 620;
    const qrX = centerX - qrDisplaySize / 2;
    const qrY = 260;

    ctx.drawImage(
      qrCanvas,
      qrX,
      qrY,
      qrDisplaySize,
      qrDisplaySize
    );

    const dividerY = 945;

    ctx.beginPath();
    ctx.moveTo(220, dividerY);
    ctx.lineTo(980, dividerY);

    ctx.strokeStyle = "#789987";
    ctx.lineWidth = 2;
    ctx.stroke();

    centerText(
      ctx,
      "Tree Name:",
      centerX,
      990,
      "900 32px Arial",
      DARK_GREEN
    );

    const localName = tree.localName || tree.commonName;

    const displayName = `${localName} - ${tree.scientificName}`;

    centerText(
      ctx,
      displayName,
      centerX,
      1040,
      "900 36px Arial",
      DARK_GREEN,
      880
    );

    centerText(
      ctx,
      `Tree No: ${tree.treeNumber || tree.id}`,
      centerX,
      1095,
      "bold 32px Arial",
      TEXT_GRAY
    );

    drawScanIcon(ctx, 375, 1135);

    centerText(
      ctx,
      "Scan to know more",
      centerX + 30,
      1158,
      "900 29px Arial",
      DARK_GREEN
    );

    const footerText = `${organization?.totalTrees || 0} TREES — ${
      organization?.projectName || ""
    }`;

    centerText(
      ctx,
      footerText,
      centerX,
      1290,
      "900 23px Arial",
      DARK_GREEN,
      900
    );

    const link = document.createElement("a");

    link.download = `${tree.treeNumber || tree.id}-${tree.slug}-qr-card.png`;

    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  return (
    <article className="flex flex-col items-center rounded-3xl bg-white p-5 text-center shadow-md shadow-forest/10 ring-1 ring-forest/5">
      <h2 className="text-xl font-black text-forest">
        {tree.commonName}
      </h2>

      <p className="font-bold text-ink/60">
        Tree No: {tree.treeNumber || tree.id}
      </p>

      <p className="mt-2 break-all text-sm font-semibold text-ink/70">
        {url}
      </p>

      <div
        ref={qrRef}
        className="my-5 rounded-2xl border border-forest/10 bg-white p-3"
      >
        <QRCodeCanvas
          value={url}
          size={QR_SIZE}
          level="H"
          marginSize={4}
          bgColor="#FFFFFF"
          fgColor="#000000"
          style={{
            width: 200,
            height: 200,
          }}
          aria-label={`QR code for ${tree.commonName}`}
        />
      </div>

      <button
        type="button"
        onClick={download}
        className="min-h-12 w-full rounded-full bg-forest px-5 font-black text-white transition-colors hover:bg-moss"
      >
        Download QR Card
      </button>
    </article>
  );
}