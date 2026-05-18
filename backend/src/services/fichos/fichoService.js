import { pool } from "../../db/db.js";
import sql from "mssql";

export const getFichos = async (turno_id) => {
  const result = await pool
    .request()
    .input("turno_id", sql.Int, turno_id)
    .query(`
      SELECT 
          f.numero_ficho,
          f.estado,
          p.nombre,
          dv.cantidad

      FROM fichos f

      INNER JOIN ventas v 
          ON f.venta_id = v.id

      INNER JOIN detalle_venta dv 
          ON dv.venta_id = v.id

      INNER JOIN productos p 
          ON p.id = dv.producto_id

      WHERE f.turno_id = @turno_id
      AND f.estado = 'pendiente'

      ORDER BY f.fecha DESC
    `);

  return result.recordset;
};

export const setFichoEstado = async (turno_id, ficho_id) => {
  const result = await pool
    .request()
     .input("turno_id", sql.Int, turno_id)
    .input("ficho_id", sql.Int, ficho_id)
    .input("estado", sql.VarChar, "Entregado")
    .query(`
      UPDATE fichos
      SET estado = @estado
      WHERE turno_id = @turno_id AND numero_ficho = @ficho_id
    `);

  return result;
};