import { getDetalleVentasPorDia } from "../../services/dashboard/detalleVentasService.js";
export const getDetalleVentasDia = async (req, res) => {
  try {
    const { fecha } = req.query;

    if (!fecha) {
      return res.status(400).json({ error: "La fecha es requerida" });
    }

    const detalle = await getDetalleVentasPorDia(fecha);
    res.json(detalle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};