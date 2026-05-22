import express from 'express';
import * as imovelService from '../services/imovelService.js';

const router = express.Router();

// GET /api/imoveis?estado=SP&cidade=SãoPaulo&tipo=residencial&page=1&limit=20
router.get('/', async (req, res) => {
  try {
    const { estado, cidade, tipo_imovel, page = 1, limit = 20 } = req.query;
    
    const filters = {
      ...(estado && { estado }),
      ...(cidade && { cidade }),
      ...(tipo_imovel && { tipo_imovel })
    };

    const result = await imovelService.getAllImoveis(filters, { 
      page: parseInt(page), 
      limit: parseInt(limit) 
    });

    res.json({
      success: true,
      data: result.items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: result.total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/imoveis/:id
router.get('/:id', async (req, res) => {
  try {
    const imovel = await imovelService.getImovelById(req.params.id);
    
    if (!imovel) {
      return res.status(404).json({ success: false, error: 'Imóvel não encontrado' });
    }

    res.json({ success: true, data: imovel });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/imoveis (criar novo)
router.post('/', async (req, res) => {
  try {
    const novoImovel = await imovelService.createImovel(req.body);
    res.status(201).json({ success: true, data: novoImovel });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST /api/imoveis/batch (processar lote de imóveis)
router.post('/batch', async (req, res) => {
  try {
    const { imoveis } = req.body;
    
    if (!Array.isArray(imoveis)) {
      return res.status(400).json({ success: false, message: "Formato de dados inválido. Esperava um array." });
    }

    console.log(`📡 Recebendo lote de ${imoveis.length} imóveis do pipeline...`);

    // Aqui você chama o seu serviço que interage com o PostgreSQL
    // await imovelService.processarLote(imoveis);
    
    res.json({ 
      success: true, 
      message: `Processamento iniciado: ${imoveis.length} imóveis recebidos.` 
    });
  } catch (error) {
    console.error("Erro na ingestão:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
