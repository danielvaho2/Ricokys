import * as pruebasServices from '../../services/dashboard/filtroServices.js';

export const getVentasPorRango = async (req, res) => {
  try {
    const { fechaInicio, fechaFinal } = req.query;

    const ventas = await pruebasServices.getVentasPorRango(
      fechaInicio,
      fechaFinal,
    );

    res.status(200).json(ventas);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
