import {pool} from '../db/db.js'

export const getProducto = async ()=>{
const result = await pool.request().query('SELECT * from productos ');

  return result.recordset;

}