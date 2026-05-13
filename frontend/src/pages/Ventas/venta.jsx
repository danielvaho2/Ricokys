import "./venta.css";
import { useState } from "react";

import { useProductos } from "../../hooks/ventas/useProductos";
import { useCarrito } from "../../hooks/ventas/useCarrito";
import { useTurno } from "../../hooks/ventas/useTurno";
import { useRegistrarVenta } from "../../hooks/ventas/useRegistrarVenta";

import Productos from "../../components/Ventas/productos/productos";
import Carrito from "../../components/Ventas/carrito/carrito";
import Turno from "../../components/Ventas/turno/turno";
import RegistrarVenta from "../../components/Ventas/registrarVenta/registrarVenta";

function Ventas() {

  const [vistaMobile, setVistaMobile] = useState("productos");

  const { productos, loading: loadingProductos } = useProductos();

  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    aumentarCantidad,
    disminuirCantidad,
    vaciar,
    total,
  } = useCarrito();

  const {
    turnoActivo,
    resumenTurno,
    loadingTurno,
    errorTurno,
    abrirTurno,
    cerrarTurno,
    limpiarResumen,
  } = useTurno();

  const {
    registrar,
    loadingVenta,
    errorVenta,
    ventaExitosa,
    cerrarModal,
  } = useRegistrarVenta({ carrito, vaciar });

  return (
    <div className="contenedor-ventas">

      {/* NAV MOBILE */}
      <div className="mobile-nav">

        <button
          className={vistaMobile === "productos" ? "activo" : ""}
          onClick={() => setVistaMobile("productos")}
        >
          Productos
        </button>

        <button
          className={vistaMobile === "carrito" ? "activo" : ""}
          onClick={() => setVistaMobile("carrito")}
        >
          Carrito ({carrito.length})
        </button>

      </div>

      {/* PRODUCTOS */}
      <div
        className={`productos-section ${
          vistaMobile !== "productos" ? "mobile-hidden" : ""
        }`}
      >
        <Productos
          productos={productos}
          agregarAlCarrito={agregarAlCarrito}
          loading={loadingProductos}
        />
      </div>

      {/* SIDEBAR */}
      <div
        className={`carrito-section ${
          vistaMobile !== "carrito" ? "mobile-hidden" : ""
        }`}
      >
        <div className="contenedor-sidebar">

          <Carrito
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            aumentarCantidad={aumentarCantidad}
            disminuirCarrito={disminuirCantidad}
          />

          <RegistrarVenta
            carrito={carrito}
            total={total}
            loading={loadingVenta}
            error={errorVenta}
            ventaExitosa={ventaExitosa}
            onRegistrar={registrar}
            onCerrarModal={cerrarModal}
            turnoActivo={turnoActivo}
          />

          <Turno
            turnoActivo={turnoActivo}
            abrirTurno={abrirTurno}
            cerrarTurno={cerrarTurno}
            loading={loadingTurno}
            error={errorTurno}
            resumenTurno={resumenTurno}
            limpiarResumen={limpiarResumen}
          />

        </div>
      </div>

    </div>
  );
}

export default Ventas;