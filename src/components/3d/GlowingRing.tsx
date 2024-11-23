import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const GlowingRing: React.FC = () => {
  const ringRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.3;
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} scale={[2, 2, 0.1]}>
      <torusGeometry args={[1, 0.05, 16, 100]} />
      <meshStandardMaterial
        color="#3498DB"
        emissive="#3498DB"
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
};

export default GlowingRing;
