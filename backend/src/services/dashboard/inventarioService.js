import sql from "mssql";
import { pool } from "../../db/db.js";

export const getProductoStock = async () => {
  const result = await pool
    .request()
    .query("SELECT * from productos where es_combo = 0");

  return result.recordset;
};


export const actualizarStock = async ({ id, stock }) => {
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .input("stock", sql.Int, stock).query(`
      UPDATE productos SET stock = @stock WHERE id = @id
    `);
  return result;
};
