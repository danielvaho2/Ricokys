import * as gastosService from "../../services/gastos/gastosService.js";

export const getGastos = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    const gastos = await gastosService.getGastos(fechaInicio, fechaFin);
    res.json(gastos);
  } catch (err) {
    console.error("Error al obtener gastos:", err);
    res.status(500).json({ error: "Error al obtener gastos" });
  }
};

export const createGasto = async (req, res) => {
  try {
    const { nombre, descripcion, monto, categoria } = req.body;
    const id = await gastosService.createGasto({ nombre, descripcion, monto, categoria });
    res.status(201).json({ message: "Gasto creado", id });
  } catch (err) {
    console.error("Error al crear gasto:", err);
    res.status(500).json({ error: "Error al crear gasto" });
  }
};

export const updateGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, monto, categoria } = req.body;
    await gastosService.updateGasto(id, {
      nombre,
      descripcion,
      monto,
      categoria,
    });
    res.json({ message: "Gasto actualizado" });
  } catch (err) {
    console.error("Error al actualizar gasto:", err);
    res.status(500).json({ error: "Error al actualizar gasto" });
  }
};

export const deleteGasto = async (req, res) => {
  try {
    const { id } = req.params;
    await gastosService.deleteGasto(id);
    res.json({ message: "Gasto eliminado" });
  } catch (err) {
    console.error("Error al eliminar gasto:", err);
    res.status(500).json({ error: "Error al eliminar gasto" });
  }
};
