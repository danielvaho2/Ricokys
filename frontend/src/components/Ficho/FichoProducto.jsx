import './FichoProducto.css';

function FichoProducto({ nombre, cantidad }) {
  return (
    <div className="ficho-producto">
      <span className="ficho-producto__nombre">{nombre}</span>
      <span className="ficho-producto__cantidad">×{cantidad}</span>
    </div>
  );
}

export default FichoProducto;