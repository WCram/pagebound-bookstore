# Bookstore

A simple full-stack bookstore site: browse a catalog, add books to a cart, check out (mock — no real payment), and manage the catalog from an admin page. Data is stored in local JSON files under `server/data/`.

## Stack

- `server/` — Node.js + Express API, JSON file storage
- `client/` — React (Vite), React Router, cart persisted to localStorage

## Running locally

From the project root:

```bash
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
npm run dev
```

This starts the API on `http://localhost:4000` and the frontend on `http://localhost:5173`.

Or run them separately in two terminals:

```bash
cd server && npm run dev
cd client && npm run dev
```

## Features

- Catalog browsing with search and category filter
- Book detail pages with separate buy and borrow sections
- Shopping cart (persisted in the browser) and mock checkout (records an order, decrements stock — no real payment)
- Library borrowing: a separate "borrow bag" and checkout flow that creates 14-day loans against a book's library copy pool, independent of purchase stock
- Admin pages (`/admin`) to manage books (including purchase stock and library copies) and (`/admin/loans`) to view and return active loans
