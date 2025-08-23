import type { User, CollectionPoint, DashboardData } from '../types';

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