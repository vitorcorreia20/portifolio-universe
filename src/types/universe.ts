// src/types/universe.ts

export type TechLanguage = 'TypeScript' | 'JavaScript' | 'Java' | 'Python' | 'SQL' | 'HTML' | 'CSS' | 'PHP' | 'C#' |'Other';

export interface StarCoordinates {
  x: number;
  y: number;
  z: number;
}

export interface ProjectStar {
  id: string;
  name: string;
  description: string | null;
  url: string;
  language: TechLanguage;
  size: number;       
  brightness: number; 
  coordinates: StarCoordinates;
}