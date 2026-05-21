import * as ventasService from '../../services/gastos/ventasService.js';

export const getTotalVentasMes = async (req, res) => {
  try {
    const { fechainicio, fechafinal } = req.query;
    const data = await ventasService.getTotalVentasMes(fechainicio, fechafinal);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

