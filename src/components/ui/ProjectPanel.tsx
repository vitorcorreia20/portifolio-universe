// src/components/ui/ProjectPanel.tsx
"use client";

import { ProjectStar } from '@/types/universe';
import { X, ExternalLink, Terminal } from 'lucide-react';

interface ProjectPanelProps {
  star: ProjectStar | null;
  onClose: () => void;
}

export function ProjectPanel({ star, onClose }: ProjectPanelProps) {
  if (!star) return null;

  return (
    <>
      {/* Camada invisível no fundo para fechar ao clicar fora */}
      <div 
        className="fixed inset-0 z-40 cursor-pointer" 
        onClick={onClose} 
      />

      {/* O Painel Lateral (HUD) - De volta para a DIREITA */}
      <div className="fixed top-0 right-0 h-screen w-full max-w-[400px] bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-gray-800 p-8 z-50 text-white shadow-2xl flex flex-col animate-in slide-in-from-right-8 duration-300">
        
        {/* Botão de Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Cabeçalho do Projeto */}
        <div className="mt-12 mb-6">
          <div className="flex items-center gap-2 text-sm text-[#007ACC] font-mono mb-2">
            <Terminal size={16} />
            <span>{star.language}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight capitalize">{star.name.replace(/-/g, ' ')}</h2>
        </div>

        {/* Descrição */}
        <div className="text-gray-300 leading-relaxed mb-8 flex-grow">
          {star.description ? (
            <p>{star.description}</p>
          ) : (
            <p className="italic text-gray-500">// Nenhuma descrição fornecida nos logs do sistema.</p>
          )}
        </div>

        {/* Métricas do Back-end */}
        <div className="grid grid-cols-2 gap-4 mb-8 font-mono text-sm">
          <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
            <span className="block text-gray-500 mb-1">Magnitude</span>
            <span className="text-xl text-white">{(star.size * 1000).toFixed(0)} mb</span>
          </div>
          <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
            <span className="block text-gray-500 mb-1">Brilho</span>
            <span className="text-xl text-white animate-pulse">{(star.brightness - 1).toFixed(1)}</span>
          </div>
        </div>

        {/* Botão de Ação */}
        <a 
          href={star.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white text-black py-3 rounded-md font-bold hover:bg-gray-200 transition-colors mt-auto"
        >
          <ExternalLink size={20} />
          Acessar Repositório
        </a>
      </div>
    </>
  );
}