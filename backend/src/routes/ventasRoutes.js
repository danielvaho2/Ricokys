import {Router} from 'express';
import {createVenta,getResumen,getVenta} from '../controllers/ventasController.js'

const router = Router();

router.post('/',createVenta);
router.get('/resumen',getResumen);
router.get('/get',getVenta);

export default router;