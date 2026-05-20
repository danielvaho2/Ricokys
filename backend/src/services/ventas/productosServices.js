import { pool } from "../../db/db.js";

export const getProducto = async () => {
  const result = await pool
    .request()
    .query("SELECT * from productos where activo = 1");

  return result.recordset;
};

export const getProductoActivo = async () => {
  const result = await pool
    .request()
    .query("SELECT * from productos WHERE activo = 1");
  return result.recordset;
};

export const getProductoInactivo = async () => {
  const result = await pool
    .request()
    .query("SELECT * from productos WHERE activo = 0");
  return result.recordset;
};