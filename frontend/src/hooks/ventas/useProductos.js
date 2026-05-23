import { useState, useEffect } from "react";
import { getProductos } from "../../services/api";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        // perform fetch inside async function to avoid calling setState synchronously
        setLoading(true);
        setError(null);
        const data = await getProductos();
        if (mounted) setProductos(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return {
    productos,
    error,
    loading,
    refresh,
  };
}
