import {
  insertarProducto,
  eliminarProducto,
  updateProducto,
  desactivarProducto,
  activarProducto,
} from "../services/crud.service.js";

export const insertar = async (req, res, next) => {
  try {
    const { nombre, precio } = req.body;

    if (!nombre || precio === undefined || precio === null) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const result = await insertarProducto({ nombre, precio });

    res.status(201).json({
      message: "Producto insertado correctamente",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const eliminar = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Faltan datos" });
    const result = await eliminarProducto({ id });
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      message: "Producto eliminado correctamente",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id, precio } = req.body;
    if (!id || precio === undefined || precio === null)
      return res.status(400).json({ message: "Faltan datos" });
    const result = await updateProducto({ id, precio });
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
    res.status(200).json({
      message: "Producto actualizado correctamente",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const desactivar = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Faltan datos" });
    const result = await desactivarProducto({ id });
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
    res.status(200).json({
      message: "Producto desactivado correctamente",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const activar = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Faltan datos",
      });
    }

    const result = await activarProducto({ id });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      message: "Producto activado correctamente",
      result,
    });

  } catch (error) {
    next(error);
  }
};