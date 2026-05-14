"use client";

import { useEffect, useState } from 'react';
import { ProjectStar } from '@/types/universe';
import { X, ExternalLink, Terminal, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchRepoReadme } from '@/services/github';
import rehypeRaw from 'rehype-raw';

interface ProjectPanelProps {
  star: ProjectStar | null;
  onClose: () => void;
}

export function ProjectPanel({ star, onClose }: ProjectPanelProps) {
  const [readme, setReadme] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (star) {
      setLoading(true);
      setReadme(""); 
      
      const repoName = star.id === 'profile-core' ? 'vitorcorreia20' : star.name;
      
      fetchRepoReadme('vitorcorreia20', repoName).then(content => {
        setReadme(content);
        setLoading(false);
      });
    }
  }, [star]);

  if (!star) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 cursor-pointer" onClick={onClose} />

      <div className="fixed top-0 right-0 h-screen w-full max-w-[550px] bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-[#007ACC]/30 p-0 z-50 text-white shadow-2xl flex flex-col animate-in slide-in-from-right-8 duration-300">
        
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#007ACC]/20 rounded-lg">
              <Terminal size={20} className="text-[#007ACC]" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight uppercase tracking-widest text-gray-200">
                {star.id === 'profile-core' ? "System_Profile" : "Project_Data"}
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
          
          <div className="mb-8">
            <span className="text-[#007ACC] font-mono text-xs mb-2 block">{'>'} source_path: {star.url}</span>
            <h1 className="text-4xl font-extrabold mb-4">{star.name.replace(/-/g, ' ')}</h1>
          </div>

          <div className="prose prose-invert max-w-none prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-headings:text-[#007ACC]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p className="font-mono">Decrypting README.md...</p>
              </div>
            ) : readme ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]} 
              >
                {readme}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-400 leading-relaxed text-lg">
                {star.description || "// No extended documentation available for this sector."}
              </p>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-800 bg-black/40">
          <a 
            href={star.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#007ACC] hover:bg-[#005fa3] text-white py-4 rounded-lg font-bold transition-all shadow-lg shadow-[#007ACC]/20"
          >
            <ExternalLink size={20} />
            OPEN REPOSITORY ON GITHUB
          </a>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #007ACC; }
      `}</style>
    </>
  );
}