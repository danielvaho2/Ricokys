import { formatCOP } from "../../../hooks/fromatCOP.js";

const getEstado = (stock) => {
  const stockNumber = Number(stock);

  if (stockNumber === 0) {
    return {
      label: "Sin stock",
      clase: "badge--out",
    };
  }

  if (stockNumber <= 5) {
    return {
      label: "Stock bajo",
      clase: "badge--low",
    };
  }

  return {
    label: "Disponible",
    clase: "badge--ok",
  };
};

function InventarioTable({
  productos,
  busqueda,
  editando,
  guardando,
  onEditar,
  onGuardar,
  onCancelar,
  onAbrirModal,
}) {
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div className="inventario-tabla-wrapper">
      <table className="inventario-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productosFiltrados.map((p) => {
            const estado = getEstado(p.stock);
            const estaEditando = editando?.id === p.id;
            const estaGuardando = guardando === p.id;

            return (
              <tr key={p.id}>
                <td className="td-nombre">{p.nombre}</td>

                <td>{formatCOP(Number(p.precio))}</td>

                <td>
                  {estaEditando ? (
                    <input
                      className="stock-input"
                      type="number"
                      min="0"
                      value={editando.stock}
                      onChange={(e) =>
                        onEditar({ ...editando, stock: e.target.value })
                      }
                      autoFocus
                    />
                  ) : (
                    Number(p.stock)
                  )}
                </td>

                <td>
                  <span className={`badge ${estado.clase}`}>
                    {estado.label}
                  </span>
                </td>

                <td>
                  <div className="td-acciones">
                    {estaEditando ? (
                      <>
                        <button
                          className="btn-accion btn-guardar"
                          onClick={() => onGuardar(p.id)}
                          disabled={estaGuardando}
                        >
                          {estaGuardando ? "Guardando..." : "✓ Guardar"}
                        </button>

                        <button
                          className="btn-accion btn-cancelar"
                          onClick={onCancelar}
                          disabled={estaGuardando}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn-accion btn-editar"
                          onClick={() =>
                            onEditar({ id: p.id, stock: Number(p.stock) })
                          }
                          disabled={estaGuardando}
                        >
                          ✏️ Editar stock
                        </button>

                        <button
                          className="btn-accion btn-agregar"
                          onClick={() => onAbrirModal(p)}
                          disabled={estaGuardando}
                        >
                          ➕ Agregar stock
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InventarioTable;
