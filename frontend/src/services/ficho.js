const BASE_URL = "http://localhost:3000/";

export const getFichos = async (turno_id) => {
  const res = await fetch(`${BASE_URL}ficho/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ turno_id }),
  });

  if (!res.ok) {
    throw new Error("Error al obtener fichos");
  }

  return res.json();
}; 

export const setFichoEstado = async (turno_id, ficho_id) => {
  const res = await fetch(`${BASE_URL}ficho/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ turno_id, ficho_id }),
  });
   if (!res.ok) {
    throw new Error("Error al actualizar ficho");
  }

  return res.json();
}