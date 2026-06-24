import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data");

const locks = new Map();

function withLock(file, fn) {
  const prev = locks.get(file) || Promise.resolve();
  const next = prev.then(fn, fn).finally(() => {
    if (locks.get(file) === next) locks.delete(file);
  });
  locks.set(file, next);
  return next;
}

export async function readData(filename) {
  const filePath = path.join(dataDir, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export function writeData(filename, data) {
  return withLock(filename, () => writeFile(filename, data));
}

export function updateData(filename, mutateFn) {
  return withLock(filename, async () => {
    const data = await readData(filename);
    const result = await mutateFn(data);
    await writeFile(filename, data);
    return result;
  });
}

async function writeFile(filename, data) {
  const filePath = path.join(dataDir, filename);
  const tmpPath = `${filePath}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmpPath, filePath);
}
