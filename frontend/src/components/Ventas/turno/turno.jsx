import { useState } from "react";
import "./turno.css";

function Turno({ turnoActivo, abrirTurno, cerrarTurno, loading }) {
  const [confirmar, setConfirmar] = useState(false);

  return (
    <div className="turno">
      {turnoActivo ? (
        <>
          {confirmar ? (
            <div className="turno__confirmar">
              <p className="turno__confirmar-texto">¿Seguro que quieres cerrar el turno?</p>
              <div className="turno__confirmar-botones">
                <button
                  className="turno__btn turno__btn--cancelar"
                  onClick={() => setConfirmar(false)}
                >
                  Cancelar
                </button>
                <button
                  className="turno__btn turno__btn--cerrar"
                  onClick={() => { cerrarTurno(); setConfirmar(false); }}
                  disabled={loading}
                >
                  {loading ? "Cerrando..." : "Sí, cerrar"}
                </button>
              </div>
            </div>
          ) : (
            <button
              className="turno__btn turno__btn--cerrar"
              onClick={() => setConfirmar(true)}
              disabled={loading}
            >
              Cerrar turno
            </button>
          )}
        </>
      ) : (
        <button
          className="turno__btn turno__btn--abrir"
          onClick={abrirTurno}
          disabled={loading}
        >
          {loading ? "Abriendo..." : "Abrir turno"}
        </button>
      )}
    </div>
  );
}

export default Turno;