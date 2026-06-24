import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const booksPath = path.join(__dirname, "..", "data", "books.json");
const coversDir = path.join(__dirname, "..", "public", "covers");

fs.mkdirSync(coversDir, { recursive: true });

const PALETTES = {
  Fantasy: ["#2d1b3d", "#6a3f8f"],
  "Science Fiction": ["#0b2545", "#1a6f9c"],
  Classic: ["#5c1a1a", "#a13d3d"],
  Dystopian: ["#1f1f1f", "#4a4a4a"],
  Thriller: ["#1a1a2e", "#7a1f3d"],
  "Non-Fiction": ["#2e3d1f", "#6b8e23"],
  Banned: ["#3b0a0a", "#8b0000"],
  "Staff Picks": ["#1a3c34", "#2f7a5e"],
  default: ["#2c3e50", "#34495e"],
};

function wrapTitle(title, maxChars) {
  const words = title.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildCoverSvg({ title, author, category }) {
  const [c1, c2] = PALETTES[category] || PALETTES.default;
  const width = 300;
  const height = 450;
  const titleLines = wrapTitle(title, 16);
  const fontSize = titleLines.some((l) => l.length > 14) ? 24 : 28;
  const lineHeight = fontSize + 8;
  const blockHeight = titleLines.length * lineHeight;
  const startY = height / 2 - blockHeight / 2 + fontSize / 2;
  const monogram = (author.match(/\b[A-Z]/g) || ["?"]).slice(0, 2).join("");

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="${width / 2}" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <rect x="12" y="12" width="${width - 24}" height="${height - 24}" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" />
  <rect x="18" y="18" width="${width - 36}" height="${height - 36}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
  <circle cx="${width / 2}" cy="70" r="26" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.5" />
  <text x="${width / 2}" y="78" font-family="Georgia, serif" font-size="22" fill="rgba(255,255,255,0.85)" text-anchor="middle">${escapeXml(monogram)}</text>
  <line x1="60" y1="${startY - fontSize - 14}" x2="${width - 60}" y2="${startY - fontSize - 14}" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
  <text font-family="Georgia, serif" font-size="${fontSize}" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">${titleTspans}</text>
  <line x1="60" y1="${startY + blockHeight - fontSize / 2 + 16}" x2="${width - 60}" y2="${startY + blockHeight - fontSize / 2 + 16}" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
  <text x="${width / 2}" y="${height - 36}" font-family="Georgia, serif" font-size="15" fill="rgba(255,255,255,0.85)" text-anchor="middle" font-style="italic">${escapeXml(author)}</text>
</svg>`;
}

const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
const updates = [];

for (const book of books) {
  const svg = buildCoverSvg(book);
  const filename = `${book.id}.svg`;
  fs.writeFileSync(path.join(coversDir, filename), svg, "utf-8");
  updates.push({ id: book.id, coverUrl: `/covers/${filename}` });
}

console.log(JSON.stringify(updates));
