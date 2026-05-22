// Mock do serviço de imóveis (substituir por DB real)

const mockImoveis = [
  {
    id: '1',
    endereco: 'Rua A, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    tipo_imovel: 'residencial',
    area_construida: 120,
    quartos: 3,
    banheiros: 2,
    preco_avaliacao: 450000,
    preco_minimo: 360000,
    status: 'futuro',
    data_leilao: new Date('2026-06-15'),
    latitude: -23.5505,
    longitude: -46.6333
  },
  {
    id: '2',
    endereco: 'Av. B, 456',
    cidade: 'São Paulo',
    estado: 'SP',
    tipo_imovel: 'comercial',
    area_construida: 250,
    quartos: 0,
    banheiros: 3,
    preco_avaliacao: 800000,
    preco_minimo: 640000,
    status: 'futuro',
    data_leilao: new Date('2026-06-20'),
    latitude: -23.5615,
    longitude: -46.6529
  }
];

export const getAllImoveis = async (filters = {}, pagination = { page: 1, limit: 20 }) => {
  // Simulação de filtros
  let filtered = [...mockImoveis];

  if (filters.estado) {
    filtered = filtered.filter(i => i.estado === filters.estado);
  }
  if (filters.cidade) {
    filtered = filtered.filter(i => i.cidade === filters.cidade);
  }
  if (filters.tipo_imovel) {
    filtered = filtered.filter(i => i.tipo_imovel === filters.tipo_imovel);
  }

  // Paginação
  const start = (pagination.page - 1) * pagination.limit;
  const end = start + pagination.limit;

  return {
    total: filtered.length,
    items: filtered.slice(start, end)
  };
};

export const getImovelById = async (id) => {
  return mockImoveis.find(i => i.id === id);
};

export const createImovel = async (data) => {
  const novoImovel = {
    id: String(mockImoveis.length + 1),
    ...data,
    created_at: new Date()
  };
  mockImoveis.push(novoImovel);
  return novoImovel;
};
