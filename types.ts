
export enum OrderStatus {
  MEASURING = 'Medição',
  BUDGETING = 'Orçamento',
  PRODUCING = 'Produção',
  READY = 'Pronto',
  INSTALLING = 'Instalação',
  COMPLETED = 'Concluído'
}

export enum GlassType {
  TEMPERED = 'Temperado',
  LAMINATED = 'Laminado',
  FLOAT = 'Comum',
  REFLECTIVE = 'Refletivo'
}

export enum WorkType {
  HOUSE = 'Casa completa',
  APARTMENT = 'Apartamento',
  COMMERCIAL = 'Comercial',
  RENOVATION = 'Reforma'
}

export interface Vao {
  id: string;
  categoria: string;
  tipo: string;
  modelo: string;
  trilho: string;
  corAluminio: string;
  corFerragem: string;
  corVidro: string;
  largura: number;
  altura: number;
  quantidade: number;
  vidro: string;
  observacoes: string;
}

export interface Opening {
  id: string;
  type: string;
  model: string;
  width: number;
  height: number;
  quantity: number;
  glassType: string;
  aluminumColor: string;
  hardwareColor: string;
}

export interface GlassPiece {
  id: string;
  label: string;
  width: number;
  height: number;
  thickness: number;
  type: GlassType;
  color: string;
  hardwareIds: string[];
}

export interface Project {
  id: string;
  clientName: string;
  address: string;
  status: OrderStatus;
  pieces: GlassPiece[];
  vaos: Vao[];
  createdAt: string;
  totalValue?: number;
}

export interface User {
  id: string;
  name: string;
  role: 'OWNER' | 'MEASURER' | 'INSTALLER' | 'ADMIN';
}
