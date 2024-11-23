import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, Mesh, Vector3 } from 'three';
import { gsap } from 'gsap';
import { MeshWobbleMaterial } from '@react-three/drei';

interface BlanketModelProps {
  scrollProgress: number;
}

const BlanketModel: React.FC<BlanketModelProps> = ({ scrollProgress }) => {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, '/Subject 3.png');
  const hoverPos = useRef(new Vector3(0, 0, 0));
  const initialPos = useRef(new Vector3(0, 0, 0));

  useEffect(() => {
    if (meshRef.current) {
      initialPos.current = meshRef.current.position.clone();
      
      // Initial animation
      gsap.from(meshRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power2.out"
      });
      
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      });
    }
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        z: scrollProgress * 2,
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(meshRef.current.rotation, {
        y: scrollProgress * Math.PI / 2,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [scrollProgress]);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = initialPos.current.y + Math.sin(state.clock.getElapsedTime()) * 0.1;
      
      // Gentle rotation
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  const handlePointerOver = () => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handlePointerOut = () => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry args={[2, 2, 32, 32]} />
      <MeshWobbleMaterial 
        map={texture}
        factor={0.4}
        speed={0.5}
        transparent
        opacity={0.9}
        metalness={0.5}
        roughness={0.5}
        envMapIntensity={1}
      />
    </mesh>
  );
};

export default BlanketModel;
