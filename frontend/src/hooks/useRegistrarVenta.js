import { useState } from 'react'
import { createVenta } from '../services/api.js'

export function useRegistrarVenta({ carrito, vaciar }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [ventaExitosa, setVentaExitosa] = useState(null)

  const registrar = async (metodo_pago) => {
    setLoading(true)
    setError(null)
    try {
      const productos = carrito.map((p) => ({
        producto_id: p.id,
        cantidad: p.cantidad,
      }))
      const venta = await createVenta({ productos, metodo_pago })
      setVentaExitosa(venta)
      vaciar()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const cerrarModal = () => setVentaExitosa(null)

  return { registrar, loading, error, ventaExitosa, cerrarModal }
}