import "./registrarVenta.css";

const formatCOP = (valor) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(valor);

function ModalVenta({ venta, onCerrar }) {
  if (!venta) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__check">✓</div>

        <h2 className="modal__titulo">Venta registrada</h2>

        <div className="modal__detalle">
          {venta.detalle.map((item) => (
            <div key={item.producto_id} className="modal__item">
              <span>
                {item.cantidad}x {item.nombre}
              </span>

              <span>{formatCOP(item.subtotal)}</span>
            </div>
          ))}
        </div>

        <div className="modal__total">
          <span>Total</span>
          <span>{formatCOP(venta.total)}</span>
        </div>

        <div className="modal__metodo">Pago: {venta.metodo_pago}</div>

        <button className="modal__btn" onClick={onCerrar}>
          Nueva venta
        </button>
      </div>
    </div>
  );
}

export default ModalVenta;
