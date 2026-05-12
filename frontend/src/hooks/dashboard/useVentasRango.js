import { useState } from "react";
import { getVentasPorRango, getTotalPorRango } from "../../services/api";

export const useVentasRango = () => {
  const [ventasRango, setVentasRango] = useState([]);
  const [totalRango, setTotalRango] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarVentas = async () => {
    if (!fechaInicio || !fechaFinal) return;

    setLoading(true);

    const [dataVentas, dataTotal] = await Promise.all([
      getVentasPorRango({ fechaInicio, fechaFinal }),
      getTotalPorRango({ fechaInicio, fechaFinal }),
    ]);

    setVentasRango(dataVentas);
    setTotalRango(dataTotal);

    setLoading(false);
  };

  return {
    ventasRango,
    totalRango,
    fechaInicio,
    fechaFinal,
    setFechaInicio,
    setFechaFinal,
    buscarVentas,
    loading,
    limpiarFiltro: () => {
      setFechaFinal("");
      setFechaInicio("");
      setVentasRango([]);
      setTotalRango([]);
    },
  };
};
