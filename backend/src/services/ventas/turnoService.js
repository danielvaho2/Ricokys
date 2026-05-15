import sql from 'mssql'
import { pool } from "../../db/db.js";

export const getActivo = async () => {
  const result = await pool
    .request()
    .query(`SELECT TOP 1 * FROM turnos WHERE estado = 'abierto' `);
  return result.recordset[0] || null;
};

export const abrir = async () => {
  const activo = await getActivo();
  if (activo) throw new Error("Ya hay un turno acrivo");

  const result = await pool
    .request()
    .query(
      `INSERT INTO turnos (fecha_inicio, estado) OUTPUT INSERTED.* VALUES (GETDATE(), 'abierto')`,
    );

  return result.recordset[0];
};

export const cerrar = async () => {
  const activo = await getActivo();
  if (!activo) throw new Error("No hay turno activo");

  const resumenResult = await pool.request().input("turno_id", activo.id)
    .query(`
      SELECT 
        COUNT(*) AS cantidad_ventas,
        ISNULL(SUM(total), 0) AS total,
        ISNULL(SUM(CASE WHEN metodo_pago = 'efectivo' THEN total ELSE 0 END), 0) AS efectivo,
        ISNULL(SUM(CASE WHEN metodo_pago = 'transferencia' THEN total ELSE 0 END), 0) AS transferencia
      FROM ventas
      WHERE turno_id = @turno_id
    `);

  const resumen = resumenResult.recordset[0];

  await pool
    .request()
    .input("id", activo.id)
    .query(
      "UPDATE turnos SET fecha_fin = GETDATE(), estado = 'cerrado' WHERE id = @id",
    );

  return {
    turno_id: activo.id,
    fecha_inicio: activo.fecha_inicio,
    cantidad_ventas: resumen.cantidad_ventas,
    total: resumen.total,
    efectivo: resumen.efectivo,
    transferencia: resumen.transferencia,
  };
};

export const getInventarioTurno = async (turno_id) => {
  const result = await pool.request()
    .input('turno_id', sql.Int, turno_id)
    .query(`
      SELECT
        p.nombre,
        SUM(dv.cantidad) AS vendidos
      FROM detalle_venta dv
      JOIN productos p ON dv.producto_id = p.id
      JOIN ventas v ON dv.venta_id = v.id
      WHERE v.turno_id = @turno_id
      GROUP BY p.nombre
      ORDER BY vendidos DESC
    `)
  return result.recordset
}