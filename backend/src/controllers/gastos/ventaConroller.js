import * as ventasService from '../../services/gastos/ventasService.js';

export const getTotalVentasMes = async (req, res) => {
  try {
    const { mes, año } = req.query;
    const data = await ventasService.getTotalVentasMes(Number(mes), Number(año));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

