import { useState, useEffect, useCallback } from "react";
import {
  getGastos,
  createGasto,
  deleteGasto,
  updateGasto,
  getTotalVentasMes,
  getVentasPorDia,
} from "../../services/gastos";

const hoy = new Date();

const formatDateLocal = (date) => {
  return date.toLocaleDateString("en-CA");
};
export function useGastos() {
  const [modo, setModo] = useState("diario");
  const [mes, setMes] = useState(hoy.getMonth());
  const [año, setAño] = useState(hoy.getFullYear());
  const [dia, setDia] = useState(formatDateLocal(hoy));
  const [datosGrafica, setDatosGrafica] = useState([]);

  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [totalVentas, setTotalVentas] = useState(0);

  const getRango = useCallback(() => {
    if (modo === "diario") {
      return {
        fechaInicio: `${dia}T00:00:00`,
        fechaFin: `${dia}T23:59:59`,
      };
    }

    const inicio = formatDateLocal(new Date(año, mes, 1));

    const fin = formatDateLocal(new Date(año, mes + 1, 0));

    return {
      fechaInicio: `${inicio}T00:00:00`,
      fechaFin: `${fin}T23:59:59`,
    };
  }, [modo, dia, mes, año]);

  // ── Carga gastos ──
  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        const { fechaInicio, fechaFin } = getRango();
        const data = await getGastos(fechaInicio, fechaFin);
        setGastos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [getRango]);

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
  }, [getRango]);

  useEffect(
    () => {
      if (modo !== "mensual") return;

      const cargarGrafica = async () => {
        try {
          const { fechaInicio, fechaFin } = getRango();
          const [ventas, gastosData] = await Promise.all([
            getVentasPorDia(fechaInicio, fechaFin),
            getGastos(fechaInicio, fechaFin),
          ]);

          // Agrupa gastos por día
          const gastosPorDia = {};
          gastosData.forEach((g) => {
            const dia = g.fecha.split("T")[0];
            gastosPorDia[dia] = (gastosPorDia[dia] || 0) + Number(g.monto);
          });

          // Une ventas y gastos por día
          const dias = new Set([
            ...ventas.map((v) => v.dia.split("T")[0]),
            ...Object.keys(gastosPorDia),
          ]);

          const datos = Array.from(dias)
            .sort()
            .map((dia) => {
              const ventasDia =
                ventas.find((v) => v.dia.split("T")[0] === dia)?.ventas || 0;
              const gastosDia = gastosPorDia[dia] || 0;
              return {
                dia: dia.slice(5), // "05-16" en vez de "2026-05-16"
                ventas: Number(ventasDia),
                gastos: gastosDia,
                ganancia: Number(ventasDia) - gastosDia,
              };
            });

          setDatosGrafica(datos);
        } catch (err) {
          console.error(err);
        }
      };
      cargarGrafica();
    },
    [getRango, modo],
    
  );

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
    datosGrafica,
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
