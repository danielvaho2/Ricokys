import { formatCOP } from "../../hooks/fromatCOP.js";

const BADGE = {
  Insumos:  "badge-insumos",
  Servicios: "badge-servicios",
  Arriendo: "badge-arriendo",
  Personal: "badge-personal",
  Varios:   "badge-varios",
};

const formatFecha = (fecha) => fecha?.split("T")[0] ?? "";

function BalanceTabla({ gastos, onEliminar }) {
  if (gastos.length === 0) {
    return <p className="balance-sin-datos">No hay gastos registrados este mes.</p>;
  }

  return (
    <div className="balance-tabla-wrapper">
      <table className="balance-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {gastos.map((g) => (
            <tr key={g.id}>
              <td className="td-nombre">{g.nombre}</td>
              <td className="td-descripcion">{g.descripcion || "—"}</td>
              <td>
                <span className={`badge ${BADGE[g.categoria] ?? "badge-varios"}`}>
                  {g.categoria}
                </span>
              </td>
              <td>{formatFecha(g.fecha)}</td>
              <td className="monto-neg">-{formatCOP(Number(g.monto))}</td>
              <td>
                <button
                  className="btn-eliminar"
                  onClick={() => onEliminar(g.id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BalanceTabla;