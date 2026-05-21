import {
  ComposedChart, Bar, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { formatCOP } from "../../hooks/fromatCOP.js";

import './BalanceGrafica.css';

const formatTooltip = (value) => formatCOP(value);

function BalanceGrafica({ datos }) {
  if (!datos || datos.length === 0) {
    return <p className="balance-sin-datos">Sin datos para graficar este mes.</p>;
  }

  return (
    <div className="balance-grafica-wrapper">
      <h2 className="balance-seccion__titulo">Evolución del mes</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={datos} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="dia"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip formatter={formatTooltip} />
          <Legend
            wrapperStyle={{ fontSize: 12 }}
          />

          {/* Barras */}
          <Bar dataKey="ventas"  name="Ventas"  fill="#1d9e75" radius={[4,4,0,0]} />
          <Bar dataKey="gastos"  name="Gastos"  fill="#e05252" radius={[4,4,0,0]} />

          {/* Línea de tendencia de ganancia */}
          <Line
            type="monotone"
            dataKey="ganancia"
            name="Ganancia"
            stroke="#f5a623"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#f5a623" }}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BalanceGrafica;