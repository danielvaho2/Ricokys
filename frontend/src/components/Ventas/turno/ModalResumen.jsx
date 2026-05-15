import './turno.css'
import './inventarioTurno.css'

import { formatCOP } from '../../../hooks/fromatCOP.js'
import { useInventarioTurno } from '../../../hooks/ventas/useInventarioTurno.js'
import InventarioTurno from './InventarioTurno'

function ModalResumen({ resumen, onCerrar }) {
  const { inventario, loading } = useInventarioTurno(resumen?.turno_id)

  if (!resumen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__titulo">Resumen del turno</h2>

        <div className="turno__resumen-grid">
          <div className="turno__resumen-card">
            <span className="turno__resumen-label">Ventas</span>
            <span className="turno__resumen-valor">{resumen.cantidad_ventas}</span>
          </div>
          <div className="turno__resumen-card">
            <span className="turno__resumen-label">Total</span>
            <span className="turno__resumen-valor">{formatCOP(resumen.total)}</span>
          </div>
          <div className="turno__resumen-card">
            <span className="turno__resumen-label">Efectivo</span>
            <span className="turno__resumen-valor">{formatCOP(resumen.efectivo)}</span>
          </div>
          <div className="turno__resumen-card">
            <span className="turno__resumen-label">Transferencia</span>
            <span className="turno__resumen-valor">{formatCOP(resumen.transferencia)}</span>
          </div>
        </div>

        <InventarioTurno inventario={inventario} loading={loading} />

        <button className="modal__btn" onClick={onCerrar}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default ModalResumen