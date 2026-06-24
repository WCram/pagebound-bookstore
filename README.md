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
- A walkable 3D library view (`/library-3d`) built with react-three-fiber — orbit or first-person walk mode, click a book to add it to your cart

## Deploying

The app is set up to run as a single web service: `npm run build` builds the React app into `client/dist`, and `npm start` runs the Express server, which serves that built frontend plus the `/api/*` routes from one process (no separate frontend host, no CORS).

On [Render](https://render.com): create a new Web Service from this repo (a `render.yaml` blueprint is included, or set Build Command to `npm run build` and Start Command to `npm start` manually). On Render's free tier, `server/data/*.json` and generated covers reset on redeploy/sleep since there's no persistent disk — upgrade to a paid plan and attach a disk mounted at `server/data` (and `server/public/covers`) to keep data across deploys.
