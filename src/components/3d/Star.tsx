// src/components/3d/Star.tsx
"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { ProjectStar } from '@/types/universe';

interface StarProps {
  data: ProjectStar;
  onStarClick?: (star: ProjectStar) => void;
}

export function Star({ data, onStarClick }: StarProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // O Motor da Estrela: Mantém ela girando e controla a pulsação
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
      
      // Se o mouse estiver em cima, a estrela cresce 15% suavemente
      const targetScale = hovered ? 1.15 : 1;
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale } as any, 0.1);
    }
  });

// O Dicionário de Cores
  let color = '#ffffff';

  // Regra especial para o Núcleo
  if (data.id === 'profile-core') {
    color = '#FFD700'; // Dourado Radiante
  } else {
    // Cores normais para as outras linguagens
    switch (data.language) {
      case 'TypeScript': color = '#007ACC'; break;
      case 'JavaScript': color = '#F7DF1E'; break;
      case 'Java':       color = '#ED8B00'; break;
      case 'Python':     color = '#3670A0'; break;
      case 'HTML':       color = '#E34F26'; break;
      case 'CSS':        color = '#1572B6'; break;
      case 'C#':         color = '#239120'; break;
      case 'PHP':        color = '#777BB4'; break;
    }
  }

  return (
    <mesh 
      position={[data.coordinates.x, data.coordinates.y, data.coordinates.z]} 
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        if (onStarClick) onStarClick(data);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true); // Ativa o brilho extra
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false); // Desativa o brilho extra
        document.body.style.cursor = 'auto';
      }}
    >
      <sphereGeometry args={[data.size, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        // Aumenta o brilho da luz quando o mouse passa por cima
        emissiveIntensity={hovered ? data.brightness * 2 : data.brightness} 
        roughness={0.2}
      />
    </mesh>
  );
}