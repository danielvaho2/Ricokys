import { useState } from 'react'
import ModalEfectivo from './ModalEfectivo'
import ModalVenta from './ModalVenta'
import './RegistrarVenta.css'

function RegistrarVenta({ carrito, total, loading, error, ventaExitosa, onRegistrar, onCerrarModal,turnoActivo }) {
  const [metodoPago, setMetodoPago] = useState('efectivo')
  const [modalEfectivo, setModalEfectivo] = useState(false)

  const handleRegistrar = () => {
    if (metodoPago === 'efectivo') {
      setModalEfectivo(true)
    } else {
      onRegistrar(metodoPago)
    }
  }

  const handleConfirmarEfectivo = () => {
    setModalEfectivo(false)
    onRegistrar('efectivo')
  }

  return (
    <div className="registrar">
      <ModalEfectivo
        visible={modalEfectivo}
        total={total}
        onConfirmar={handleConfirmarEfectivo}
        onCancelar={() => setModalEfectivo(false)}
      />

      <ModalVenta
        venta={ventaExitosa}
        onCerrar={onCerrarModal}
      />

      <div className="registrar__metodos">
        {['efectivo', 'transferencia'].map((m) => (
          <button
            key={m}
            className={`registrar__metodo ${metodoPago === m ? 'registrar__metodo--activo' : ''}`}
            onClick={() => setMetodoPago(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {error && <p className="registrar__error">{error}</p>}

      <button
        className="registrar__btn"
        onClick={handleRegistrar}
        disabled={loading || carrito.length === 0|| !turnoActivo}
      >
        {loading ? 'Registrando...' : 'Registrar venta'}
      </button>
    </div>
  )
}

export default RegistrarVenta