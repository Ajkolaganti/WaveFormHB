import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Stars, Float, PerspectiveCamera, Effects } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import BlanketModel from './BlanketModel';
import ParticleField from './ParticleField';
import GlowingRing from './GlowingRing';

const Scene: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollPosition / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Canvas style={{ height: '100vh' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />
        <ParticleField />
        
        <Float
          speed={1.5}
          rotationIntensity={0.2}
          floatIntensity={0.3}
        >
          <BlanketModel scrollProgress={scrollProgress} />
        </Float>

        <GlowingRing />

        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow
        />
        <spotLight 
          position={[-10, -10, -10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.5} 
          color="#3498DB"
        />
        <pointLight
          position={[0, 0, 3]}
          intensity={0.8}
          color="#3498DB"
        />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default Scene;
