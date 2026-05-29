import sql from "mssql";
import { pool } from "../../db/db.js";

export const getTotalVentasMes = async (fechainicio, fechafinal) => {
  const result = await pool
    .request()
    .input("fechainicio", sql.Date, fechainicio)
    .input("fechafinal", sql.Date, fechafinal)
    .query(`
      SELECT 
        ISNULL(SUM(total), 0)  AS total_ventas,
        
         SUM(CASE
        WHEN metodo_pago = 'Efectivo'
        THEN total
        ELSE 0
    END) AS efectivo,
    SUM(CASE
        WHEN metodo_pago = 'Transferencia'
        THEN total
        ELSE 0
    END) AS transferencia,
    COUNT(*)               AS cantidad_ventas
      FROM ventas
      WHERE fecha >= @fechainicio AND fecha <= @fechafinal
    `);
  return result.recordset[0];
};

export const getVentasGastosPorDia = async (fechaInicio, fechaFin) => {
  const result = await pool
    .request()
    .input("fechaInicio", sql.DateTime, fechaInicio)
    .input("fechaFin",    sql.DateTime, fechaFin)
    .query(`
      SELECT
        CAST(fecha AS DATE) AS dia,
        SUM(total)          AS ventas
      FROM ventas
      WHERE fecha >= @fechaInicio AND fecha <= @fechaFin
      GROUP BY CAST(fecha AS DATE)
      ORDER BY dia
    `);
  return result.recordset;
};