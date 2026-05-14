// src/services/github.ts
import { ProjectStar, TechLanguage } from '@/types/universe';

// Aumentamos os valores aqui para "esticar" a galáxia
function generateSpiralCoordinates(index: number) {
  // Aumentamos a distância inicial (5) e o multiplicador de distância entre estrelas (2.5)
  const radius = 8 + (index * 2.5); 
  
  // Ângulo para criar o braço da espiral
  const angle = index * 0.7; 
  
  return {
    x: Math.cos(angle) * radius,
    y: (Math.random() - 0.5) * 2, // Uma leve flutuação vertical para dar profundidade 3D
    z: Math.sin(angle) * radius,
  };
}

export async function fetchGithubProjects(): Promise<ProjectStar[]> {
  const username = 'vitorcorreia20'; // Forçado conforme seu pedido
  
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) return [];

  const repos = await res.json();

  // 1. Mapeia os repositórios (Estrelas da periferia)
  const stars: ProjectStar[] = repos
    .filter((repo: any) => !repo.fork && repo.name !== username) // Remove forks e o próprio repo do profile da lista comum
    .map((repo: any, index: number) => {
      const lang: TechLanguage = repo.language || 'Other';
      
      return {
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: lang,
        size: 0.6 + (repo.size / 20000), // Estrelas menores que o núcleo
        brightness: 0.8,
        coordinates: generateSpiralCoordinates(index),
      };
    });

  // 2. O NÚCLEO: Vitor Correia Profile
  const profileCore: ProjectStar = {
    id: 'profile-core',
    name: 'VITOR_CORREIA (CORE)',
    description: 'Acessando dados mestre... Este é o repositório principal de perfil. Contém a biografia, competências técnicas e o mapa completo do universo.',
    url: `https://github.com/${username}/${username}`, // Link direto para o Profile Readme
    language: 'Other',
    size: 5.0, // Massa crítica maior
    brightness: 8, // O ponto mais brilhante
    coordinates: { x: 0, y: 0, z: 0 }, // Centro do universo
  };

  return [profileCore, ...stars];
}

export async function fetchRepoReadme(username: string, repo: string): Promise<string> {
  // Tentamos buscar o README da branch 'main' ou 'master'
  const branches = ['main', 'master'];
  
  for (const branch of branches) {
    const res = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/${branch}/README.md`);
    if (res.ok) return await res.text();
  }
  
  return "";
}