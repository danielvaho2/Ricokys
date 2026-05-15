import { useEffect, useState } from 'react'
import { getInventario } from '../../services/api.js'

export function useInventarioTurno(turno_id) {
  const [inventario, setInventario] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!turno_id) return

    let activo = true

    const fetchInventario = async () => {
      setLoading(true)
      try {
        const data = await getInventario(turno_id)
        if (activo) setInventario(data)
      } catch {
        if (activo) setInventario([])
      } finally {
        if (activo) setLoading(false)
      }
    }

    fetchInventario()

    return () => { activo = false }
  }, [turno_id])

  return { inventario, loading }
}