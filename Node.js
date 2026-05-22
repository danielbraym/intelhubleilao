// backend/src/routes/imoveis.js

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
