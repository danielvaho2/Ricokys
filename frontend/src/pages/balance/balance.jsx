import "./balance.css";
import { useGastos } from "../../hooks/gastos/useGastos";
import BalanceMetricas from "../../components/balance/BalanceMetricas";
import BalanceTabla from "../../components/balance/BalanceTabla";
import BalanceForm from "../../components/balance/BalanceForm";
import BalanceGrafica from "../../components/balance/BalanceGrafica";

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
    totalGastosMes,
    totalVentas,
    loading,
    error,
    guardando,
    modo,
    datosGrafica,
    setModo,
    mes,
    setMes,
    año,
    setAño,
    dia,
    setDia,
    agregarGasto,
    eliminarGasto,
  } = useGastos();

  return (
    <div className="balance-page">
      {/* ── Header ── */}
      <div className="balance-header">
        <div>
          <h1 className="balance-titulo">Balance</h1>
          <p className="balance-subtitulo">
            {modo === "diario" ? "Resumen del día" : "Resumen mensual"}
          </p>
        </div>

        <div className="balance-controles">
          {/* Toggle diario / mensual */}
          <button
            className="balance-toggle"
            onClick={() => setModo(modo === "diario" ? "mensual" : "diario")}
          >
            {modo === "diario" ? "📅 Ver mensual" : "📆 Ver diario"}
          </button>

          {/* Selector según modo */}
          {modo === "diario" ? (
            <input
              className="balance-input-fecha"
              type="date"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
            />
          ) : (
            <div className="balance-selector">
              <select
                value={mes}
                onChange={(e) => setMes(Number(e.target.value))}
              >
                {MESES.map((m, i) => (
                  <option key={i} value={i}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={año}
                onChange={(e) => setAño(Number(e.target.value))}
              >
                {[2025, 2026, 2027].map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* ── Métricas ── */}
      <BalanceMetricas
        totalVentas={totalVentas}
        totalGastos={totalGastos}
        totalGastosMes={totalGastosMes}
        modo={modo}
      />

      {loading && <p className="balance-cargando">Cargando...</p>}
      {error && <p className="balance-error">{error}</p>}

      {/* ── Gastos ── */}
      <div className="balance-seccion">
        <h2 className="balance-seccion__titulo">
          Gastos {modo === "diario" ? `del ${dia}` : `de ${MESES[mes]} ${año}`}
        </h2>
        <BalanceTabla
          key={`${modo}-${mes}-${año}-${dia}`}
          gastos={gastos}
          onEliminar={eliminarGasto}
        />
        <BalanceForm onAgregar={agregarGasto} guardando={guardando} />
        {modo === "mensual" && <BalanceGrafica datos={datosGrafica} />}
      </div>
    </div>
  );
}

export default Balance;
