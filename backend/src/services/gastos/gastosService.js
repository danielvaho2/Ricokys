import sql from "mssql";
import { pool } from "../../db/db.js";

export const getGastos = async (fechaInicio, fechaFin) => {
  const result = await pool
    .request()
    .input("fechaInicio", sql.DateTime, fechaInicio)
    .input("fechaFin", sql.DateTime, fechaFin)
    .query(`
      SELECT * FROM gastos
      WHERE fecha >= @fechaInicio AND fecha <= @fechaFin
      ORDER BY fecha DESC
    `);
  return result.recordset;
};

export const createGasto = async ({nombre, descripcion, monto, categoria}) => {

    const result = await pool
    .request()
    .input("nombre", sql.VarChar(255), nombre)
    .input("descripcion", sql.Text, descripcion)
    .input("monto", sql.Decimal(18, 2), monto)
    .input("categoria", sql.VarChar(255), categoria)
    .query(`
      INSERT INTO gastos (nombre, descripcion, monto, categoria)
      VALUES (@nombre, @descripcion, @monto, @categoria);
      SELECT SCOPE_IDENTITY() AS id;
    `);  
    return result.recordset[0].id;
}

export const updateGasto = async (id, {nombre, descripcion, monto, categoria}) => {
    await pool
    .request()
    .input("id", sql.Int, id)
    .input("nombre", sql.VarChar(255), nombre)
    .input("descripcion", sql.Text, descripcion)
    .input("monto", sql.Decimal(18, 2), monto)
    .input("categoria", sql.VarChar(255), categoria)
    .query(`
      UPDATE gastos
      SET nombre = @nombre, descripcion = @descripcion, monto = @monto, categoria = @categoria
      WHERE id = @id;
    `);
};

export const deleteGasto = async (id) => {
    await pool
    .request()
    .input("id", sql.Int, id)
    .query(`
      DELETE FROM gastos
      WHERE id = @id;
    `);
};
