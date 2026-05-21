import sql from "mssql";
import { pool } from "../../db/db.js";

export const getTotalVentasMes = async (mes, año) => {
  const result = await pool
    .request()
    .input("mes", sql.Int, mes)
    .input("año", sql.Int, año)
    .query(`
      SELECT 
        ISNULL(SUM(total), 0)  AS total_ventas,
        COUNT(*)               AS cantidad_ventas
      FROM ventas
      WHERE MONTH(fecha) = @mes AND YEAR(fecha) = @año
    `);
  return result.recordset[0];
};