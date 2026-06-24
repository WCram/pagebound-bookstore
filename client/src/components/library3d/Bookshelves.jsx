import BookcaseUnit from "./BookcaseUnit";
import {
  AISLE_GAP,
  BOOK_WIDTH,
  BOOKS_PER_SHELF_ROW,
  GAP,
  GRID_COLUMNS,
  ROW_GAP,
  SHELF_DEPTH,
  SHELF_SPACING,
} from "./constants";

const MIN_SHELF_WIDTH = 3;
const FLOOR_COLOR = "#3a2c20";

export default function Bookshelves({ booksByCategory }) {
  const categories = Object.keys(booksByCategory);

  const shelfWidth = Math.max(
    MIN_SHELF_WIDTH,
    ...categories.map((c) => {
      const perRow = Math.min(booksByCategory[c].length, BOOKS_PER_SHELF_ROW);
      return perRow * (BOOK_WIDTH + GAP) - GAP + 0.6;
    })
  );

  const maxRows = Math.max(
    ...categories.map((c) => Math.ceil(booksByCategory[c].length / BOOKS_PER_SHELF_ROW))
  );
  const caseHeight = maxRows * SHELF_SPACING + 0.9;

  const columns = Math.min(GRID_COLUMNS, categories.length);
  const gridRows = Math.ceil(categories.length / columns);
  const spacingX = shelfWidth + AISLE_GAP;
  const spacingZ = SHELF_DEPTH + ROW_GAP;
  const startX = -((columns - 1) * spacingX) / 2;
  const startZ = -((gridRows - 1) * spacingZ) / 2;

  const floorWidth = columns * spacingX + 4;
  const floorDepth = gridRows * spacingZ + 4;

  return (
    <group>
      <mesh
        position={[0, -caseHeight / 2 - 0.3, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[floorWidth, floorDepth]} />
        <meshStandardMaterial color={FLOOR_COLOR} roughness={0.95} />
      </mesh>

      {categories.map((category, i) => {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const x = startX + col * spacingX;
        const z = startZ + row * spacingZ;
        return (
          <group key={category} position={[x, 0, z]}>
            <BookcaseUnit
              category={category}
              books={booksByCategory[category]}
              shelfWidth={shelfWidth}
              caseHeight={caseHeight}
            />
          </group>
        );
      })}
    </group>
  );
}
