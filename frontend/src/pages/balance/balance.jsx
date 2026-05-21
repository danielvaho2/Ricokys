import "./balance.css";
import { useGastos } from "../../hooks/gastos/useGastos";
import BalanceMetricas from "../../components/balance/BalanceMetricas";
import BalanceTabla from "../../components/balance/BalanceTabla";
import BalanceForm from "../../components/balance/BalanceForm";

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function Balance() {
  const {
    gastos,
    totalGastos,
    totalVentas,
    loading,
    error,
    guardando,
    mes,
    año,
    totalGastosMes,
    setMes,
    setAño,
    agregarGasto,
    eliminarGasto,
  } = useGastos();

  return (
    <div className="balance-page">
      <div className="balance-header">
        <div>
          <h1 className="balance-titulo">Balance</h1>
          <p className="balance-subtitulo">Resumen financiero mensual</p>
        </div>
        <div className="balance-selector">
          <select value={mes} onChange={(e) => setMes(Number(e.target.value))}>
            {MESES.map((m, i) => (
              <option key={i} value={i}>
                {m}
              </option>
            ))}
          </select>
          <select value={año} onChange={(e) => setAño(Number(e.target.value))}>
            {[2025, 2026, 2027].map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <BalanceMetricas totalVentas={totalVentas} totalGastos={totalGastos} totalGastosMes={totalGastosMes} />

      {loading && <p className="balance-cargando">Cargando...</p>}
      {error && <p className="balance-error">{error}</p>}

      <div className="balance-seccion">
        <h2 className="balance-seccion__titulo">Gastos registrados</h2>
        <BalanceTabla gastos={gastos} onEliminar={eliminarGasto} />
        <BalanceForm onAgregar={agregarGasto} guardando={guardando} />
      </div>
    </div>
  );
}

export default Balance;
