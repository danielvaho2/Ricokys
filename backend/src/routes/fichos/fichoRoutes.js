import {Router} from "express";

import { getFichos, setFichoEstado } from "../../controllers/fichos/fichosController.js";
const router = Router();

router.post("/", getFichos);
router.post("/update", setFichoEstado);

export default router;
