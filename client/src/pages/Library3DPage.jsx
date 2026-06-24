import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { getBooks } from "../api/client";
import Bookshelves from "../components/library3d/Bookshelves";
import WalkControls from "../components/library3d/WalkControls";

const HDRI_PATH = "https://raw.githubusercontent.com/pmndrs/drei-assets/master/hdri/";
const HDRI_FILE = "st_fagans_interior_1k.hdr";

function groupByCategory(books) {
  const grouped = {};
  for (const book of books) {
    const key = book.category || "Uncategorized";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(book);
  }
  return grouped;
}

export default function Library3DPage() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [lightIntensity, setLightIntensity] = useState(1.1);
  const [mode, setMode] = useState("orbit");

  useEffect(() => {
    getBooks().then(setBooks).catch((err) => setError(err.message));
  }, []);

  const booksByCategory = useMemo(() => groupByCategory(books), [books]);

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="library-3d-page">
      <h1>3D Library</h1>
      <p className="library-3d-hint">
        {mode === "walk"
          ? "Click the scene to look around, WASD to walk, click a book to add it to your cart, Esc to release the cursor."
          : "Drag to look around, scroll to zoom, click a book to add it to your cart."}
      </p>
      <div className="library-3d-controls">
        <div className="library-3d-mode-toggle">
          <button
            className={mode === "orbit" ? "active" : ""}
            onClick={() => setMode("orbit")}
          >
            Orbit View
          </button>
          <button className={mode === "walk" ? "active" : ""} onClick={() => setMode("walk")}>
            Walk Mode
          </button>
        </div>
        <label htmlFor="lighting-slider">Lighting</label>
        <input
          id="lighting-slider"
          type="range"
          min="0.2"
          max="3"
          step="0.1"
          value={lightIntensity}
          onChange={(e) => setLightIntensity(Number(e.target.value))}
        />
        <span className="library-3d-controls-value">{lightIntensity.toFixed(1)}</span>
      </div>
      <div className="library-3d-canvas-wrap">
        {books.length > 0 && (
          <Canvas shadows camera={{ position: [0, 7, 28], fov: 55 }}>
            <ambientLight intensity={0.45 * lightIntensity} />
            <directionalLight
              position={[6, 8, 8]}
              intensity={1.1 * lightIntensity}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <directionalLight position={[-6, -3, 4]} intensity={0.25 * lightIntensity} />
            <Suspense fallback={null}>
              <Environment files={HDRI_FILE} path={HDRI_PATH} background blur={0.5} />
              <Bookshelves booksByCategory={booksByCategory} />
            </Suspense>
            {mode === "orbit" && <OrbitControls enablePan minDistance={5} maxDistance={70} />}
            <WalkControls active={mode === "walk"} />
          </Canvas>
        )}
        {mode === "walk" && <div className="library-3d-crosshair" />}
      </div>
    </div>
  );
}
