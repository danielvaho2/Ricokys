import {Router} from "express";
import { getProductoStock, actualizarStock } from "../../controllers/dashboard/inventarioController.js";

const router = Router();
router.get("/", getProductoStock);
router.patch("/:id/stock", actualizarStock);
export default router;
