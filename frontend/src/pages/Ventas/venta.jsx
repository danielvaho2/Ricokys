import "./venta.css";
import { useProductos } from "../../hooks/useProductos";
import { useCarrito } from "../../hooks/useCarrito";
import { useTurno } from "../../hooks/useTurno";
import { useRegistrarVenta } from "../../hooks/useRegistrarVenta";
import Productos from "../../components/productos/productos";
import Carrito from "../../components/carrito/carrito";
import Turno from "../../components/turno/turno";
import RegistrarVenta from "../../components/registrarVenta/registrarVenta";

function Ventas() {
  const { productos, loading: loadingProductos } = useProductos();
  const { carrito, agregarAlCarrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad, vaciar,total } = useCarrito();
  const { turnoActivo, loadingTurno, errorTurno, abrirTurno, cerrarTurno } = useTurno();
  const { registrar, loadingVenta, errorVenta, ventaExitosa, cerrarModal } = useRegistrarVenta({ carrito, vaciar });

  return (
    <div className="contenedor-ventas">
      <Productos
        productos={productos}
        agregarAlCarrito={agregarAlCarrito}
        loading={loadingProductos}
      />

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
        />
      </div>
    </div>
  );
}

export default Ventas;