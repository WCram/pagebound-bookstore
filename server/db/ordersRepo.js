import { readData, updateData } from "./jsonStore.js";

const FILE = "orders.json";

export async function getAll() {
  const orders = await readData(FILE);
  return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function create(order) {
  return updateData(FILE, (orders) => {
    const newOrder = {
      ...order,
      id: crypto.randomUUID(),
      status: "placed",
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    return newOrder;
  });
}
