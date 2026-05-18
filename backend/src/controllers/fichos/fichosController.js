import * as fichoService from "../../services/fichos/fichoService.js";
import { getActivo } from "../../services/ventas/turnoService.js";

export const getFichos = async (req, res) => {
  try {
    const turnoActivo = await getActivo();
    if (!turnoActivo) {
      return res.status(400).json({ error: "No hay un turno activo" });
    }
    const { turno_id } = req.body;
    const fichos = await fichoService.getFichos(turno_id);
    res.json(fichos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setFichoEstado = async (req, res) => {
  try {
    const turnoActivo = await getActivo();
    if (!turnoActivo) {
      return res.status(400).json({ error: "No hay un turno activo" });
    }
    const { turno_id, ficho_id } = req.body;
    await fichoService.setFichoEstado(turno_id, ficho_id);
    res.json({ message: "Ficho actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
};
