// src/components/3d/Galaxy.tsx
"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Star } from './Star';
import { ProjectStar } from '@/types/universe';

interface GalaxyProps {
  starsData: ProjectStar[];
  onStarClick?: (star: ProjectStar) => void;
}

export function Galaxy({ starsData, onStarClick }: GalaxyProps) {
  return (
    // AJUSTE CRÍTICO AQUI: fixed inset-0 w-screen h-screen garante que o Canvas ocupe a viewport inteira
    <div className="fixed inset-0 z-0 w-screen h-screen cursor-grab active:cursor-grabbing">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 60 }} // Afastamos um pouco a câmera padrão
        gl={{ antialias: true }} // Garante bordas suaves nas esferas
        dpr={[1, 2]} // Suporte para telas Retina/High-DPI
      >
        {/* Iluminação dramática */}
        <ambientLight intensity={0.2} />
        <pointLight position={[20, 20, 20]} intensity={3} color="#ffffff" />
        <pointLight position={[-20, -20, -20]} intensity={1} color="#007ACC" />
        
        {/* Fundo estrelado denso */}
        <Stars radius={100} depth={50} count={10000} factor={6} saturation={0} fade speed={1} />
        
        {/* Controles de câmera - enablePan=false impede o usuário de "fugir" do centro */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minDistance={5} // Zoom máximo
          maxDistance={50} // Zoom mínimo
        />
        
        {/* Renderizando nossos projetos */}
        {starsData.map((star) => (
          <Star key={star.id} data={star} onStarClick={onStarClick} />
        ))}
      </Canvas>
    </div>
  );
}