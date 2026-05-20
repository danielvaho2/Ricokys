import sql from "mssql";
import { pool } from "../../db/db.js";
import { getActivo } from "./turnoService.js";

export const create = async ({ productos, metodo_pago }) => {
  const turno = await getActivo();
  if (!turno) throw new Error("No hay turno activo");

  const transaction = new sql.Transaction(pool);
  await transaction.begin();

  try {
    // ── Precios y nombres ──
    const ids = productos.map((p) => p.producto_id);
    const req1 = new sql.Request(transaction);
    const placeholders = ids.map((_, i) => `@id${i}`).join(",");
    ids.forEach((id, i) => req1.input(`id${i}`, sql.Int, id));

    const { recordset: productosDB } = await req1.query(
      `SELECT id, precio, nombre, stock, es_combo FROM productos WHERE id IN (${placeholders})`,
    );

    if (productosDB.length !== ids.length)
      throw new Error("Uno o más productos no existen");

    const precioMap  = {};
    const nombreMap  = {};
    const stockMap   = {};
    const esComboMap = {};
    productosDB.forEach((p) => {
      precioMap[p.id]  = parseFloat(p.precio);
      nombreMap[p.id]  = p.nombre;
      stockMap[p.id]   = p.stock;
      esComboMap[p.id] = p.es_combo;
    });

    // ── Validar stock productos principales (solo los que no son combo) ──
    for (const p of productos) {
      if (esComboMap[p.producto_id]) continue;
      if (stockMap[p.producto_id] < p.cantidad) {
        throw new Error(
          `Stock insuficiente para "${nombreMap[p.producto_id]}" — disponible: ${stockMap[p.producto_id]}`
        );
      }
    }

    // ── Validar stock de ingredientes ──
    for (const p of productos) {
      const reqCheck = new sql.Request(transaction);
      reqCheck.input("producto_id", sql.Int, p.producto_id);
      const { recordset: ingredientes } = await reqCheck.query(`
        SELECT pi.ingrediente_id, pi.cantidad, pr.nombre, pr.stock
        FROM producto_ingredientes pi
        JOIN productos pr ON pr.id = pi.ingrediente_id
        WHERE pi.producto_id = @producto_id
      `);

      for (const ing of ingredientes) {
        const necesario = ing.cantidad * p.cantidad;
        if (ing.stock < necesario) {
          throw new Error(
            `Stock insuficiente de "${ing.nombre}" para preparar "${nombreMap[p.producto_id]}" — disponible: ${ing.stock}, necesario: ${necesario}`
          );
        }
      }
    }

    // ── Total ──
    const total = productos.reduce(
      (acc, p) => acc + precioMap[p.producto_id] * p.cantidad,
      0,
    );

    // ── Insertar venta ──
    const req2 = new sql.Request(transaction);
    req2.input("turno_id", sql.Int, turno.id);
    req2.input("total", sql.Decimal(10, 2), total);
    req2.input("metodo_pago", sql.VarChar(50), metodo_pago);

    const { recordset: ventaRows } = await req2.query(
      `INSERT INTO ventas (turno_id, total, metodo_pago)
       OUTPUT INSERTED.*
       VALUES (@turno_id, @total, @metodo_pago)`,
    );
    const venta = ventaRows[0];

    // ── Insertar detalle ──
    const req3 = new sql.Request(transaction);
    req3.input("venta_id", sql.Int, venta.id);

    const values = productos.map((p, i) => {
      req3.input(`producto_id${i}`, sql.Int, p.producto_id);
      req3.input(`cantidad${i}`, sql.Int, p.cantidad);
      req3.input(`precio${i}`, sql.Decimal(10, 2), precioMap[p.producto_id]);
      return `(@venta_id, @producto_id${i}, @cantidad${i}, @precio${i})`;
    });

    await req3.query(
      `INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio)
       VALUES ${values.join(",")}`,
    );

    // ── Descontar stock producto principal + ingredientes ──
    for (const p of productos) {
      // Solo descuenta stock propio si no es combo
      if (!esComboMap[p.producto_id]) {
        const reqStock = new sql.Request(transaction);
        reqStock.input("producto_id", sql.Int, p.producto_id);
        reqStock.input("cantidad", sql.Int, p.cantidad);
        await reqStock.query(`
          UPDATE productos
          SET stock = stock - @cantidad
          WHERE id = @producto_id AND stock >= @cantidad
        `);
      }

      // Ingredientes se descuentan siempre
      const reqIngredientes = new sql.Request(transaction);
      reqIngredientes.input("producto_id", sql.Int, p.producto_id);
      const { recordset: ingredientes } = await reqIngredientes.query(`
        SELECT ingrediente_id, cantidad
        FROM producto_ingredientes
        WHERE producto_id = @producto_id
      `);

      for (const ing of ingredientes) {
        const reqIng = new sql.Request(transaction);
        reqIng.input("ingrediente_id", sql.Int, ing.ingrediente_id);
        reqIng.input("cantidad", sql.Int, ing.cantidad * p.cantidad);
        await reqIng.query(`
          UPDATE productos
          SET stock = stock - @cantidad
          WHERE id = @ingrediente_id AND stock >= @cantidad
        `);
      }
    }

    // ── Insertar ficho ──
    const req4 = new sql.Request(transaction);
    req4.input("venta_id", sql.Int, venta.id);
    req4.input("turno_id", sql.Int, venta.turno_id);
    req4.input("numero_ficho", sql.Int, venta.id);

    await req4.query(`
      INSERT INTO fichos (venta_id, turno_id, numero_ficho, estado)
      VALUES (@venta_id, @turno_id, @numero_ficho, 'pendiente')
    `);

    await transaction.commit();

    return {
      id:          venta.id,
      total:       venta.total,
      metodo_pago: venta.metodo_pago,
      fecha:       venta.fecha,
      detalle: productos.map((p) => ({
        producto_id: p.producto_id,
        nombre:      nombreMap[p.producto_id],
        cantidad:    p.cantidad,
        precio:      precioMap[p.producto_id],
        subtotal:    precioMap[p.producto_id] * p.cantidad,
      })),
    };
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};
export const getAll = async () => {
  const result = await pool.request().query(`
    SELECT 
      v.id, v.total, v.metodo_pago, v.fecha, v.turno_id,
      dv.producto_id, p.nombre, dv.cantidad, dv.precio
    FROM ventas v
    JOIN detalle_venta dv ON dv.venta_id = v.id
    JOIN productos p ON p.id = dv.producto_id
    ORDER BY v.fecha DESC
  `);

  const map = {};
  for (const row of result.recordset) {
    if (!map[row.id]) {
      map[row.id] = {
        id:          row.id,
        total:       row.total,
        metodo_pago: row.metodo_pago,
        fecha:       row.fecha,
        turno_id:    row.turno_id,
        detalle:     [],
      };
    }
    map[row.id].detalle.push({
      producto_id: row.producto_id,
      nombre:      row.nombre,
      cantidad:    row.cantidad,
      precio:      row.precio,
    });
  }
  return Object.values(map);
};

export const getResumen = async () => {
  const result = await pool.request().query(`
    SELECT metodo_pago, COUNT(*) AS cantidad_ventas, SUM(total) AS total
    FROM ventas
    GROUP BY metodo_pago
  `);
  return result.recordset;
};