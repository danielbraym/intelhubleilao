import express from 'express';

const router = express.Router();
const favoritos = []; // Mock - depois vai pro BD

// GET /api/favoritos?user_id=user123
router.get('/', (req, res) => {
  try {
    const { user_id } = req.query;
    const userFavoritos = favoritos.filter(f => f.user_id === user_id);
    res.json({ success: true, data: userFavoritos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/favoritos - Adicionar
router.post('/', (req, res) => {
  try {
    const { user_id, imovel_id } = req.body;
    const favorito = { id: Date.now(), user_id, imovel_id, created_at: new Date() };
    favoritos.push(favorito);
    res.status(201).json({ success: true, data: favorito });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE /api/favoritos/:id?user_id=user123
router.delete('/:id', (req, res) => {
  try {
    const { user_id } = req.query;
    const index = favoritos.findIndex(f => f.id === parseInt(req.params.id) && f.user_id === user_id);
    
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Favorito não encontrado' });
    }

    favoritos.splice(index, 1);
    res.json({ success: true, message: 'Favorito removido' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
