
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function WavePlane() {
  const ref = useRef();
  const { mouse, viewport } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Mouse-based influence
      const mx = mouse.x * viewport.width;
      const my = mouse.y * viewport.height;
      const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
      const influence = Math.exp(-dist * 5.0); // falloff effect

      const wave =
        0.5 * Math.sin(y * 3 + t * 3) +
        0.4 * Math.cos(x * 5 + t * 2) +
        0.2 * Math.sin(dist * 10 - t * 4) * influence;

      pos.setZ(i, wave);
    }

    pos.needsUpdate = true;
    ref.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10, 100, 100]} />
      <meshStandardMaterial color="#0af" wireframe />
    </mesh>
  );
}

export default function Dither() {
  return (
    <Canvas
      camera={{ position: [0, 3, 5], fov: 75 }}
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0, 
        pointerEvents: 'none'
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <WavePlane />
    </Canvas>
  );
}
