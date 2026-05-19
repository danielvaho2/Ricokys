import DetalleVenta from "./detalleVenta.jsx";

function DetallePanel({ estaCargando, ventasDelDia }) {
  return (
    <div className="detalle-panel">
      {estaCargando ? (
        <p className="detalle-cargando">Cargando...</p>
      ) : (
        ventasDelDia.map((v) => (
          <DetalleVenta key={v.venta_id} venta={v} />
        ))
      )}
    </div>
  );
}

export default DetallePanel;