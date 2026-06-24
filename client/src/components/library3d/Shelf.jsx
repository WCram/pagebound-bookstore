import Book from "./Book";
import { BOOK_WIDTH, GAP, SHELF_DEPTH } from "./constants";

export default function Shelf({ books, y, shelfWidth }) {
  const totalWidth = books.length * (BOOK_WIDTH + GAP) - GAP;
  const startX = -totalWidth / 2 + BOOK_WIDTH / 2;

  return (
    <group position={[0, y, 0]}>
      <mesh position={[0, -0.72, 0]} receiveShadow castShadow>
        <boxGeometry args={[shelfWidth + 0.5, 0.1, SHELF_DEPTH]} />
        <meshStandardMaterial color="#6b4a32" roughness={0.7} />
      </mesh>
      {books.map((book, i) => (
        <Book key={book.id} book={book} position={[startX + i * (BOOK_WIDTH + GAP), 0, 0]} />
      ))}
    </group>
  );
}
