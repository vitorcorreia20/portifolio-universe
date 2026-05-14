"use client";

import { useState } from 'react';
import { ProjectStar } from '@/types/universe';
import { Galaxy } from '@/components/3d/Galaxy';
import { ProjectPanel } from '@/components/ui/ProjectPanel';

interface PortfolioClientProps {
  starsData: ProjectStar[];
}

export function PortfolioClient({ starsData }: PortfolioClientProps) {
  const [selectedStar, setSelectedStar] = useState<ProjectStar | null>(null);

  return (
    <>
      <Galaxy starsData={starsData} onStarClick={(star) => setSelectedStar(star)} />
      
      <ProjectPanel star={selectedStar} onClose={() => setSelectedStar(null)} />
    </>
  );
}