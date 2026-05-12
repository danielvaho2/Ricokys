import {Router} from 'express'
import { getVentasPorRango } from '../../controllers/dashboard/filtroController.js';

const router = Router();

router.get('/',getVentasPorRango)

export default router