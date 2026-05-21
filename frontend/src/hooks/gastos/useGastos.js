import { useState, useEffect } from "react";
import {
  getGastos,
  createGasto,
  deleteGasto,
  updateGasto,
  getTotalVentasMes,
} from "../../services/gastos";

const MES_ACTUAL = new Date().getMonth();
const AÑO_ACTUAL = new Date().getFullYear();

const filtrarPorMes = (gastos, mes, año) =>
  gastos.filter((g) => {
    const fecha = new Date(g.fecha);
    return fecha.getMonth() === mes && fecha.getFullYear() === año;
  });

export function useGastos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [totalVentas, setTotalVentas] = useState(0);
  const [mes, setMes] = useState(MES_ACTUAL);
  const [año, setAño] = useState(AÑO_ACTUAL);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getGastos();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);
  useEffect(() => {
    const cargarVentas = async () => {
      try {
        const data = await getTotalVentasMes(mes, año);
        setTotalVentas(Number(data.total_ventas));
      } catch (err) {
        console.error(err);
      }
    };
    cargarVentas();
  }, [mes, año]);
  // Gastos filtrados por mes seleccionado
  const gastos = filtrarPorMes(todos, mes, año);

  // Métricas
  const totalGastos = gastos.reduce((acc, g) => acc + Number(g.monto), 0);

  const totalGastosMes = filtrarPorMes(todos, mes, año).length;

  const agregarGasto = async (data) => {
    try {
      setGuardando(true);
      const { id } = await createGasto(data);
      const nuevo = { ...data, id, fecha: new Date().toISOString() };
      setTodos((prev) => [nuevo, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const eliminarGasto = async (id) => {
    try {
      await deleteGasto(id);
      setTodos((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const editarGasto = async (id, data) => {
    try {
      setGuardando(true);
      await updateGasto(id, data);
      setTodos((prev) =>
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
    totalVentas,
    loading,
    error,
    guardando,
    mes,
    año,
    totalGastosMes,
    setMes,
    setAño,
    agregarGasto,
    eliminarGasto,
    editarGasto,
  };
}
