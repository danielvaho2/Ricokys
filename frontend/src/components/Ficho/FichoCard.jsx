import './FichoCard.css';
import FichoProducto from './FichoProducto';

function FichoCard({ ficho, onActualizar, cargando }) {
  const yaEntregado = ficho.estado === "Entregado";

  return (
    <div className="ficho-card">
      <div className="ficho-card__header">
        <div className="ficho-card__numero">
          <span>#</span>{String(ficho.numero_ficho).slice(-2)}
          
        </div>
        <span className={`ficho-card__estado ficho-card__estado--${ficho.estado}`}>
          {ficho.estado}
        </span>
      </div>

      <div className="ficho-card__productos">
        {ficho.productos.map((p, i) => (
          <>
            {i > 0 && <hr key={`hr-${i}`} className="ficho-card__divider" />}
            <FichoProducto key={i} nombre={p.nombre} cantidad={p.cantidad} />
          </>
        ))}
      </div>

      <div className="ficho-card__footer">
        <span>{ficho.productos.length} producto{ficho.productos.length !== 1 ? 's' : ''}</span>

        <button
          className={`ficho-card__btn ${yaEntregado ? 'ficho-card__btn--done' : ''}`}
          onClick={() => onActualizar(ficho.numero_ficho)}
          disabled={cargando || yaEntregado}
        >
          {cargando ? "Actualizando..." : yaEntregado ? "✓ Entregado" : "Marcar entregado"}
        </button>
      </div>
    </div>
  );
}
export default FichoCard;