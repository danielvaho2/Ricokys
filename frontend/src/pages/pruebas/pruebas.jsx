import {
  getProductos,
  registrarVenta,
  insertarProducto,
  eliminarProducto,
  updateProducto,
  desactivarProducto,
  activarProducto,
  getProductosActivos,
  getProductosInactivos
} from "../../services/crud";
import { useEffect, useState } from "react";
import "./pruebas.css";

function Prueba() {
  const [productos, setProductos] = useState([]);
  const [busquedaBuscar, setBusquedaBuscar] = useState("");
  const [busquedaEliminar, setBusquedaEliminar] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [productosActivos, setProductosActivos] = useState([]);
  const [productosInactivos, setProductosInactivos] = useState([]);
  

  useEffect(() => {
    getProductos().then(setProductos);
    getProductosActivos().then(setProductosActivos);
    getProductosInactivos().then(setProductosInactivos);
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
      
      console.log("🧾 VENTA:");
      console.log("Producto:", producto.nombre);
      console.log("Precio:", producto.precio);
      console.log("Respuesta backend:", res);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
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
      alert('El producto esta asociado a una venta, no se puede eliminar');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const nuevoPrecio = prompt("Ingrese el nuevo precio:");
      if (nuevoPrecio === null) return; // El usuario canceló la acción
      const res = await updateProducto({ id, precio: Number(nuevoPrecio) });
      console.log("Producto actualizado:", res);  
      // Recargar la lista de productos
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleDesactivar = async (id) => {
    try {
      const res = await desactivarProducto({ id }); 
      alert('Producto desactivado');
      console.log('Producto desactivado',res)
      // Recargar la lista de productos
      const activos = await getProductosActivos();
      setProductosActivos(activos);
      const desactivados = await getProductosInactivos();
      setProductosInactivos(desactivados);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleActivar = async (id) => {
    try {
      const res = await activarProducto({ id });
      alert('Producto activado');
      console.log('Producto activado',res)
     
      const desactivados = await getProductosInactivos();
      setProductosInactivos(desactivados);
      const activos = await getProductosActivos();
      setProductosActivos(activos);
    } catch (err) {
      console.error(err.message);
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

      {/* 🟢 SECCIÓN 4: eliminar */}
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


      {/* 🔵 SECCIÓN 5: update */}
      <div className="panel">

        <h1>Actualizar producto</h1>

         {productos.map((producto) => (
          <p key={producto.id}>
            {producto.nombre} - {producto.precio}
            <button onClick={() => handleUpdate(producto.id)}>actualizar</button>
          </p>
        ))}
      </div>
      {/* 🔵 SECCIÓN 6: desactivar */}
      <div className="panel">

        <h1>Desactivar producto</h1>

         {productosActivos.map((producto) => (
          <p key={producto.id}>
            {producto.nombre} - {producto.precio}
            <button onClick={() => handleDesactivar(producto.id)}>desactivar</button>
          </p>
        ))}
      </div>
      {/* 🔵 SECCIÓN 7: activar */}
      <div className="panel">

        <h1>Activar producto</h1>

         {productosInactivos.map((producto) => (
          <p key={producto.id}>
            {producto.nombre} - {producto.precio}
            <button onClick={() => handleActivar(producto.id)}>activar</button>
          </p>
        ))}
      </div>
       
      
    </div>
  );
}


export default Prueba
