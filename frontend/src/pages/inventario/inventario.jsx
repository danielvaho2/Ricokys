import "./inventario.css";
import { useState } from "react";
import { useInventario } from "../../hooks/inventario/useInventario.js";
import InventarioTable from "../../components/inventario/InventarioTable.jsx";
import AgregarStockModal from "../../components/inventario/AgregarStockModal.jsx";

function Inventario() {
  const { productos, loading, error, guardando, editarStock, agregaStock } =
    useInventario();

  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  // Modal agregar stock
  const [modalStock, setModalStock] = useState(null);
  const [cantidadAgregar, setCantidadAgregar] = useState(1);

  const handleGuardar = async (id) => {
    if (!editando) {
      return;
    }

    const stock = Number(editando.stock);

    if (editando.stock === "" || isNaN(stock) || stock < 0) {
      alert("El stock debe ser un número válido y no negativo");
      return;
    }

    await editarStock(id, stock);

    setEditando(null);
  };

  const handleAgregarStock = async () => {
    const cantidad = Number(cantidadAgregar);

    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Ingrese una cantidad válida");
      return;
    }

    await agregaStock(modalStock.id, cantidad);

    setModalStock(null);
    setCantidadAgregar(1);
  };

  const handleEditar = (value) => setEditando(value);

  const handleAbrirModal = (producto) => {
    setModalStock(producto);
    setCantidadAgregar(0);
  };

  if (loading) {
    return <p className="inventario-cargando">Cargando...</p>;
  }

  if (error) {
    return <p className="inventario-error">{error}</p>;
  }

  return (
    <>
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

        <InventarioTable
          productos={productos}
          busqueda={busqueda}
          editando={editando}
          guardando={guardando}
          onEditar={handleEditar}
          onGuardar={handleGuardar}
          onCancelar={() => setEditando(null)}
          onAbrirModal={handleAbrirModal}
        />
      </div>

      <AgregarStockModal
        producto={modalStock}
        cantidadAgregar={cantidadAgregar}
        setCantidadAgregar={setCantidadAgregar}
        onGuardar={handleAgregarStock}
        onCerrar={() => setModalStock(null)}
        isSaving={Boolean(guardando && modalStock?.id === guardando)}
      />
    </>
  );
}

export default Inventario;
