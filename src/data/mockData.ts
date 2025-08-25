import type { Usuario, LocalColeta, EstadoEstatistica, TipoResiduo } from '../types';

export const usuarioMock: Usuario = {
  id: 'u1754939826270',
  nome: 'João da Silva',
  email: 'joao.silva@example.com',
  cpf: '98765432100',
  sexo: 'M',
  nascimento: '1990-05-15'
};

export const locaisColetaMock: LocalColeta[] = [
  {
    id: 'lc1',
    usuarioId: 'u1754939826270',
    nome: 'EcoPonto Central',
    descricao: 'Coleta seletiva central da cidade com amplo espaço para diversos tipos de materiais.',
    endereco: {
      cep: '01001000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      cidade: 'São Paulo',
      estado: 'SP',
      numero: '1'
    },
    coordenadas: {
      latitude: -23.55052,
      longitude: -46.63308
    },
    tiposMaterial: ['Vidro', 'Papel', 'Plástico', 'Metal'],
    dataCriacao: '2024-01-15T10:30:00Z',
    dataAtualizacao: '2024-02-20T14:45:00Z'
  },
  {
    id: 'lc2',
    usuarioId: 'u1754939826270',
    nome: 'Centro Verde Zona Norte',
    descricao: 'Ponto de coleta especializado em materiais orgânicos e recicláveis.',
    endereco: {
      cep: '02001000',
      logradouro: 'Avenida Paulista',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
      numero: '1000'
    },
    coordenadas: {
      latitude: -23.56168,
      longitude: -46.65588
    },
    tiposMaterial: ['Orgânico', 'Papel', 'Plástico'],
    dataCriacao: '2024-01-20T09:15:00Z',
    dataAtualizacao: '2024-02-15T16:20:00Z'
  },
  {
    id: 'lc3',
    usuarioId: 'u1754939826270',
    nome: 'EcoStation Vila Madalena',
    descricao: 'Estação de reciclagem comunitária com foco em vidro e metal.',
    endereco: {
      cep: '05014000',
      logradouro: 'Rua Harmonia',
      bairro: 'Vila Madalena',
      cidade: 'São Paulo',
      estado: 'SP',
      numero: '123'
    },
    coordenadas: {
      latitude: -23.53588,
      longitude: -46.69177
    },
    tiposMaterial: ['Vidro', 'Metal'],
    dataCriacao: '2024-02-01T11:00:00Z'
  },
  {
    id: 'lc4',
    usuarioId: 'u1754939826270',
    nome: 'Recicla Jardins',
    descricao: 'Ponto de coleta premium nos Jardins para todos os tipos de materiais.',
    endereco: {
      cep: '01310100',
      logradouro: 'Avenida Paulista',
      bairro: 'Jardins',
      cidade: 'São Paulo',
      estado: 'SP',
      numero: '2000'
    },
    coordenadas: {
      latitude: -23.56294,
      longitude: -46.65427
    },
    tiposMaterial: ['Vidro', 'Papel', 'Plástico', 'Metal', 'Orgânico'],
    dataCriacao: '2024-02-10T08:30:00Z'
  }
];

export const estadosEstatisticasMock: EstadoEstatistica[] = [
  { estado: 'SP', quantidade: 15 },
  { estado: 'RJ', quantidade: 8 },
  { estado: 'MG', quantidade: 6 },
  { estado: 'RS', quantidade: 5 },
  { estado: 'PR', quantidade: 4 },
  { estado: 'SC', quantidade: 3 },
  { estado: 'BA', quantidade: 3 },
  { estado: 'PE', quantidade: 2 },
  { estado: 'CE', quantidade: 2 },
  { estado: 'GO', quantidade: 2 },
  { estado: 'MA', quantidade: 1 },
  { estado: 'ES', quantidade: 1 }
];

export const tiposResiduoOptions: { value: TipoResiduo; label: string; color: string }[] = [
  { value: 'Vidro', label: 'Vidro', color: 'var(--recycle-glass)' },
  { value: 'Papel', label: 'Papel', color: 'var(--recycle-paper)' },
  { value: 'Plástico', label: 'Plástico', color: 'var(--recycle-plastic)' },
  { value: 'Metal', label: 'Metal', color: 'var(--recycle-metal)' },
  { value: 'Orgânico', label: 'Orgânico', color: 'var(--recycle-organic)' }
];

export const sexoOptions = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Feminino' },
  { value: 'Outro', label: 'Outro' }
];

export const estadosBrasil = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

export const generateId = (): string => {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export const simulateApiResponse = async <T>(data: T, delayMs: number = 1000): Promise<T> => {
  await delay(delayMs);
  return data;
};

export const simulateApiError = async (message: string = 'Erro na API', delayMs: number = 1000): Promise<never> => {
  await delay(delayMs);
  throw new Error(message);
};

export interface User {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  sexo: 'M' | 'F' | 'Outro';
  nascimento: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  senha: string;
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
  tiposResiduos: string[];
  coordenadas: {
    latitude: number;
    longitude: number;
  };
  usuarioId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalPontosColeta: number;
  pontosPorEstado: Record<string, number>;
  pontosPorTipoResiduo: Record<string, number>;
}

export interface DashboardData {
  stats: DashboardStats;
  recentPoints: CollectionPoint[];
  userPoints: CollectionPoint[];
}

export const mockUsers: User[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@email.com',
    cpf: '123.456.789-00',
    sexo: 'M',
    nascimento: '1990-05-15',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@email.com',
    cpf: '987.654.321-00',
    sexo: 'F',
    nascimento: '1985-08-22',
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-10T14:20:00Z',
  },
];

export const mockCollectionPoints: CollectionPoint[] = [
  {
    id: '1',
    nome: 'EcoPonto Centro',
    descricao: 'Ponto de coleta central com ampla variedade de materiais aceitos',
    endereco: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      numero: 'S/N',
      latitude: -23.5505199,
      longitude: -46.6333094,
    },
    tiposResiduos: ['Papel', 'Plástico', 'Vidro', 'Metal'],
    coordenadas: {
      latitude: -23.5505199,
      longitude: -46.6333094,
    },
    usuarioId: '1',
    createdAt: '2024-01-20T08:15:00Z',
    updatedAt: '2024-01-20T08:15:00Z',
  },
  {
    id: '2',
    nome: 'Recicla Verde',
    descricao: 'Especializado em materiais orgânicos e compostagem',
    endereco: {
      cep: '04038-001',
      logradouro: 'Avenida Paulista',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
      numero: '1000',
      latitude: -23.5613963,
      longitude: -46.6565712,
    },
    tiposResiduos: ['Orgânico', 'Papel'],
    coordenadas: {
      latitude: -23.5613963,
      longitude: -46.6565712,
    },
    usuarioId: '2',
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
  },
  {
    id: '3',
    nome: 'ColetaSul Sustentável',
    descricao: 'Ponto de coleta na zona sul com foco em eletrônicos',
    endereco: {
      cep: '04094-050',
      logradouro: 'Rua Domingos de Morais',
      bairro: 'Vila Mariana',
      cidade: 'São Paulo',
      estado: 'SP',
      numero: '2564',
      latitude: -23.5940499,
      longitude: -46.6395307,
    },
    tiposResiduos: ['Metal', 'Plástico'],
    coordenadas: {
      latitude: -23.5940499,
      longitude: -46.6395307,
    },
    usuarioId: '1',
    createdAt: '2024-01-22T11:30:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
  },
];

export const mockDashboardData: DashboardData = {
  stats: {
    totalPontosColeta: 156,
    pontosPorEstado: {
      'SP': 45,
      'RJ': 32,
      'MG': 28,
      'RS': 22,
      'PR': 18,
      'SC': 11,
    },
    pontosPorTipoResiduo: {
      'Plástico': 89,
      'Papel': 76,
      'Vidro': 54,
      'Metal': 43,
      'Orgânico': 21,
    },
  },
  recentPoints: mockCollectionPoints.slice(0, 3),
  userPoints: mockCollectionPoints.filter(point => point.usuarioId === '1'),
};

export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export const wasteTypes = [
  { value: 'Papel', label: 'Papel', icon: '📄' },
  { value: 'Plástico', label: 'Plástico', icon: '🥤' },
  { value: 'Vidro', label: 'Vidro', icon: '🍼' },
  { value: 'Metal', label: 'Metal', icon: '🥫' },
  { value: 'Orgânico', label: 'Orgânico', icon: '🍃' },
];

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const fetchCEP = async (cep: string) => {
  await delay(500);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockCEPs: Record<string, any> = {
    '01001-000': {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Centro',
      localidade: 'São Paulo',
      uf: 'SP',
    },
    '04038-001': {
      cep: '04038-001',
      logradouro: 'Avenida Paulista',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
    },
  };

  const cleanCEP = cep.replace(/\D/g, '');
  const formattedCEP = `${cleanCEP.slice(0, 5)}-${cleanCEP.slice(5, 8)}`;
  
  const result = mockCEPs[formattedCEP];
  if (result) {
    return result;
  }
  
  throw new Error('CEP não encontrado');
};

// =====================================
// FUNÇÕES MOCK PARA AUTENTICAÇÃO
// =====================================

export const mockLogin = async (credentials: LoginCredentials) => {
  await delay(1000); // Simula delay da API

  // Usuário mock para testes
  const mockUser: User = {
    id: 'u175493982627',
    nome: 'João da Silva',
    email: credentials.email,
    cpf: '123.456.789-00',
    sexo: 'M',
    nascimento: '1990-05-15',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  };

  // Validação simples para testes
  if (credentials.email === 'joao@email.com' && credentials.senha === 'senha123') {
    return {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now(),
      message: 'Login realizado com sucesso'
    };
  }

  // Simula diferentes tipos de erro
  if (!credentials.email || !credentials.senha) {
    throw new Error('E-mail e senha são obrigatórios');
  }

  throw new Error('Credenciais inválidas');
};

export const mockRegister = async (data: RegisterData) => {
  await delay(1200); // Simula delay da API

  // Validações básicas
  if (!data.nome || !data.email || !data.cpf || !data.senha) {
    throw new Error('Todos os campos são obrigatórios');
  }

  if (data.email === 'usuario@existente.com') {
    throw new Error('E-mail já cadastrado');
  }

  if (data.cpf === '111.111.111-11') {
    throw new Error('CPF já cadastrado');
  }

  const mockUser: User = {
    id: 'u' + Date.now(),
    nome: data.nome,
    email: data.email,
    cpf: data.cpf,
    sexo: data.sexo,
    nascimento: data.nascimento,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    user: mockUser,
    token: 'mock-jwt-token-' + Date.now(),
    message: 'Usuário cadastrado com sucesso'
  };
};