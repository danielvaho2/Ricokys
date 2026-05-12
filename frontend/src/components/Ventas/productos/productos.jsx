import "./productos.css";

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

function Productos({ productos = [], agregarAlCarrito, loading = false, }) {
    if (loading) {
    return (
      <section className="contenedor-productos-section">
        <h1 className="contenedor-productos-titulo">
          Productos
        </h1>

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
        {productos.map((producto) => (
          <button
            className="contenedor-productos-producto"
            key={producto.id}
             onClick={() => agregarAlCarrito(producto)}
          >
            <p className="contenedor-productos-producto-nombre">
              {producto.nombre.toUpperCase()}
            </p>
            <p className="contenedor-productos-producto-precio">
              {formatCOP(producto.precio)}
            </p>
          </button>
        ))}
      </div>
    </section>
  )
}

export default Productos;