// Change this to your real domain before generating/printing QR codes.
// You can also set VITE_BASE_URL in a .env file (see README).
export const BASE_URL = (
  import.meta.env.VITE_BASE_URL || "https://tree-info-vip.vercel.app/"
).replace(/\/$/, "");

export const PROJECT_NAME = "Tree Information Project";

export const treeUrl = (tree) => `${BASE_URL}/tree/${tree.slug}`;
