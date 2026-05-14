// src/app/page.tsx
import { fetchGithubProjects } from '@/services/github';
import { PortfolioClient } from '@/components/PortfolioClient';

export default async function Home() {
  const myProjects = await fetchGithubProjects();

  return (
    // Tiramos o flex daqui para o Canvas dominar o fundo absoluto
    <main className="relative w-full h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* Camada 1: O 3D (Recebe os cliques normais) */}
      <PortfolioClient starsData={myProjects} />
      
      {/* Camada 2: O Texto (pointer-events-none garante que o mouse "atravesse" o texto) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center font-mono space-y-4 select-none">
          <p className="text-gray-400">// GITHUB DATA SYNCED</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-xl">
            VITOR_<span className="text-[#007ACC]">CORREIA</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto">
            Clique e arraste para explorar. Selecione uma estrela para ver os logs.
          </p>
        </div>
      </div>
      
    </main>
  );
}