import { useRef, useState } from "react";
import { useTexture, Text } from "@react-three/drei";
import { useCart } from "../../context/CartContext";

export default function Book({ book, position }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const texture = useTexture(book.coverUrl);
  const timeoutRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    if (book.stock <= 0) {
      setFeedback("Out of stock");
    } else {
      addItem(book, 1);
      setFeedback("Added to cart");
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback(null), 1200);
  };

  return (
    <group position={position}>
      <mesh
        scale={hovered ? [1.1, 1.1, 1.3] : [1, 1, 1]}
        castShadow
        receiveShadow
        userData={{ activate: handleClick }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        onClick={handleClick}
      >
        <boxGeometry args={[0.9, 1.3, 0.18]} />
        <meshStandardMaterial attach="material-0" color="#3a2c20" />
        <meshStandardMaterial attach="material-1" color="#3a2c20" />
        <meshStandardMaterial attach="material-2" color="#3a2c20" />
        <meshStandardMaterial attach="material-3" color="#3a2c20" />
        <meshStandardMaterial attach="material-4" map={texture} />
        <meshStandardMaterial attach="material-5" color="#2a1f17" />
      </mesh>
      {feedback && (
        <Text
          position={[0, 0.95, 0.3]}
          fontSize={0.16}
          color={feedback === "Out of stock" ? "#c0392b" : "#2f7a5e"}
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.01}
          outlineColor="#ffffff"
        >
          {feedback}
        </Text>
      )}
    </group>
  );
}
