import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Dot = ({ position }) => {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const baseRadius = 0.05;
  const maxRadius = 0.2;

  // Handle hover size change
  useFrame((state) => {
    const { mouse } = state;
    const distance = mesh.current.position.distanceTo(new THREE.Vector3(mouse.x * 10, mouse.y * 10, 0));
    const scale = THREE.MathUtils.lerp(baseRadius, maxRadius, Math.max(0, 1 - distance / 5));
    mesh.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={mesh} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial color={hovered ? 'lightblue' : '#ffffff'} />
    </mesh>
  );
};

const DotsGrid = () => {
  const { size, camera } = useThree();
  const spacing = 0.7;

  // Calculate the visible area in world units
  const aspect = size.width / size.height;
  const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
  const visibleWidth = visibleHeight * aspect;

  const numRows = Math.ceil(visibleHeight / spacing);
  const numCols = Math.ceil(visibleWidth / spacing);

  // Generate positions for the grid of dots
  const positions = [];
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      positions.push([col * spacing - visibleWidth / 2, row * spacing - visibleHeight / 2, 0]);
    }
  }

  return (
    <>
      {positions.map((pos, idx) => (
        <Dot key={idx} position={pos} />
      ))}
    </>
  );
};

const DotCanvas = () => {
  return (
    <Canvas className="w-full h-full" camera={{ position: [0, 0, 20], fov: 30 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <DotsGrid />
    </Canvas>
  );
};

export default DotCanvas;
