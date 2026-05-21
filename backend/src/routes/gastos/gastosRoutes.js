import {Router} from 'express';
import { getGastos, createGasto, updateGasto, deleteGasto, } from '../../controllers/gastos/gastosController.js';
import { getTotalVentasMes,getVentasGastosPorDia } from '../../controllers/gastos/ventaConroller.js';

const router = Router();

router.get("/ventas-mes", getTotalVentasMes);
router.get("/ventas-por-dia", getVentasGastosPorDia);
router.get('/', getGastos);
router.post('/', createGasto);
router.put('/:id', updateGasto);
router.delete('/:id', deleteGasto);

export default router;