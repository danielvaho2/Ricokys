import './registrarVenta.css'

const formatCOP = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(valor)

function ModalVenta({ venta, onCerrar }) {
  if (!venta) return null

  return (
    <div className="registrar__modal-overlay">
      <div className="registrar__modal">
        <div className="registrar__modal-check">✓</div>
        <h2 className="registrar__modal-titulo">Venta registrada</h2>

        <div className="registrar__modal-detalle">
          {venta.detalle.map((item) => (
            <div key={item.producto_id} className="registrar__modal-item">
              <span>{item.cantidad}x {item.nombre}</span>
              <span>{formatCOP(item.subtotal)}</span>
            </div>
          ))}
        </div>

        <div className="registrar__modal-total">
          <span>Total</span>
          <span>{formatCOP(venta.total)}</span>
        </div>

        <div className="registrar__modal-metodo">
          Pago: {venta.metodo_pago}
        </div>

        <button className="registrar__modal-btn" onClick={onCerrar}>
          Nueva venta
        </button>
      </div>
    </div>
  )
}

export default ModalVenta