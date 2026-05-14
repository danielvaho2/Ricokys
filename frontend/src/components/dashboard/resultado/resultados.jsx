import "./resultados.css";
import { formatCOP } from "../../../hooks/fromatCOP.js";
const formatFecha = (fecha) => {
  if (!fecha) return "";
  return fecha.split("T")[0];
};

function Resultados({ ventasRango, totalRango }) {
  const granTotal = Number(totalRango?.gran_total_ventas) || 0;

  const cantidadVentas = ventasRango.reduce(
    (acc, venta) => acc + Number(venta.cantidad_ventas),
    0,
  );

  return (
    <div className="contenedor-resultados">
      {ventasRango.length === 0 ? (
        <div className="no-datos">No hay datos en ese rango</div>
      ) : (
        <>
          {ventasRango.map((venta, index) => (
            <div className="resultado-card" key={index}>
             <div className="resultado-info">

  <span className="resultado-dia-label">
    📅 Día
  </span>

  <span className="resultado-fecha">
    {formatFecha(venta.dia)}
  </span>

</div>

<div className="resultado-metricas">

  <span className="resultado-ventas">
    🛒 {venta.cantidad_ventas} ventas
  </span>

  <span className="resultado-total">
    {formatCOP(venta.total_dia)}
  </span>

</div>
            </div>
          ))}
        </>
      )}

      <div className="total-general">
        <p>
          💰 Total vendido <br />
          {formatCOP(granTotal)}
        </p>

        <p>
          🛒 Cantidad de ventas <br />
          {cantidadVentas}
        </p>
      </div>
    </div>
  );
}

export default Resultados;
