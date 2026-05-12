import * as productService from "../../services/ventas/productosServices.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await productService.getProducto();

    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
