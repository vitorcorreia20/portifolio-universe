"use client";

import { useState, useEffect } from 'react';
import { Galaxy } from '@/components/3d/Galaxy';
import { ProjectPanel } from '@/components/ui/ProjectPanel';
import { HUD } from '@/components/ui/HUD'; // <-- 1. IMPORTAR A HUD
import { fetchGithubProjects } from '@/services/github';
import { ProjectStar } from '@/types/universe';

export default function Home() {
  const [stars, setStars] = useState<ProjectStar[]>([]);
  const [selectedStar, setSelectedStar] = useState<ProjectStar | null>(null);

  useEffect(() => {
    fetchGithubProjects().then(setStars);
  }, []);

  // <-- 2. ADICIONAR ESTA FUNÇÃO AQUI DENTRO
  const handleOpenProfile = () => {
    // Procura na lista de estrelas aquela que é o seu núcleo (vitorcorreia20)
    const coreStar = stars.find(star => star.id === 'profile-core');
    if (coreStar) {
      setSelectedStar(coreStar);
    }
  };

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden">
      
      {/* 3. ADICIONAR A HUD AQUI (Acima da Galáxia) */}
      <HUD onOpenProfile={handleOpenProfile} />
      
      {/* A Galáxia que já estava aí */}
      <Galaxy 
        starsData={stars} 
        onStarClick={setSelectedStar} 
      />
      
      {/* O Painel que já estava aí */}
      <ProjectPanel 
        star={selectedStar} 
        onClose={() => setSelectedStar(null)} 
      />

    </main>
  );
}