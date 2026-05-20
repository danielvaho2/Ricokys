import { pool } from "../../db/db.js";
import sql from "mssql";

export const getProducto = async () => {
  const result = await pool.request().query("SELECT * from productos where activo = 1");

  return result.recordset;
};

export const getProductoActivo = async () => {
  const result = await pool
    .request()
    .query("SELECT * from productos WHERE activo = 1");
    return result.recordset;
}

export const getProductoInactivo = async () => {
  const result = await pool
    .request()
    .query("SELECT * from productos WHERE activo = 0");
    return result.recordset;
}

export const actualizarStock = async ({ id, stock }) => {
  const result = await pool
    .request()
    .input('id', sql.Int, id)
    .input('stock', sql.Int, stock)
    .query(`
      UPDATE productos SET stock = @stock WHERE id = @id
    `);
  return result;
};