"use client";

import { useState, useEffect } from 'react';
import { Galaxy } from '@/components/3d/Galaxy';
import { ProjectPanel } from '@/components/ui/ProjectPanel';
import { HUD } from '@/components/ui/HUD';
import { fetchGithubProjects } from '@/services/github';
import { ProjectStar } from '@/types/universe';

export default function Home() {
  const [stars, setStars] = useState<ProjectStar[]>([]);
  const [selectedStar, setSelectedStar] = useState<ProjectStar | null>(null);

  useEffect(() => {
    fetchGithubProjects().then(setStars);
  }, []);

  const handleOpenProfile = () => {
    const coreStar = stars.find(star => star.id === 'profile-core');
    if (coreStar) {
      setSelectedStar(coreStar);
    }
  };

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden">
      
      <HUD onOpenProfile={handleOpenProfile} />
      
      <Galaxy 
        starsData={stars} 
        onStarClick={setSelectedStar} 
      />
      
      <ProjectPanel 
        star={selectedStar} 
        onClose={() => setSelectedStar(null)} 
      />

    </main>
  );
}