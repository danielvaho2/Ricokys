import { Router } from "express";
import { insertar, eliminar,update } from "../controllers/crud.controller.js";

const router = Router();

router.post("/insertar", insertar);
router.post("/eliminar", eliminar);
router.post("/update", update);

export default router;