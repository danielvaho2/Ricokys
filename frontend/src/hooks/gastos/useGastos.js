import { useState, useEffect } from "react";
import {
  getGastos,
  createGasto,
  deleteGasto,
  updateGasto,
  getTotalVentasMes,
} from "../../services/gastos";

const hoy = new Date();

export function useGastos() {
  const [modo, setModo] = useState("diario");
  const [mes, setMes] = useState(hoy.getMonth());
  const [año, setAño] = useState(hoy.getFullYear());
  const [dia, setDia] = useState(hoy.toISOString().split("T")[0]);

  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [totalVentas, setTotalVentas] = useState(0);

  const getRango = () => {
    if (modo === "diario") {
      return { fechaInicio: `${dia}T00:00:00`, fechaFin: `${dia}T23:59:59` };
    }
    const inicio = new Date(año, mes, 1).toISOString().split("T")[0];
    const fin = new Date(año, mes + 1, 0).toISOString().split("T")[0];
    return { fechaInicio: `${inicio}T00:00:00`, fechaFin: `${fin}T23:59:59` };
  };

  // ── Carga gastos ──
  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        const { fechaInicio, fechaFin } = getRango();
        const data = await getGastos(fechaInicio, fechaFin); // 👈 usa getGastos
        setGastos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [modo, dia, mes, año]);

  // ── Carga ventas del período ──
  useEffect(() => {
    const cargarVentas = async () => {
      try {
        const { fechaInicio, fechaFin } = getRango();
        const data = await getTotalVentasMes(fechaInicio, fechaFin);
        setTotalVentas(Number(data.total_ventas));
      } catch (err) {
        console.error(err);
      }
    };
    cargarVentas();
  }, [modo, dia, mes, año]); // 👈 mismo trigger, sin duplicado

  const totalGastos = gastos.reduce((acc, g) => acc + Number(g.monto), 0);
  const totalGastosMes = gastos.length;

  const agregarGasto = async (data) => {
    try {
      setGuardando(true);
      const { id } = await createGasto(data);
      setGastos((prev) => [
        { ...data, id, fecha: new Date().toISOString() },
        ...prev,
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const eliminarGasto = async (id) => {
    try {
      await deleteGasto(id);
      setGastos((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const editarGasto = async (id, data) => {
    try {
      setGuardando(true);
      await updateGasto(id, data);
      setGastos((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...data } : g)),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return {
    gastos,
    totalGastos,
    totalGastosMes,
    totalVentas,
    loading,
    error,
    guardando,
    modo,
    setModo,
    mes,
    setMes,
    año,
    setAño,
    dia,
    setDia,
    agregarGasto,
    eliminarGasto,
    editarGasto,
  };
}
