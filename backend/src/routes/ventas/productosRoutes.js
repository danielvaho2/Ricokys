import { Router } from "express";

import { getProductos } from "../../controllers/ventas/productosController.js";

const router = Router();

router.get("/", getProductos);

export default router;
