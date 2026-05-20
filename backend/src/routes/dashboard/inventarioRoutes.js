import {Router} from "express";
import { getProductoStock, actualizarStock, agregarStock} from "../../controllers/dashboard/inventarioController.js";

const router = Router();
router.get("/", getProductoStock);
router.patch("/:id/stock", actualizarStock);
router.patch("/:id/stock/agregar", agregarStock);
export default router;
