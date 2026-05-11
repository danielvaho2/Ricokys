import { Router } from "express";
import { insertar, eliminar } from "../controllers/crud.controller.js";

const router = Router();

router.post("/insertar", insertar);
router.post("/eliminar", eliminar);

export default router;