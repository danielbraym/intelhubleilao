# ImoLeilão - Platform de Análise de Leilões Imobiliários 🏠

Uma plataforma inteligente para **investidores imobiliários** analisarem e monitorarem leilões da Caixa Econômica com base em **dados + IA**.

## 🎯 MVP - Core Loop

```
1. Acessa a plataforma
2. Vê leilões futuros da Caixa (scraping)
3. Clica em um imóvel → recebe análise completa:
   ├─ Preço de avaliação vs. mercado local
   ├─ Rentabilidade (aluguel ou revenda)
   ├─ Scores: Risco, Liquidez, ROI
   ├─ Comparáveis (imóveis similares na região)
   └─ Recomendação: "Arrematar" / "Evitar" / "Monitorar"
4. Guarda imóveis de interesse
5. Recebe alertas antes de leilões importantes
```

## 🚀 Quick Start

### Pré-requisitos
- Docker & Docker Compose
- (Opcional) Node.js 18+ / Python 3.10+

### Iniciar Ambiente

```bash
# Clonar repositório
git clone https://github.com/danielbraym/intelhubleilao.git
cd intelhubleilao

# Iniciar todos os serviços
docker-compose up -d

# Aguardar ~30s e verificar saúde
docker-compose ps
curl http://localhost:3000/health
curl http://localhost:8000/health
```

## 📊 API Endpoints

### Imóveis
```bash
# Listar imóveis com filtros
curl "http://localhost:3000/api/imoveis?estado=SP&cidade=SãoPaulo&tipo_imovel=residencial&page=1&limit=20"

# Detalhe de um imóvel
curl http://localhost:3000/api/imoveis/1

# Criar novo imóvel
curl -X POST http://localhost:3000/api/imoveis \
  -H "Content-Type: application/json" \
  -d '{
    "endereco": "Rua A, 123",
    "cidade": "São Paulo",
    "estado": "SP",
    "tipo_imovel": "residencial",
    "area_construida": 120,
    "quartos": 3,
    "banheiros": 2,
    "preco_avaliacao": 450000,
    "preco_minimo": 360000
  }'
```

### Análises (3 Agentes IA)
```bash
# Obter análise completa de um imóvel (avaliação + risco + oportunidade)
curl http://localhost:3000/api/analises/1
```

**Resposta:**
```json
{
  "success": true,
  "imovel_id": "1",
  "analises": {
    "avaliacao": {
      "preco_estimado": 500000,
      "intervalo_minimo": 450000,
      "intervalo_maximo": 550000,
      "metodo": "comparable+hedônico",
      "confianca": 0.85
    },
    "risco": {
      "score_risco": 3,
      "nivel_risco": "Baixo",
      "alertas": ["Sem alertas criticos identificados"]
    },
    "oportunidade": {
      "recomendacao": "COMPRAR",
      "justificativa": "Forte desconto (20.5%) com risco baixo. Excelente oportunidade de revenda.",
      "roi_revenda_12m": 20.5,
      "roi_aluguel_12m": 0.75,
      "score_oportunidade": 85.3
    }
  }
}
```

### Favoritos
```bash
# Listar favoritos
curl "http://localhost:3000/api/favoritos?user_id=user123"

# Adicionar favorito
curl -X POST http://localhost:3000/api/favoritos \
  -H "Content-Type: application/json" \
  -d '{"user_id":"user123", "imovel_id":"1"}'

# Remover favorito
curl -X DELETE "http://localhost:3000/api/favoritos/1?user_id=user123"
```

## 🤖 Agentes IA (Analytics)

### 1. Avaliador (Preço)
```bash
curl -X POST http://localhost:8000/agents/avaliador \
  -H "Content-Type: application/json" \
  -d '{
    "endereco": "Rua A, 123",
    "bairro": "Vila Madalena",
    "area_construida": 120,
    "quartos": 3,
    "preco_comparaveis": [480000, 510000, 495000]
  }'
```

### 2. Risco
```bash
curl -X POST http://localhost:8000/agents/risco \
  -H "Content-Type: application/json" \
  -d '{
    "endereco": "Rua A, 123",
    "bairro": "Vila Madalena",
    "tipo_imovel": "residencial",
    "descricao": "Imóvel em bom estado, com 2 vagas de garagem"
  }'
```

### 3. Oportunidade
```bash
curl -X POST http://localhost:8000/agents/oportunidade \
  -H "Content-Type: application/json" \
  -d '{
    "preco_avaliacao": 450000,
    "preco_mercado": 520000,
    "rentabilidade_anual": 0.75,
    "score_risco": 3
  }'
```

## 📁 Estrutura de Pastas

```
intelhubleilao/
├── backend/                    # Node.js/Express
│   ├── src/
│   │   ├── routes/
│   │   │   ├── imoveis.js      # CRUD imóveis
│   │   │   ├── analises.js     # Integração com agentes IA
│   │   │   └── favoritos.js    # Gerenciar favoritos
│   │   ├── services/
│   │   │   └── imovelService.js
│   │   └── server.js           # Express setup
│   ├── Dockerfile
│   └── package.json
│
├── analytics/                  # Python/FastAPI
│   ├── main.py                 # 3 Agentes IA
│   ├── Dockerfile
│   └── requirements.txt
│
├── docker-compose.yml          # Orquestração
└── README.md
```

## 🔧 Tech Stack

| Camada | Tecnologia | Porta |
|--------|-----------|-------|
| **Frontend** | React 18 + Vite + Tailwind | 5173 (em breve) |
| **Backend** | Node.js 20 + Express | 3000 |
| **Analytics** | Python 3.10 + FastAPI | 8000 |
| **Database** | PostgreSQL 15 | 5432 |
| **Cache** | Redis 7 | 6379 |

## 📋 Roadmap (8 semanas)

| Semana | Foco | Status |
|--------|------|--------|
| 1-2 | Setup + DB Schema | ✅ Pronto |
| 3 | Scraper Caixa | 📝 Próximo |
| 4 | Frontend (React) | 📝 Próximo |
| 5 | Agente Avaliador | ✅ Pronto |
| 6 | Agente Risco | ✅ Pronto |
| 7 | Agente Oportunidade | ✅ Pronto |
| 8 | Testes + Deploy | 📝 Próximo |

## 🎬 Próximos Passos

### Semana 3: Scraper Caixa
```bash
# Implementar scraping dos leilões
# Usar: Playwright + Cheerio
# Salvar em PostgreSQL com Bull queue
```

### Semana 4: Frontend React
```bash
# Criar dashboard com:
# - Listagem de leilões
# - Filtros (estado, cidade, preço)
# - Cards com análises IA
# - Página de detalhe
# - Seção de favoritos
```

## 🐛 Troubleshooting

### Serviços não iniciando?
```bash
# Verificar logs
docker-compose logs backend
docker-compose logs analytics
docker-compose logs postgres

# Reinicar
docker-compose down -v
docker-compose up -d
```

### Postgres não conecta?
```bash
# Verificar credenciais em docker-compose.yml
# Conectar via CLI:
psql -h localhost -U admin -d intelhubleilao
```

## 📧 Suporte

Para dúvidas ou sugestões, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ para investidores imobiliários**
