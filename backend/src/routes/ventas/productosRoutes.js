import { Router } from "express";

import { getProductos,getProductosActivos,getProductosInactivos, actualizarStock,  } from "../../controllers/ventas/productosController.js";

const router = Router();

router.get("/", getProductos);
router.get("/activos", getProductosActivos);
router.get("/inactivos", getProductosInactivos);
router.patch("/:id/stock", actualizarStock);

export default router;
