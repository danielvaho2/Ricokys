import {Router} from 'express'

import  { getDetalleVenta} from '../controllers/detalleVentaController.js'


const router = Router();

router.get('/get',getDetalleVenta)

export default router