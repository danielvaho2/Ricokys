import { Router } from "express";
import { insertar, eliminar,update,desactivar,activar } from "../controllers/crud.controller.js";

const router = Router();

router.post("/insertar", insertar);
router.post("/eliminar", eliminar);
router.post("/update", update);
router.post("/desactivar", desactivar);
router.post("/activar", activar);

export default router;