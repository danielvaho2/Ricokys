import {Router} from 'express'
import { getVentasPorRango,getTotalPorRango } from '../../controllers/dashboard/filtroController.js';
import { getDetalleVentasDia } from "../../controllers/dashboard/detalleVentasController.js";

const router = Router();

router.get('/',getVentasPorRango);
router.get('/total',getTotalPorRango);
router.get('/ventaDia', getDetalleVentasDia);


export default router