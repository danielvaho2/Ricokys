import './turno.css'

const formatCOP = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(valor)

function ModalResumen({ resumen, onCerrar }) {
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

        <button className="modal__btn" onClick={onCerrar}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default ModalResumen