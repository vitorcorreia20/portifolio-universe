import { ProjectStar, TechLanguage } from '@/types/universe';

function generateSpiralCoordinates(index: number) {
  const radius = 8 + (index * 2.5); 
  
  const angle = index * 0.7; 
  
  return {
    x: Math.cos(angle) * radius,
    y: (Math.random() - 0.5) * 2,
    z: Math.sin(angle) * radius,
  };
}

export async function fetchGithubProjects(): Promise<ProjectStar[]> {
  const username = 'vitorcorreia20';
  
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) return [];

  const repos = await res.json();

  const stars: ProjectStar[] = repos
    .filter((repo: any) => !repo.fork && repo.name !== username)
    .map((repo: any, index: number) => {
      const lang: TechLanguage = repo.language || 'Other';
      
      return {
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: lang,
        size: 0.6 + (repo.size / 20000),
        brightness: 0.8,
        coordinates: generateSpiralCoordinates(index),
      };
    });

  const profileCore: ProjectStar = {
    id: 'profile-core',
    name: 'VITOR_CORREIA (CORE)',
    description: 'Acessando dados mestre... Este é o repositório principal de perfil. Contém a biografia, competências técnicas e o mapa completo do universo.',
    url: `https://github.com/${username}/${username}`,
    language: 'Other',
    size: 5.0,
    brightness: 8,
    coordinates: { x: 0, y: 0, z: 0 },
  };

  return [profileCore, ...stars];
}

export async function fetchRepoReadme(username: string, repo: string): Promise<string> {
  const branches = ['main', 'master'];
  
  for (const branch of branches) {
    const res = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/${branch}/README.md`);
    if (res.ok) return await res.text();
  }
  
  return "";
}