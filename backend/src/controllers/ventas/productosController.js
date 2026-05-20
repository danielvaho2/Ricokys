import * as productService from "../../services/ventas/productosServices.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await productService.getProducto();

    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getProductosActivos = async (req, res) => {
  try {
    const productos = await productService.getProductoActivo();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductosInactivos = async (req, res) => {
  try {
    const productos = await productService.getProductoInactivo();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};