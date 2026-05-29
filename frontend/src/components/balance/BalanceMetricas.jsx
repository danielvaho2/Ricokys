import { formatCOP } from "../../hooks/fromatCOP.js";

function BalanceMetricas({ totalVentas,totalGastos, totalGastosMes, modo }) {
  const neto = totalVentas.total_ventas - totalGastos;
  const esDiario = modo === "diario";

  return (
    <div className="balance-metricas">
      <div className="balance-metrica">
        <label>{esDiario ? "Ventas del día" : "Ventas del mes"}</label>
        <span className="balance-metrica__valor verde">{formatCOP(totalVentas.total_ventas)}</span>
      </div>
      <div className="balance-metrica">
        <label>{esDiario ? "Total en transferencia" : "Total en transferencia"}</label>
        <span className="balance-metrica__valor verde">{formatCOP(totalVentas.transferencia)}</span>
      </div>
      <div className="balance-metrica">
        <label>{esDiario ? "Total en efectivo" : "Total en efectivo"}</label>
        <span className="balance-metrica__valor verde">{formatCOP(totalVentas.efectivo)}</span>
      </div>
      <div className="balance-metrica">
        <label>{esDiario ? "Gastos del día" : "Gastos del mes"}</label>
        <span className="balance-metrica__valor rojo">{formatCOP(totalGastos)}</span>
      </div>
      <div className="balance-metrica">
        <label>{esDiario ? "Balance del día" : "Balance del mes"}</label>
        <span className={`balance-metrica__valor ${neto >= 0 ? "verde" : "rojo"}`}>
          {formatCOP(neto)}
        </span>
      </div>
      <div className="balance-metrica">
        <label>{esDiario ? "Gastos registrados hoy" : "Gastos registrados"}</label>
        <span className="balance-metrica__valor azul">{totalGastosMes}</span>
      </div>
    </div>
  );
}

export default BalanceMetricas;