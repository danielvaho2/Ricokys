import { Router } from "express";
import {
  abrirTurno,
  cerrarTurno,
  getTurnoActivo,
  getInventario
} from "../../controllers/ventas/turnosController.js";

const router = Router();

router.post("/abrir", abrirTurno);
router.post("/cerrar", cerrarTurno);
router.get("/activo", getTurnoActivo);
router.get("/inventario", getInventario);

export default router;
