import { formatCOP } from "../../hooks/fromatCOP.js";

function BalanceMetricas({ totalVentas, totalGastos, totalGastosMes }) {
  const neto = totalVentas - totalGastos;

  return (
    <div className="balance-metricas">
      <div className="balance-metrica">
        <label>Ventas del mes</label>
        <span className="balance-metrica__valor verde">{formatCOP(totalVentas)}</span>
      </div>
      <div className="balance-metrica">
        <label>Gastos del mes</label>
        <span className="balance-metrica__valor rojo">{formatCOP(totalGastos)}</span>
      </div>
      <div className="balance-metrica">
        <label>Balance neto</label>
        <span className={`balance-metrica__valor ${neto >= 0 ? "verde" : "rojo"}`}>
          {formatCOP(neto)}
        </span>
      </div>
      <div className="balance-metrica">
        <label>Gastos registrados</label>
        <span className="balance-metrica__valor azul">{totalGastosMes}</span>
      </div>
    </div>
  );
}

export default BalanceMetricas;