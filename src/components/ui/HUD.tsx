// src/components/ui/HUD.tsx
"use client";

import { Mail, FileText, User, Orbit } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface HUDProps {
  onOpenProfile: () => void;
}

export function HUD({ onOpenProfile }: HUDProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-6 md:p-8">
      
      {/* ================= CABEÇALHO ================= */}
      <div className="flex justify-between items-start">
        
        {/* Painel de Identidade (Vidro Fosco) */}
        <div className="pointer-events-auto flex flex-col gap-1 p-5 md:px-6 md:py-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            {/* Indicador de Status "Online" */}
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <h1 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-[0.2em] uppercase">
              Vitor Correia
            </h1>
          </div>
          <span className="text-[#007ACC] font-mono text-xs md:text-sm pl-6 tracking-wider">
            {'>'} INITIALIZING_DEVELOPER...
          </span>
        </div>

        {/* Botão de Ação Principal (Core) */}
        <button
          onClick={onOpenProfile}
          className="pointer-events-auto group flex items-center gap-3 bg-[#007ACC]/10 hover:bg-[#007ACC]/30 border border-[#007ACC]/40 hover:border-[#007ACC] text-white px-6 py-4 rounded-2xl backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(0,122,204,0.15)] hover:shadow-[0_0_30px_rgba(0,122,204,0.5)]"
        >
          <User size={20} className="text-[#007ACC] group-hover:scale-110 transition-transform duration-300" />
          <span className="hidden sm:inline font-mono font-bold tracking-widest text-sm">ACCESS_CORE</span>
        </button>
      </div>


      {/* ================= RODAPÉ ================= */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center sm:items-end gap-6">
        
        {/* Instrução Visual Elegante */}
        <div className="pointer-events-auto flex items-center gap-3 px-5 py-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-full shadow-xl">
          <Orbit className="text-[#007ACC] animate-[spin_4s_linear_infinite]" size={18} />
          <span className="text-gray-300 font-mono text-xs uppercase tracking-widest opacity-80">
            Arraste para navegar
          </span>
        </div>

        {/* Painel de Redes Sociais Integrado */}
        <div className="pointer-events-auto flex items-center gap-2 p-2 md:p-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-full shadow-xl">
          <SocialLink href="https://github.com/vitorcorreia20" icon={<FaGithub size={22} />} title="GitHub" />
          {/* ATENÇÃO: Atualize os links abaixo com os seus dados reais */}
          <SocialLink href="https://linkedin.com/in/vitordossantoscorreia" icon={<FaLinkedin size={22} />} title="LinkedIn" />
          <SocialLink href="mailto:contato.vitorcorreiadm@gmail.com" icon={<Mail size={22} />} title="Email" />
          
          <div className="w-[1px] h-6 bg-white/20 mx-2 hidden sm:block"></div>
          
          <SocialLink href="/curriculo.pdf" icon={<FileText size={22} />} title="Currículo PDF" special />
        </div>
      </div>

    </div>
  );
}

// Componente auxiliar para deixar o código dos botões sociais mais limpo
function SocialLink({ href, icon, title, special = false }: { href: string, icon: React.ReactNode, title: string, special?: boolean }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      title={title}
      className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 
        ${special 
          ? 'bg-[#007ACC]/20 text-[#007ACC] hover:bg-[#007ACC] hover:text-white border border-[#007ACC]/50' 
          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20'
        }`}
    >
      {icon}
    </a>
  );
}