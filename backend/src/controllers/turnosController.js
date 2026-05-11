import * as turnosService from "../services/turnoService.js";

export const abrirTurno = async (req, res) => {
  try {
    const turno = await turnosService.abrir();
    res.status(201).json(turno);
  } catch (err) {
    const status = err.message === "Ya hay un turno abierto" ? 409 : 500;
    res.status(status).json({ error: err.message });
  }
};

export const cerrarTurno = async (req, res) => {
  try {
    const turno = await turnosService.cerrar();
    res.status(201).json(turno);
  } catch (err) {
    const status = err.message === "No hay turno abierto" ? 404 : 500;
    res.status(status).json({ error: err.message });
  }
};

export const getTurnoActivo = async (req, res) => {
  try {
    const turno = await turnosService.getActivo();
    if (!turno) return res.status(404).json({ error: "No hay turno activo" });
    res.json(turno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};