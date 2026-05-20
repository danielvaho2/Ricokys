import { useState, useEffect } from "react";
import {
  getProductoStock,
  actualizarStock,
  agregarStock,
} from "../../services/inventario";

export function useInventario() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getProductoStock();

        const productosFormateados = data.map((p) => ({
          ...p,
          stock: Number(p.stock),
          precio: Number(p.precio),
        }));

        setProductos(productosFormateados);
      } catch (err) {
        console.error(err);
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
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                stock: Number(stock),
              }
            : p,
        ),
      );

      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setGuardando(null);
    }
  };

  const agregaStock = async (id, stock) => {
    try {
      setGuardando(id);

      await agregarStock(id, stock);

      setProductos((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                stock: Number(p.stock) + Number(stock),
              }
            : p,
        ),
      );

      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setGuardando(null);
    }
  };

  return {
    productos,
    loading,
    error,
    guardando,
    editarStock,
    agregaStock,
  };
}