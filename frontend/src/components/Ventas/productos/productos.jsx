import "./productos.css";

import { formatCOP } from "../../../hooks/fromatCOP.js";
function Productos({ productos = [], agregarAlCarrito, loading = false }) {
  if (loading) {
    return (
      <section className="contenedor-productos-section">
        <h1 className="contenedor-productos-titulo">Productos</h1>

        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </section>
    );
  }
  return (
    <section className="contenedor-productos-section">
      <h1 className="contenedor-productos-titulo">Productos</h1>
      <div className="contenedor-productos">
        {productos.map((producto) => {
          const sinStock = producto.stock === 0;
          const stockBajo = producto.stock > 0 && producto.stock < 10;

          return (
            <button
              key={producto.id}
              className={`contenedor-productos-producto ${
                sinStock ? "producto-deshabilitado" : ""
              }`}
              onClick={() => {
                if (!sinStock) agregarAlCarrito(producto);
              }}
              disabled={sinStock}
            >
              {/* BANDA DIAGONAL */}
              {sinStock && <div className="ribbon-disabled">SIN STOCK</div>}

              {/* STOCK BAJO */}
              {stockBajo && (
                <p className="contenedor-productos-producto-stock stock-alerta">
                  {producto.stock} unidad{producto.stock === 1 ? "" : "es"}{" "}
                  disponible
                </p>
              )}

              <p className="contenedor-productos-producto-nombre">
                {producto.nombre.toUpperCase()}
              </p>

              <p className="contenedor-productos-producto-precio">
                {formatCOP(producto.precio)}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Productos;
