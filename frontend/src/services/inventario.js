const BASE_URL = import.meta.env.VITE_API_URL;

export const getProductoStock = async () => {
  const res = await fetch(`${BASE_URL}/inventario/`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

export const actualizarStock = async (id, stock) => {
  const res = await fetch(`${BASE_URL}/inventario/${id}/stock`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock }),
  });
  if (!res.ok) throw new Error("Error al actualizar stock");
  return res.json();
};