const BASE_URL = import.meta.env.VITE_API_URL;

export const getGastos = async (fechaInicio, fechaFin) => {
  const res = await fetch(
    `${BASE_URL}/gastos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
  );
  if (!res.ok) throw new Error("Error al obtener gastos");
  return res.json();
};

export const createGasto = async ({ nombre, descripcion, monto, categoria }) => {
  const res = await fetch(`${BASE_URL}/gastos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion, monto, categoria }),
  });
  if (!res.ok) throw new Error("Error al crear gasto");
  return res.json();
};

export const deleteGasto = async (id) => {
  const res = await fetch(`${BASE_URL}/gastos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar gasto");
  return res.json();
};

export const updateGasto = async (id, { nombre, descripcion, monto, categoria }) => {
  const res = await fetch(`${BASE_URL}/gastos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion, monto, categoria }),
  });
  if (!res.ok) throw new Error("Error al actualizar gasto");
  return res.json();
};

export const getTotalVentasMes = async (fechaInicio, fechaFin) => {
  const res = await fetch(
    `${BASE_URL}/gastos/ventas-mes?fechainicio=${fechaInicio}&fechafinal=${fechaFin}`
  );
  if (!res.ok) throw new Error("Error al obtener ventas");
  return res.json();
};

export const getVentasPorDia = async (fechaInicio, fechaFin) => {
  const res = await fetch(
    `${BASE_URL}/gastos/ventas-por-dia?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
  );
  if (!res.ok) throw new Error("Error al obtener ventas por día");
  return res.json();
};