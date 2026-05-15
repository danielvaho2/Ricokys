import sql from "mssql";
import { pool } from "../db/db.js";

export const insertarProducto = async ({ nombre, precio }) => {
  const result = await pool
    .request()
    .input("nombre", sql.VarChar, nombre)
    .input("precio", sql.Int, precio).query(`
      INSERT INTO Productos (nombre, precio)
      VALUES (@nombre, @precio);
    `);
  return result;
};

export const eliminarProducto = async ({ id }) => {
  const result = await pool.request().input("id", sql.Int, id)
    .query(`DELETE FROM Productos
      WHERE id = @id;`);

  return result;
};

export const updateProducto = async ({ id, precio }) => {
  try {
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("precio", sql.Int, precio).query(`
        UPDATE productos
        SET precio = @precio
        WHERE id = @id
      `);

    return result;
  } catch (error) {
    console.error("Error actualizando producto:", error);
    throw error;
  }
};

export const desactivarProducto = async ({ id }) => {
  try {
    const result = await pool.request().input("id", sql.Int, id)
      .query(`UPDATE Productos
      SET activo = 0
      WHERE id = @id;`);
    return result;
  } catch (error) {
    console.error("Error desactivando producto:", error);
    throw error;
  }
};

export const activarProducto = async ({ id }) => {
  try {
    const result = await pool.request().input("id", sql.Int, id)
      .query(`UPDATE Productos
      SET activo = 1
      WHERE id = @id;`);
    return result;
  } catch (error) {
    console.error("Error activando producto:", error);
    throw error;
  }
};
