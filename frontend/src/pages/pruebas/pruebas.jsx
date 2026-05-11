import {
  getProductos,
  registrarVenta,
  insertarProducto,
  eliminarProducto,
  getAll,
} from "../../services/api";
import { useEffect, useState } from "react";
import "./pruebas.css";

function Prueba() {
  const [productos, setProductos] = useState([]);
  const [busquedaBuscar, setBusquedaBuscar] = useState("");
  const [busquedaEliminar, setBusquedaEliminar] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

  useEffect(() => {
    getAll().then(setVentas);
  }, []);

  const productosFiltradosBuscar = productos.filter((p) =>
    (p.nombre || "").toLowerCase().includes(busquedaBuscar.toLowerCase()),
  );
  const productosFiltradosEliminar = productos.filter((p) =>
    (p.nombre || "").toLowerCase().includes(busquedaEliminar.toLowerCase()),
  );

  const handleVenta = async (producto) => {
    try {
      const res = await registrarVenta({
        productos: [
          {
            producto_id: producto.id,
            cantidad: 1,
          },
        ],
        metodo_pago: "efectivo",
      });
      const data = await getAll();
      setVentas(data);
      // 🔥 AQUÍ VES LO QUE SE VENDIÓ
      console.log("🧾 VENTA:");
      console.log("Producto:", producto.nombre);
      console.log("Precio:", producto.precio);
      console.log("Respuesta backend:", res);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleInsertar = async () => {
    try {
      const res = await insertarProducto({
        nombre,
        precio: Number(precio),
      });

      console.log("Producto insertado:", res);

      // refrescar lista
      const data = await getProductos();
      setProductos(data);

      setNombre("");
      setPrecio("");
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleEliminar = async (id) => {
    try {
      const res = await eliminarProducto({ id });
      console.log("Producto eliminado:", res);
      // Recargar la lista de productos
      const data = await getProductos();
      setProductos(data);
      setBusquedaEliminar("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="grid-container">
      {/* 🔵 SECCIÓN 1: PRODUCTOS */}
      <div className="panel">
        <h1>Productos</h1>

        {productos.map((producto) => (
          <p key={producto.id}>
            {producto.nombre} - {producto.precio}
            <button onClick={() => handleVenta(producto)}>Vender</button>
          </p>
        ))}
      </div>

      {/* 🟢 SECCIÓN 2: BÚSQUEDA */}
      <div className="panel">
        <h2>Buscar productos</h2>

        <input
          placeholder="producto para buscar"
          value={busquedaBuscar}
          onChange={(e) => setBusquedaBuscar(e.target.value)}
        />

        {busquedaBuscar.length > 0 &&
          productosFiltradosBuscar.map((producto) => (
            <p key={producto.id}>
              {producto.nombre} - {producto.precio}
            </p>
          ))}
      </div>

      {/* 🟢 SECCIÓN 3: insertar */}
      <div className="panel">
        <h2>Insertar producto</h2>

        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          placeholder="Precio"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <button onClick={handleInsertar}>Insertar</button>
      </div>

      {/* 🟢 SECCIÓN 3: eliminar */}
      <div className="panel">
        <h2>Eliminar producto</h2>

        <input
          value={busquedaEliminar}
          onChange={(e) => setBusquedaEliminar(e.target.value)}
          placeholder="Busca un producto"
        />
        {busquedaEliminar.length > 0 &&
          productosFiltradosEliminar.map((producto) => (
            <p className="eliminar" key={producto.id}>
              {producto.nombre} - {producto.precio}
              <button onClick={() => handleEliminar(producto.id)}>
                Elimianr
              </button>
            </p>
          ))}
      </div>

      {/* 🟢 SECCIÓN 3: eliminar */}
      <div className="panel">
        <h1>Ventas producto</h1>

        {ventas.map((venta) => (
          <div key={venta.id}>
            <p>
              {venta.metodo_pago}
              {venta.fecha}
            </p>
            {venta.detalle.map((item, index) => (
              <p key={index}>{item.nombre}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prueba;
