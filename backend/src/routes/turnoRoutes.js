import {Router} from 'express'
import {abrirTurno,cerrarTurno,getTurnoActivo} from '../controllers/turnosController.js'

const router = Router()

router.post('/abrir', abrirTurno)
router.post('/cerrar',cerrarTurno)
router.get('/activo',getTurnoActivo)

export default router;
