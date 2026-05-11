import { useEffect, useState } from "react";
import { abrirTurno, cerrarTurno, getTurnoActivo } from "../services/api.js";

export function useTurno() {
  const [turnoActivo, setTurnoActivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTurnoActivo()
      .then(setTurnoActivo)
      .catch(() => setTurnoActivo(null));
  },[]);

  const handleAbrir = async () => {
    try {
        setLoading(true)
      const turno = await abrirTurno();
      setTurnoActivo(turno);
      
    } catch (err) {
      setError(err.menssage);
      
    }
    finally{
        setLoading(false)
    }
  };

  const handleCerrar =async ()=>{
    try{
        setLoading(true)
        await cerrarTurno();
        setTurnoActivo(null)
    }catch(err){
        setError(err.menssage)
    }finally{
        setLoading(false)
    }
  }

  return{
    turnoActivo,
    loading,
    error,
    abrirTurno:handleAbrir,
    cerrarTurno:handleCerrar,
  };
}
