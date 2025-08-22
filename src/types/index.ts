import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  sexo: 'M' | 'F' | 'Outro';
  nascimento: string;
  senha?: string; 
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  message: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  cpf: string;
  sexo: 'M' | 'F' | 'Outro';
  nascimento: string;
  senha: string;
  confirmarSenha: string;
}

export interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  latitude?: number;
  longitude?: number;
}

export interface CollectionPoint {
  id: string;
  nome: string;
  descricao: string;
  endereco: Address;
  tiposResiduos: WasteType[];
  coordenadas: {
    latitude: number;
    longitude: number;
  };
  usuarioId: string;
  createdAt: string;
  updatedAt: string;
}

export type WasteType = 'Vidro' | 'Papel' | 'Plástico' | 'Metal' | 'Orgânico';

export interface CollectionPointData {
  nome: string;
  descricao: string;
  endereco: Address;
  tiposResiduos: WasteType[];
}

export interface DashboardStats {
  totalPontosColeta: number;
  pontosPorEstado: Record<string, number>;
  pontosPorTipoResiduo: Record<WasteType, number>;
}

export interface DashboardData {
  stats: DashboardStats;
  recentPoints: CollectionPoint[];
  userPoints: CollectionPoint[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: string[];
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  hoverable?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  active?: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
}

export interface FilterOptions {
  estado?: string;
  cidade?: string;
  tipoResiduo?: WasteType;
  distancia?: number;
}

export interface CEPResponse {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface CustomEvent<T = HTMLElement> {
  target: T;
  currentTarget: T;
}

export type {
  Theme as ThemeType,
  User as UserType,
  CollectionPoint as CollectionPointType,
  WasteType as WasteTypeEnum,
};