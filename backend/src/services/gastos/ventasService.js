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
        COUNT(*)               AS cantidad_ventas
      FROM ventas
      WHERE fecha >= @fechainicio AND fecha <= @fechafinal
    `);
  return result.recordset[0];
};