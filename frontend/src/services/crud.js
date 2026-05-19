const BASE_URL = import.meta.env.VITE_API_URL;

export const getProductos = async () => {
  const res = await fetch(`${BASE_URL}/productos/`);
  if (!res.ok) throw new Error("Error al obtener los productos");
  return res.json();
};

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

export const desactivarProducto = async ({ id }) => {
  const res = await fetch(`${BASE_URL}/productos/desactivar`, {
    method: "post",
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({ id })
  }); 
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al desactivar el producto");
  }   
  return res.json();
};

export const activarProducto = async ({ id }) => {
  const res = await fetch(`${BASE_URL}/productos/activar`, {
    method: "post",
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({ id })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al activar el producto");
  }
  return res.json();
};


export const getProductosActivos = async () => {
  const res = await fetch(`${BASE_URL}/productos/activos`);
  if (!res.ok) throw new Error("Error al obtener los productos activos");
  return res.json();
}

export const getProductosInactivos = async () => {
  const res = await fetch(`${BASE_URL}/productos/inactivos`);
  if (!res.ok) throw new Error("Error al obtener los productos inactivos");
  return res.json();
}