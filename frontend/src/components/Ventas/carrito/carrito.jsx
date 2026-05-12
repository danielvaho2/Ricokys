import "./carrito.css";
const formatCOP = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
function Carrito({
  carrito = [],
  eliminarDelCarrito,
  aumentarCantidad,
  disminuirCarrito,
}) {
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );

  return (
    <div className="contenedor-carrito">
      <h2 className="contenedor-carrito-titulo">Carrito</h2>

      {carrito.length === 0 ? (
        <p className="contenedor-carrito-vacio">El carrito está vacío</p>
      ) : (
        <ul className="contenedor-carrito-lista">
          {carrito.map((item) => (
            <li key={item.id} className="contenedor-carrito-item">
              <div className="contenedor-carrito-info">
                <span className="contenedor-carrito-nombre">{item.nombre}</span>

                <span className="contenedor-carrito-cantidad">
                    {formatCOP(item.precio)} x {item.cantidad}
                </span>
              </div>

              <div className="contenedor-carrito-botones">
                <button
                  className="contenedor-carrito-boton disminuir"
                  onClick={() => disminuirCarrito(item.id)}
                >
                  -
                </button>
                <button
                  className="contenedor-carrito-boton eliminar"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  X
                </button>
                <button
                  className="contenedor-carrito-boton aumentar"
                  onClick={() => aumentarCantidad(item.id)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="contenedor-carrito-total">Total: {formatCOP(total)}</h3>
    </div>
  );
}

export default Carrito;
