import { Router } from "express";

import { getProductos,getProductosActivos,getProductosInactivos,  } from "../../controllers/ventas/productosController.js";

const router = Router();

router.get("/", getProductos);
router.get("/activos", getProductosActivos);
router.get("/inactivos", getProductosInactivos);


export default router;
