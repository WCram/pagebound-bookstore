const BASE = "/api";

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export function getBooks({ q, category } = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  const qs = params.toString() ? `?${params.toString()}` : "";
  return request(`/books${qs}`);
}

export function getBook(id) {
  return request(`/books/${id}`);
}

export function createBook(book) {
  return request("/books", { method: "POST", body: JSON.stringify(book) });
}

export function updateBook(id, updates) {
  return request(`/books/${id}`, { method: "PUT", body: JSON.stringify(updates) });
}

export function deleteBook(id) {
  return request(`/books/${id}`, { method: "DELETE" });
}

export function createOrder(order) {
  return request("/orders", { method: "POST", body: JSON.stringify(order) });
}

export function getOrders() {
  return request("/orders");
}

export function createLoans(items, borrower) {
  return request("/loans", { method: "POST", body: JSON.stringify({ items, borrower }) });
}

export function getLoans() {
  return request("/loans");
}

export function returnLoan(id) {
  return request(`/loans/${id}/return`, { method: "PUT" });
}
