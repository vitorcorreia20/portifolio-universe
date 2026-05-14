// src/services/github.ts

import { ProjectStar, TechLanguage } from '@/types/universe';

// Calcula a posição aleatória, mas consistente no mapa 3D
function generateRandomCoordinates(seed: number) {
  // Uma função simples para gerar posições fixas baseadas no tamanho do repo (para não piscar)
  const spread = 8;
  return {
    x: (Math.sin(seed) * spread),
    y: (Math.cos(seed * 2) * spread),
    z: (Math.sin(seed * 3) * spread) - 2, // Empurra um pouco pra trás
  };
}

export async function fetchGithubProjects(): Promise<ProjectStar[]> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'vitorcorreia20';
  
  // Como estamos testando, não usaremos o Token ainda para evitar erros, usaremos a API pública
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
  
  if (!res.ok) {
    console.error('Falha ao buscar repositórios do GitHub');
    return [];
  }

  const repos = await res.json();

  // Mapeia os dados do GitHub para a nossa tipagem "ProjectStar"
  const stars: ProjectStar[] = repos.map((repo: any) => {
    
    // Normalizando a linguagem
    const lang: TechLanguage = repo.language ? (repo.language as TechLanguage) : 'Other';

    // Calculando tamanho (size) e brilho (brightness) baseado em estrelas e tamanho em KB
    const baseSize = 0.8;
    const calculatedSize = baseSize + (repo.size / 10000); // 10000KB (10MB) aumenta a estrela em 1 ponto
    const clampedSize = Math.min(Math.max(calculatedSize, 0.5), 3); // Entre 0.5 e 3 de tamanho

    const brightness = 1 + (repo.stargazers_count * 0.2);

    return {
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: lang,
      size: clampedSize,
      brightness: brightness,
      coordinates: generateRandomCoordinates(repo.id),
    };
  });

  // Filtra forks para mostrar só projetos originais seus (opcional)
  return stars.filter((star: any) => !star.fork);
}