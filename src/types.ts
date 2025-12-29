// src/types/index.ts

export type Theme = {
  id: number;
  name: string;
  thumbnail: string;
  category?: string;
};

export type CategoryTheme = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
};

export type HowItWorksStep = {
  id: number;
  image: string;
  title: string;
};

export type Page = 'home' | 'category-themes' | 'product' | 'callback' | 'result';

export type StatusData = {
  generation_1_url?: string;
  generation_2_url?: string;
  generation_3_url?: string;
  pdf_url?: string;
  completed_at?: string;
};