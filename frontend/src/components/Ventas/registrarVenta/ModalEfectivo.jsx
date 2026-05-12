import { useState } from 'react'
import './RegistrarVenta.css'

import {formatCOP} from '../../../hooks/fromatCOP.js'

function ModalEfectivo({ visible, total, onConfirmar, onCancelar }) {
  const [montoPagado, setMontoPagado] = useState('')

  if (!visible) return null

  const monto = Number(montoPagado.replace(/\D/g, ''))
  const cambio = monto - total
  const insuficiente = monto > 0 && monto < total
  const suficiente = monto >= total && monto > 0

  const handleCancelar = () => {
    setMontoPagado('')
    onCancelar()
  }

  const handleConfirmar = () => {
    setMontoPagado('')
    onConfirmar()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__titulo">Pago en efectivo</h2>

        <div className="modal__total">
          <span>Total a cobrar</span>
          <span>{formatCOP(total)}</span>
        </div>

        <div className="modal__efectivo">
          <label className="modal__label">¿Con cuánto pagó el cliente?</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="$ 0"
            className="modal__input"
            autoFocus
            value={
              montoPagado
                ? new Intl.NumberFormat('es-CO').format(montoPagado.replace(/\D/g, ''))
                : ''
            }
            onChange={(e) => setMontoPagado(e.target.value.replace(/\D/g, ''))}
          />

          {insuficiente && (
            <div className="modal__total" style={{ color: 'var(--color-text-danger)' }}>
              <span>Faltan</span>
              <span>{formatCOP(total - monto)}</span>
            </div>
          )}

          {suficiente && (
            <div className="modal__cambio">
              <span>Devuelta</span>
              <span>{formatCOP(cambio)}</span>
            </div>
          )}
        </div>

        <div className="modal__botones">
          <button className="modal__btn--cancelar" onClick={handleCancelar}>
            Cancelar
          </button>
          <button
            className="modal__btn"
            onClick={handleConfirmar}
            disabled={!montoPagado || monto < total}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalEfectivo