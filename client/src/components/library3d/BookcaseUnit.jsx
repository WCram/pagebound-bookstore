import { Text } from "@react-three/drei";
import Shelf from "./Shelf";
import BookcaseFrame from "./BookcaseFrame";
import { BOOKS_PER_SHELF_ROW, SHELF_SPACING } from "./constants";

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function BookcaseUnit({ category, books, shelfWidth, caseHeight }) {
  const rows = chunk(books, BOOKS_PER_SHELF_ROW);
  const startY = ((rows.length - 1) * SHELF_SPACING) / 2;

  return (
    <group>
      <BookcaseFrame width={shelfWidth} height={caseHeight} />
      <Text
        position={[0, caseHeight / 2 + 0.15, 0]}
        fontSize={0.26}
        color="#3a2c20"
        anchorX="center"
        anchorY="bottom"
      >
        {category}
      </Text>
      {rows.map((rowBooks, i) => (
        <Shelf key={i} books={rowBooks} y={startY - i * SHELF_SPACING} shelfWidth={shelfWidth} />
      ))}
    </group>
  );
}
