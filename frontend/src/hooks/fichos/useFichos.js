import { useEffect, useState } from "react";
import { getFichos, setFichoEstado } from "../../services/ficho";
import { getTurnoActivo } from "../../services/api";

function agruparFichos(data) {
  const agrupados = {};

  data.forEach((item) => {
    if (!agrupados[item.numero_ficho]) {
      agrupados[item.numero_ficho] = {
        numero_ficho: item.numero_ficho,
        estado: item.estado,
        productos: [],
      };
    }

    agrupados[item.numero_ficho].productos.push({
      nombre: item.nombre,
      cantidad: item.cantidad,
    });
  });

  return Object.values(agrupados);
}

export function useFichos() {
  const [fichos, setFichos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actualizando, setActualizando] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const turno = await getTurnoActivo();

        if (!turno) {
          setError("No hay turno activo");
          return;
        }

        const data = await getFichos(turno.id);
        setFichos(agruparFichos(data));
      } catch (err) {
        setError("Error al obtener los fichos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  const actualizarFicho = async (ficho_id) => {
    try {
      setActualizando(ficho_id);
      const turno = await getTurnoActivo();
      await setFichoEstado(turno.id, ficho_id);

      // Actualiza el estado local sin refetch
      setFichos((prev) =>
        prev.map((f) =>
          f.numero_ficho === ficho_id ? { ...f, estado: "Entregado" } : f,
        ),
      );
    } catch (err) {
      console.error("Error al actualizar ficho:", err);
    } finally {
      setActualizando(null);
    }
  };

  return { fichos, loading, error, actualizarFicho, actualizando };
}
