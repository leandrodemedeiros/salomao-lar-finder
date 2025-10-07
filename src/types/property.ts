export interface Property {
  id: string;
  images: string[];
  metragem: number;
  cidade: string;
  estado: string;
  preco: number;
  quartos: number;
  tipo: "Apartamento" | "Casa";
  titulo: string;
  descricao?: string;
  urlOriginal: string;
  dataPublicacao: Date;
  fonte: "WImóveis" | "Zap Imóveis" | "Imovelweb" | "OLX" | "Viva Real" | "Manual";
}

export interface PropertyFilters {
  busca: string;
  metragemMin?: number;
  metragemMax?: number;
  precoMin?: number;
  precoMax?: number;
  cidade?: string;
  estado?: string;
  quartos?: number;
  tipo?: "Apartamento" | "Casa" | "";
}
