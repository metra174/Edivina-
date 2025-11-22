export type Category = 'Todos' | 'Roupas' | 'Calçados' | 'Bolsas' | 'Relógios' | 'Acessórios';

export interface Product {
  id: number;
  name: string;
  price: number; // in KZ
  category: Category;
  image: string;
  video?: string; // URL do vídeo (opcional)
  description: string;
  isSoldOut: boolean;
  stock: number; // Quantidade em estoque
}

export interface User {
  username: string;
  isAdmin: boolean;
}

export const WHATSAPP_NUMBER = "244932846639";