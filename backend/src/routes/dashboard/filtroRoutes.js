import {Router} from 'express'
import { getVentasPorRango,getTotalPorRango } from '../../controllers/dashboard/filtroController.js';

const router = Router();

router.get('/',getVentasPorRango);
router.get('/total',getTotalPorRango);


export default router