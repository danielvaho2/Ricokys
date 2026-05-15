
function InventarioTurno({ inventario, loading }) {
  if (loading) return <p className="turno__inventario-loading">Cargando...</p>
  if (!inventario.length) return null

  return (
    <div className="turno__inventario">
      <p className="turno__inventario-titulo">Productos vendidos</p>
      {inventario.map((item, i) => (
        <div key={i} className="turno__inventario-item">
          <span>{item.nombre}</span>
          <span>{item.vendidos} UND</span>
        </div>
      ))}
      
    </div>
  )
}

export default InventarioTurno