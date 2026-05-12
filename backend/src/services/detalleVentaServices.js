import {pool} from '../db/db.js'

export const getDetalleVenta = async ()=>{
    const result = await pool.request().query(`SELECT * from detalle_venta`);
    return result.recordset
}