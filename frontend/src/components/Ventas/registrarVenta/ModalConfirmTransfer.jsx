import React from "react";

function ModalConfirmTransfer({ visible, total, onConfirm, onCancel }) {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal__titulo">¿Seguro registrar por transferencia?</h3>

        <div className="modal__detalle">
          <div className="modal__item">
            <span>Total</span>
            <span>{total}</span>
          </div>
        </div>

        <div className="modal__botones">
          <button className="modal__btn--cancelar" onClick={onCancel}>
            Cancelar
          </button>
          <button className="modal__btn" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmTransfer;
