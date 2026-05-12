import { pool } from "../../db/db.js";

export const getVentasPorRango = async (fechaInicio, fechaFinal) => {
  const result = await pool
    .request()
    .input(`fechaInicio`, fechaInicio)
    .input(`fechaFinal`, fechaFinal).query(`
    SELECT
    CAST(fecha AS DATE) AS dia,
    COUNT(*) AS cantidad_ventas,
    SUM(total) AS total_dia
FROM ventas
WHERE fecha >= @fechaInicio
AND fecha < @fechaFinal
GROUP BY CAST(fecha AS DATE)
ORDER BY dia
    `);

  return result.recordset;
};

export const getTotalPorRango = async (fechaInicio, fechaFinal) => {
  const result = await pool
    .request()
    .input(`fechaInicio`, fechaInicio)
    .input(`fechaFinal`, fechaFinal).query(`
    SELECT 
    
    SUM(total) AS gran_total_ventas 
FROM ventas 
WHERE fecha >= @fechaInicio AND fecha <= @fechaFinal;
    `);

  return result.recordset;
};
