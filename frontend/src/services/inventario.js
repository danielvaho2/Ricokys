const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getProductoStock = async () => {
  const res = await fetch(`${BASE_URL}/inventario/`);
  if (!res.ok) throw new Error("Error al obtener productos");

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Respuesta inválida del inventario");
  }

  return data;
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

export const agregarStock = async (id, stock) => {
  const res = await fetch(`${BASE_URL}/inventario/${id}/stock/agregar`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock }),
  });
  if (!res.ok) throw new Error("Error al agregar stock");
  return res.json();
};
