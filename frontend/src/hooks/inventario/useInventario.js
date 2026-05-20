import { useState, useEffect } from "react";
import { getProductos, actualizarStock } from "../../services/inventario";

export function useInventario() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [guardando, setGuardando] = useState(null); // id del producto guardando

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const editarStock = async (id, stock) => {
    try {
      setGuardando(id);
      await actualizarStock(id, stock);
      setProductos((prev) =>
        prev.map((p) => p.id === id ? { ...p, stock } : p)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setGuardando(null);
    }
  };

  return { productos, loading, error, guardando, editarStock };
}