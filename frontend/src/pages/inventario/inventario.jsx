import "./inventario.css";
import { useState } from "react";
import { useInventario } from "../../hooks/inventario/useInventario.js";
import { formatCOP } from "../../hooks/fromatCOP.js";

const getEstado = (stock) => {
  if (stock === 0) return { label: "Sin stock", clase: "badge--out" };
  if (stock <= 5) return { label: "Stock bajo", clase: "badge--low" };
  return { label: "Disponible", clase: "badge--ok" };
};

function Inventario() {
  const { productos, loading, error, guardando, editarStock } = useInventario();
  const [editando, setEditando] = useState(null); // { id, stock }
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const handleGuardar = async (id) => {
    await editarStock(id, Number(editando.stock));
    setEditando(null);
  };

  if (loading) return <p className="inventario-cargando">Cargando...</p>;
  if (error) return <p className="inventario-error">{error}</p>;

  return (
    <div className="inventario-page">
      <div className="inventario-header">
        <div>
          <h1 className="inventario-titulo">Inventario</h1>
          <p className="inventario-subtitulo">{productos.length} productos</p>
        </div>
      </div>

      <input
        className="inventario-buscador"
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

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
                  <td>{formatCOP(p.precio)}</td>
                  <td>
                    {estaEditando ? (
                      <input
                        className="stock-input"
                        type="number"
                        min="0"
                        value={editando.stock}
                        onChange={(e) =>
                          setEditando({ ...editando, stock: e.target.value })
                        }
                        autoFocus
                      />
                    ) : (
                      p.stock
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
                            onClick={() => handleGuardar(p.id)}
                            disabled={estaGuardando}
                          >
                            {estaGuardando ? "Guardando..." : "✓ Guardar"}
                          </button>
                          <button
                            className="btn-accion btn-cancelar"
                            onClick={() => setEditando(null)}
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn-accion btn-editar"
                          onClick={() =>
                            setEditando({ id: p.id, stock: p.stock })
                          }
                        >
                          ✏️ Editar stock
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventario;
