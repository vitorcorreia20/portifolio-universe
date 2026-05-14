// src/components/PortfolioClient.tsx
"use client";

import { useState } from 'react';
import { ProjectStar } from '@/types/universe';
import { Galaxy } from '@/components/3d/Galaxy';
import { ProjectPanel } from '@/components/ui/ProjectPanel';

interface PortfolioClientProps {
  starsData: ProjectStar[];
}

export function PortfolioClient({ starsData }: PortfolioClientProps) {
  // Estado que guarda a estrela clicada
  const [selectedStar, setSelectedStar] = useState<ProjectStar | null>(null);

  return (
    <>
      {/* O Motor 3D - Agora passamos a função de clique para ele */}
      <Galaxy starsData={starsData} onStarClick={(star) => setSelectedStar(star)} />
      
      {/* O Painel UI 2D - Fica por cima do 3D */}
      <ProjectPanel star={selectedStar} onClose={() => setSelectedStar(null)} />
    </>
  );
}