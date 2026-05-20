import * as inventarioServices from "../../services/dashboard/inventarioService.js";

export const getProductoStock = async (req, res) => {
  try {
    const productos = await inventarioServices.getProductoStock();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    await inventarioServices.actualizarStock({ id, stock });
    res.json({ message: "Stock actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const agregarStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    await inventarioServices.agregarStock({ id, stock });
    res.json({ message: "Stock agregado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
