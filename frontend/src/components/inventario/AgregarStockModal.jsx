function AgregarStockModal({
  producto,
  cantidadAgregar,
  setCantidadAgregar,
  onGuardar,
  onCerrar,
  isSaving,
}) {
  if (!producto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-stock">
        <h2>Agregar stock</h2>

        <p>
          Producto: <strong>{producto.nombre}</strong>
        </p>

        <input
          className="stock-input"
          type="number"
          min="1"
          value={cantidadAgregar}
          onChange={(e) => setCantidadAgregar(e.target.value)}
        />

        <div className="modal-botones">
          <button
            className="btn-accion btn-guardar"
            onClick={onGuardar}
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar"}
          </button>

          <button className="btn-accion btn-cancelar" onClick={onCerrar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgregarStockModal;
