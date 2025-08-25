export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  sexo: 'M' | 'F' | 'Outro';
  nascimento: string;
  senha?: string;
}

export interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero?: string;
  complemento?: string;
}

export interface Coordenadas {
  latitude: number;
  longitude: number;
}

export type TipoResiduo = 'Vidro' | 'Papel' | 'Plástico' | 'Metal' | 'Orgânico';

export interface LocalColeta {
  id: string;
  usuarioId: string;
  nome: string;
  descricao: string;
  endereco: Endereco;
  coordenadas: Coordenadas;
  tiposMaterial: TipoResiduo[];
  dataCriacao: string;
  dataAtualizacao?: string;
}

export interface EstadoEstatistica {
  estado: string;
  quantidade: number;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterData extends Omit<Usuario, 'id'> {
  confirmarSenha: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'checkbox' | 'textarea' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface ComponentBaseProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export interface IconProps extends ComponentBaseProps {
  size?: number;
  color?: string;
}

export interface ButtonProps extends ComponentBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export interface InputProps extends ComponentBaseProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  name?: string;
  autoComplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export interface SelectProps extends ComponentBaseProps {
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  name?: string;
  onChange?: (value: string) => void;
}

export interface CardProps extends ComponentBaseProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  title: string;
  protected?: boolean;
  hideInMenu?: boolean;
}