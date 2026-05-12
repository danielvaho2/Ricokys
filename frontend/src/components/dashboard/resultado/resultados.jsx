import './resultados.css'
import {formatCOP} from '../../../hooks/fromatCOP.js'

const formatFecha = (fecha) => {
  if (!fecha) return "";
  return fecha.split("T")[0];
};

function Resultados({ ventasRango, totalRango  }) {
    const granTotal = totalRango?.gran_total_ventas || 0;

    const cantidadVentas = ventasRango.reduce((acc,venta)=> acc + venta.cantidad_ventas,0);
  return (
    <div>
      {ventasRango.length === 0? (<p>No hay datos en ese rango</p>): <>
      {ventasRango.map((venta, index) => (
        <p key={index}>
          venta del día {formatFecha(venta.dia)} - {formatCOP(venta.total_dia)}
        </p>
      ))}
      </>}
     
      {/* TOTAL GENERAL */}
      <div className="total-general">

        <p>Total: {formatCOP(granTotal)}</p>

        
        <p >
          Total de ventas: {cantidadVentas}
        </p>
      
      </div>
    </div>
  );
}

export default Resultados;