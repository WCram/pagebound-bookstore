import { SHELF_DEPTH } from "./constants";

const WOOD_COLOR = "#4d3424";
const PANEL_THICKNESS = 0.18;

export default function BookcaseFrame({ width, height }) {
  const halfW = width / 2 + 0.25;
  const halfH = height / 2 + 0.25;
  const depth = SHELF_DEPTH + 0.3;

  return (
    <group>
      <mesh position={[0, 0, -depth / 2]} receiveShadow>
        <boxGeometry args={[halfW * 2, halfH * 2, PANEL_THICKNESS]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>

      <mesh position={[-halfW, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[PANEL_THICKNESS, halfH * 2, depth]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[halfW, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[PANEL_THICKNESS, halfH * 2, depth]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>

      <mesh position={[0, halfH, 0]} receiveShadow castShadow>
        <boxGeometry args={[halfW * 2, PANEL_THICKNESS, depth]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[0, -halfH, 0]} receiveShadow castShadow>
        <boxGeometry args={[halfW * 2, PANEL_THICKNESS, depth]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>
    </group>
  );
}
