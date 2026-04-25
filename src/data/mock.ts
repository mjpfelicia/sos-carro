export type ServiceCategory = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export const categories: ServiceCategory[] = [
  { id: "mecanica", name: "Mecânica", icon: "Wrench", description: "Reparos no motor e suspensão" },
  { id: "eletrica", name: "Elétrica", icon: "Zap", description: "Bateria, alternador, fiação" },
  { id: "guincho", name: "Guincho", icon: "Truck", description: "Reboque 24h" },
  { id: "pneus", name: "Pneus", icon: "Disc", description: "Troca, reparo e calibragem" },
  { id: "funilaria", name: "Funilaria", icon: "Hammer", description: "Lataria e pintura" },
  { id: "vidracaria", name: "Vidraçaria", icon: "Square", description: "Para-brisas e vidros" },
  { id: "chaveiro", name: "Chaveiro", icon: "Key", description: "Chaves codificadas e abertura" },
  { id: "lavagem", name: "Estética", icon: "Sparkles", description: "Lavagem e detalhamento" },
];

export type Provider = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  priceFrom: number;
  responseTime: string;
  available: boolean;
  badge?: string;
  avatar: string;
  city: string;
  bio: string;
};

export const providers: Provider[] = [
  {
    id: "1",
    name: "Auto Mecânica Silva",
    category: "Mecânica geral",
    categoryId: "mecanica",
    rating: 4.9,
    reviewsCount: 312,
    distanceKm: 1.2,
    priceFrom: 80,
    responseTime: "~5 min",
    available: true,
    badge: "Resposta rápida",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Auto%20Silva&backgroundColor=c0392b",
    city: "São Paulo, SP",
    bio: "20 anos de experiência em mecânica automotiva. Especialistas em motores nacionais e importados.",
  },
  {
    id: "2",
    name: "Guincho 24h Express",
    category: "Guincho",
    categoryId: "guincho",
    rating: 4.8,
    reviewsCount: 528,
    distanceKm: 2.5,
    priceFrom: 150,
    responseTime: "~10 min",
    available: true,
    badge: "Mais avaliado",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Guincho%20Express&backgroundColor=e67e22",
    city: "São Paulo, SP",
    bio: "Reboque 24 horas para toda a região metropolitana. Equipamentos modernos.",
  },
  {
    id: "3",
    name: "Elétrica Volt Power",
    category: "Elétrica automotiva",
    categoryId: "eletrica",
    rating: 4.7,
    reviewsCount: 189,
    distanceKm: 3.1,
    priceFrom: 60,
    responseTime: "~15 min",
    available: true,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Volt%20Power&backgroundColor=f1c40f",
    city: "São Paulo, SP",
    bio: "Diagnóstico computadorizado, troca de bateria a domicílio e reparos elétricos.",
  },
  {
    id: "4",
    name: "Pneus & Cia",
    category: "Pneus",
    categoryId: "pneus",
    rating: 4.6,
    reviewsCount: 421,
    distanceKm: 4.8,
    priceFrom: 40,
    responseTime: "~20 min",
    available: true,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Pneus%20Cia&backgroundColor=2c3e50",
    city: "São Paulo, SP",
    bio: "Troca, reparo, alinhamento e balanceamento. Atendimento em domicílio disponível.",
  },
  {
    id: "5",
    name: "Funilaria Premium",
    category: "Funilaria e pintura",
    categoryId: "funilaria",
    rating: 4.9,
    reviewsCount: 156,
    distanceKm: 6.2,
    priceFrom: 250,
    responseTime: "~30 min",
    available: false,
    badge: "Premium",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Funilaria%20Premium&backgroundColor=8e44ad",
    city: "São Paulo, SP",
    bio: "Funilaria de excelência com pintura automotiva profissional. Garantia de 1 ano.",
  },
  {
    id: "6",
    name: "Chaveiro Auto Key",
    category: "Chaveiro automotivo",
    categoryId: "chaveiro",
    rating: 4.8,
    reviewsCount: 94,
    distanceKm: 5.4,
    priceFrom: 90,
    responseTime: "~12 min",
    available: true,
    badge: "Resposta rápida",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Auto%20Key&backgroundColor=16a085",
    city: "São Paulo, SP",
    bio: "Chaves codificadas, abertura de veículos e cópias para todas as montadoras.",
  },
];

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};

export const sampleReviews: Review[] = [
  {
    id: "r1",
    author: "Carlos M.",
    rating: 5,
    date: "Há 2 dias",
    comment: "Atendimento impecável, chegou rápido e resolveu o problema do meu carro na hora. Recomendo!",
  },
  {
    id: "r2",
    author: "Mariana L.",
    rating: 5,
    date: "Há 1 semana",
    comment: "Profissional sério, preço justo e muito educado. Voltarei com certeza.",
  },
  {
    id: "r3",
    author: "Roberto P.",
    rating: 4,
    date: "Há 2 semanas",
    comment: "Bom serviço, demorou um pouco mais que o esperado mas ficou tudo certo.",
  },
];
