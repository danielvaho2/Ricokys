import { useEffect, useState } from "react";
import { abrirTurno, cerrarTurno, getTurnoActivo } from "../../services/api.js";

export function useTurno() {
  const [turnoActivo, setTurnoActivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resumenTurno, setResumenTurno] = useState(null);

  useEffect(() => {
    getTurnoActivo()
      .then(setTurnoActivo)
      .catch(() => setTurnoActivo(null));
  }, []);

  

  const handleAbrir = async () => {
    try {
      setLoading(true);
      setResumenTurno(null);
      const turno = await abrirTurno();
      setTurnoActivo(turno);
    } catch (err) {
      setError(err.menssage);
    } finally {
      setLoading(false);
    }
  };

  const handleCerrar = async () => {
    try {
      setLoading(true);
      const resumen = await cerrarTurno();
      setResumenTurno(resumen);
      setTurnoActivo(null);
    } catch (err) {
      setError(err.menssage);
    } finally {
      setLoading(false);
    }
  };

  return {
    turnoActivo,
    resumenTurno,
    loading,
    error,
    abrirTurno: handleAbrir,
    cerrarTurno: handleCerrar,
    limpiarResumen: () => setResumenTurno(null),
  };
}
