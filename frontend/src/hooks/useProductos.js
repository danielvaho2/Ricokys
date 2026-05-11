import { useState, useEffect } from "react";
import { getProductos } from "../services/api";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductos()
      .then(setProductos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return {
    productos,
    error,
    loading,
  };
}