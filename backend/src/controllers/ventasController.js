import * as ventasService from "../services/ventasService.js";

export const createVenta = async (req, res) => {
  try {
    const { productos, metodo_pago } = req.body;
    if (!productos)
      return res.status(400).json({ error: "Debes seleccionar un producto" });
    if (!metodo_pago)
      return res.status(400).json({ error: "metodo_pago es requerido" });
    const venta = await ventasService.create({ productos, metodo_pago });
    res.status(201).json(venta);
  } catch (err) {
    const status = err.message === "No hay turno activo" ? 404 : 500;
    return res.status(status).json({ error: err.message });
  }
};

export const getVenta = async (req, res) => {
  try {
    const ventas = await ventasService.getAll();
    res.status(200).json(ventas);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const getResumen = async (req, res) => {
  try {
    const resumen = await ventasService.getResumen();
    res.status(200).json(resumen);
  } catch (err) {
        return res.status(500).json({ error: err.message });
  }
};

