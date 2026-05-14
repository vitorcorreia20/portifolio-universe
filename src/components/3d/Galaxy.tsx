// src/components/3d/Galaxy.tsx
"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Star } from './Star';
import { Nebula } from './Nebula'; // 1. NOVA IMPORTAÇÃO
import { ProjectStar } from '@/types/universe';

interface GalaxyProps {
  starsData: ProjectStar[];
  onStarClick?: (star: ProjectStar) => void;
}

export function Galaxy({ starsData, onStarClick }: GalaxyProps) {
  return (
    <div className="fixed inset-0 z-0 w-screen h-screen cursor-grab active:cursor-grabbing">
      <Canvas 
        camera={{ position: [5, 30, 70], fov: 60 }} // Câmera de cima para ver a espiral inteira
        gl={{ antialias: true }} 
        dpr={[1, 2]} 
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[20, 20, 20]} intensity={3} color="#ffffff" />
        <pointLight position={[-20, -20, -20]} intensity={1} color="#007ACC" />
        
        {/* As estrelas minúsculas de fundo do universo */}
        <Stars radius={100} depth={50} count={10000} factor={6} saturation={0} fade speed={1} />
        
        {/* 2. A NOSSA NOVA NEBULOSA EM ESPIRAL */}
        <Nebula />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minDistance={5} 
          maxDistance={80} 
        />
        
        {/* Nossos projetos (Estrelas principais e Núcleo) */}
        {starsData.map((star) => (
          <Star key={star.id} data={star} onStarClick={onStarClick} />
        ))}
      </Canvas>
    </div>
  );
}