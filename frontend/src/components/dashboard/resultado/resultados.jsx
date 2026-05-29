import "./resultados.css";
import { formatCOP } from "../../../hooks/fromatCOP.js";
import { useDetalleVenta } from "../../../hooks/dashboard/useDetalleVenta.js";
import DetallePanel from "./detallePanel.jsx";

const formatFecha = (fecha) => {
  if (!fecha) return "";
  return fecha.split("T")[0];
};

function Resultados({ ventasRango, totalRango }) {
  const { abierto, detalle, cargando, toggleDetalle } = useDetalleVenta();

  const granTotal = Number(totalRango?.gran_total_ventas) || 0;
  const granTotalEfectivo = Number(totalRango?.gran_total_efectivo) || 0;
  const granTotalTransferencia = Number(totalRango?.gran_total_transferencia) || 0;
  const cantidadVentas = ventasRango.reduce(
    (acc, venta) => acc + Number(venta.cantidad_ventas),
    0,
  );

  return (
    <div className="contenedor-resultados">
      {ventasRango.length === 0 ? (
        <div className="no-datos">No hay datos en ese rango</div>
      ) : (
        ventasRango.map((venta, index) => {
          const fecha = formatFecha(venta.dia);
          const estaAbierto = abierto === fecha;
          const estaCargando = cargando === fecha;
          const ventasDelDia = detalle[fecha] ?? [];

          return (
            <div className="resultado-card" key={index}>
              <div className="resultado-info">
                <span className="resultado-dia-label">📅 día</span>
                <span className="resultado-fecha">{fecha}</span>
              </div>

              <div className="resultado-ventas-bloque">
                <span className="resultado-ventas-label">Dinero en efectivo</span>
                <span className="resultado-ventas">
                  {venta.total_efectivo? formatCOP(venta.total_efectivo) : formatCOP(0)}
                </span>
              </div>
              <div className="resultado-ventas-bloque">
                <span className="resultado-ventas-label">Dinero en transferencia</span>
                <span className="resultado-ventas">
                  {venta.total_transferencia? formatCOP(venta.total_transferencia) : formatCOP(0)}
                </span>
              </div>
              <div className="resultado-ventas-bloque">
                <span className="resultado-ventas-label">ventas</span>
                <span className="resultado-ventas">
                  {venta.cantidad_ventas}
                </span>
              </div>

              <div className="resultado-total-bloque">
                <span className="resultado-total-label">total</span>
                <span className="resultado-total">
                  {formatCOP(venta.total_dia)}
                </span>
              </div>

              <button
                className="btn-detalle"
                onClick={() => toggleDetalle(fecha)}
              >
                {estaAbierto ? "▲ Ocultar" : "▼ Ver detalle"}
              </button>

              {estaAbierto && (
                <DetallePanel
                  estaCargando={estaCargando}
                  ventasDelDia={ventasDelDia}
                />
              )}
            </div>
          );
        })
      )}

      <div className="total-general">
        <p>
          💰 Total efectivo <br />
          {formatCOP(granTotalEfectivo)}
        </p>
        <p>
          💰 Total transferencia <br />
          {formatCOP(granTotalTransferencia)}
        </p>
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
