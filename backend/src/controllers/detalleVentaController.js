import * as detalleVentaService from '../services/detalleVentaServices.js'

export const getDetalleVenta = async(req,res)=>{
    try{
const detalle = await detalleVentaService.getDetalleVenta();
res.json(detalle)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}