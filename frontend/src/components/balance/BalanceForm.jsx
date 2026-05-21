import { useState } from "react";

const CATEGORIAS = ["Insumos", "Servicios", "Arriendo", "Personal", "Varios"];

const FORM_INICIAL = { nombre: "", descripcion: "", monto: "", categoria: "Insumos" };

function BalanceForm({ onAgregar, guardando }) {
  const [form, setForm] = useState(FORM_INICIAL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.monto) return;
    await onAgregar({ ...form, monto: Number(form.monto) });
    setForm(FORM_INICIAL);
  };

  return (
    <form className="balance-form" onSubmit={handleSubmit}>
      <input
        className="balance-form__input"
        type="text"
        placeholder="Nombre del gasto"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        required
      />
      <input
        className="balance-form__input"
        type="text"
        placeholder="Descripción (opcional)"
        value={form.descripcion}
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
      />
      <select
        className="balance-form__select"
        value={form.categoria}
        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
      >
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        className="balance-form__input"
        type="number"
        placeholder="Monto"
        value={form.monto}
        onChange={(e) => setForm({ ...form, monto: e.target.value })}
        required
      />
      <button className="balance-form__btn" type="submit" disabled={guardando}>
        {guardando ? "Guardando..." : "+ Agregar"}
      </button>
    </form>
  );
}

export default BalanceForm;