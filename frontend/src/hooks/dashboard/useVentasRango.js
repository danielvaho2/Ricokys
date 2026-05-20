import { useState } from "react";
import { getVentasPorRango, getTotalPorRango } from "../../services/api";

export const useVentasRango = () => {
  
  const [ventasRango, setVentasRango] = useState([]);
  const [totalRango, setTotalRango] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarVentas = async (inicio, fin) => {
  const fechaInicioBuscar = inicio || fechaInicio;
  const fechaFinalBuscar = fin || fechaFinal;

  if (!fechaInicioBuscar || !fechaFinalBuscar) return;

  setLoading(true);

  const [dataVentas, dataTotal] = await Promise.all([
    getVentasPorRango({
      fechaInicio: fechaInicioBuscar,
      fechaFinal: fechaFinalBuscar,
    }),
    getTotalPorRango({
      fechaInicio: fechaInicioBuscar,
      fechaFinal: fechaFinalBuscar,
    }),
  ]);

  setVentasRango(dataVentas);
  setTotalRango(dataTotal);

  setLoading(false);
};

  const handleHoy = () => {
    const hoy = new Date();
    const inicioDia = new Date(hoy);
    inicioDia.setDate(inicioDia.getDate() - 1);
    const finDia = new Date();
    const nuevaFechaInicio = inicioDia.toISOString().split("T")[0];
    const nuevaFechaFinal = finDia.toISOString().split("T")[0];

    setFechaInicio(nuevaFechaInicio);
    setFechaFinal(nuevaFechaFinal);

    buscarVentas(nuevaFechaInicio, nuevaFechaFinal);
  };

  const handleSemana = () => {
    const hoy = new Date();
    const inicioSemana = new Date(hoy.setDate(hoy.getDate() - 7))
      .toISOString()
      .split("T")[0];
    const finSemana = new Date().toISOString().split("T")[0];
    setFechaInicio(inicioSemana);
    setFechaFinal(finSemana);
    buscarVentas(inicioSemana, finSemana);
  };

  const handleMes = () => {
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];
    setFechaInicio(inicioMes);
    setFechaFinal(finMes);
    buscarVentas(inicioMes, finMes);
  };

  return {
    ventasRango,
    totalRango,
    fechaInicio,
    fechaFinal,
    setFechaInicio,
    setFechaFinal,
    buscarVentas,
    handleHoy,
    handleSemana,
    handleMes,
    loading,
    limpiarFiltro: () => {
      setFechaFinal("");
      setFechaInicio("");
      setVentasRango([]);
      setTotalRango([]);
    },
    
  };
};
