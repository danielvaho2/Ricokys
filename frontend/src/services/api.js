const BASE_URL = "http://localhost:3000";

export const registrarVenta = async ({ productos, metodo_pago }) => {
  const res = await fetch(`${BASE_URL}/ventas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productos, metodo_pago }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al registrar venta");
  }
  return res.json();
};

export const getAll = async () => {
  const res = await fetch(`${BASE_URL}/ventas/get`);
  if (!res.ok) throw new Error("Error al obtener ventas");
  return res.json();
};

//Mi codigo sin chatgpt

export const getProductos = async () => {
  const res = await fetch(`${BASE_URL}/productos/`);
  if (!res.ok) throw new Error("Error al obtener los productos");
  return res.json();
};

export const getTurnoActivo = async () => {
  const res = await fetch(`${BASE_URL}/turno/activo`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Error al obtener el turno");
  return res.json();
};

export const abrirTurno =async ()=>{
const res =await fetch(`${BASE_URL}/turno/abrir`,{
  method:'POST'
});
  if (!res.ok) throw new Error("Error al abrir turno");
return res.json();
}
export const cerrarTurno =async ()=>{
const res =await fetch(`${BASE_URL}/turno/cerrar`,{
  method:'POST'
});
  if (!res.ok) throw new Error("Error al cerrar turno");
return res.json();
}
export const insertarProducto = async ({ nombre, precio }) => {
  const res = await fetch(`${BASE_URL}/productos/insertar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, precio }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al insertar producto");
  }

  return res.json();
};

export const eliminarProducto = async ({ id }) => {
  const res = await fetch(`${BASE_URL}/productos/eliminar`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al eliminar el producto");
  }

  return res.json();
};

export const updateProducto = async ({ id, precio }) => {
  const res = await fetch(`${BASE_URL}/productos/update`, {
    method: "post",
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({ id, precio })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al actualizar el producto");
  }
  return res.json();
}

export const createVenta = async ({productos,metodo_pago})=>{

  const res = await fetch (`${BASE_URL}/ventas/`,{
    method:'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({productos,metodo_pago})
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al crear la venta");
  }
  return res.json();
}

export const getVentasPorRango = async ({ fechaInicio, fechaFinal }) => {
  const res = await fetch(
    `${BASE_URL}/filtro?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`
  );

  return await res.json();
};
export const getTotalPorRango = async ({ fechaInicio, fechaFinal }) => {
  const res = await fetch(
    `${BASE_URL}/filtro/total?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`
  );

  return await res.json();
};


export const getInventario = async (turno_id) => {
  const res = await fetch(`${BASE_URL}/turno/inventario?turno_id=${turno_id}`)
  if (!res.ok) throw new Error('Error al obtener inventario')
  return res.json()
}