import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";

const SPEED = 6;
const EYE_HEIGHT = 1.6;
const START_POSITION = [0, EYE_HEIGHT, 20];

export default function WalkControls({ active }) {
  const { camera, scene } = useThree();
  const keys = useRef({});
  const raycaster = useRef(new THREE.Raycaster());

  useEffect(() => {
    if (!active) return;
    camera.position.set(...START_POSITION);
    camera.rotation.set(0, 0, 0);
  }, [active, camera]);

  useEffect(() => {
    const down = (e) => {
      keys.current[e.code] = true;
    };
    const up = (e) => {
      keys.current[e.code] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const handleClick = () => {
      raycaster.current.setFromCamera(new THREE.Vector2(0, 0), camera);
      const intersects = raycaster.current.intersectObjects(scene.children, true);
      const hit = intersects.find((i) => i.object.userData?.activate);
      if (hit) hit.object.userData.activate({ stopPropagation: () => {} });
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [active, camera, scene]);

  useFrame((_, delta) => {
    if (!active) return;
    const k = keys.current;
    const forward = k["KeyW"] || k["ArrowUp"] ? 1 : k["KeyS"] || k["ArrowDown"] ? -1 : 0;
    const strafe = k["KeyD"] || k["ArrowRight"] ? 1 : k["KeyA"] || k["ArrowLeft"] ? -1 : 0;

    if (forward !== 0) camera.translateZ(-forward * SPEED * delta);
    if (strafe !== 0) camera.translateX(strafe * SPEED * delta);
    camera.position.y = EYE_HEIGHT;
  });

  if (!active) return null;

  return <PointerLockControls />;
}
