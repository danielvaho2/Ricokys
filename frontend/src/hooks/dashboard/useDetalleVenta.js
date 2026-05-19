// hooks/dashboard/useDetalleVenta.js
import { useState } from "react";
import { getDetalleVentasDia } from "../../services/api.js";

export function useDetalleVenta() {
  const [abierto, setAbierto]   = useState(null);
  const [detalle, setDetalle]   = useState({});
  const [cargando, setCargando] = useState(null);

  const toggleDetalle = async (fecha) => {
    if (abierto === fecha) { setAbierto(null); return; }

    setAbierto(fecha);
    if (detalle[fecha]) return;

    try {
      setCargando(fecha);
      const data = await getDetalleVentasDia(fecha);

      const agrupado = {};
      data.forEach((row) => {
        if (!agrupado[row.venta_id]) {
          agrupado[row.venta_id] = {
            venta_id:    row.venta_id,
            total:       row.total,
            metodo_pago: row.metodo_pago,
            productos:   [],
          };
        }
        agrupado[row.venta_id].productos.push({
          nombre:   row.producto,
          cantidad: row.cantidad,
          subtotal: row.subtotal,
        });
      });

      setDetalle((prev) => ({ ...prev, [fecha]: Object.values(agrupado) }));
    } catch (err) {
      console.error("Error al cargar detalle:", err);
    } finally {
      setCargando(null);
    }
  };

  return { abierto, detalle, cargando, toggleDetalle };
}