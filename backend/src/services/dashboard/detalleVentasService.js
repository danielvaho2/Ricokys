import {pool} from '../../db/db.js'
import sql from 'mssql'

export const getDetalleVentasPorDia = async (fecha) => {
  const result = await pool
    .request()
    .input("fecha", sql.Date, fecha)
    .query(`
      SELECT
          v.id            AS venta_id,
          v.total,
          v.fecha,
          v.metodo_pago,
          p.nombre        AS producto,
          dv.cantidad,
          dv.precio,
          (dv.cantidad * dv.precio) AS subtotal
      FROM ventas v
      INNER JOIN detalle_venta dv ON dv.venta_id = v.id
      INNER JOIN productos p      ON p.id = dv.producto_id
      WHERE CAST(v.fecha AS DATE) = @fecha
      ORDER BY v.id
    `);

  return result.recordset;
};