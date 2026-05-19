import { formatCOP } from "../../../hooks/fromatCOP.js";

function DetalleVenta({ venta }) {
  return (
    <div className="detalle-venta">
      <div className="detalle-venta__header">
        <span className="detalle-venta__id">Venta #{venta.venta_id}</span>
        <span className="detalle-venta__metodo">{venta.metodo_pago}</span>
        <span className="detalle-venta__total">{formatCOP(venta.total)}</span>
      </div>
      <ul className="detalle-venta__productos">
        {venta.productos.map((p, i) => (
          <li key={i}>
            <span>{p.nombre} ×{p.cantidad}</span>
            <span>{formatCOP(p.subtotal)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetalleVenta;