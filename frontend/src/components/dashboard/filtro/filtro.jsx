import "./filtro.css";
function Filtro({
  fechaInicio,
  fechaFinal,

  setFechaInicio,
  setFechaFinal,
  buscarVentas,

  handleHoy,
  handleSemana,
  handleMes,

  limpiarFiltro,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    buscarVentas();
  };

  return (
    <>
    <div className="contenedor-atajos-dia">
          <button className="btn-atajo" onClick={handleHoy}>
            Hoy
          </button>
          <button className="btn-atajo" onClick={handleSemana}>
            Ultima semana
          </button>
          <button className="btn-atajo" onClick={handleMes}>
            Mes
          </button>
        </div>
      <form onSubmit={handleSubmit} className="container-filtro">
        <input
          className="container-filtro-input"
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />

        <input
          className="container-filtro-input"
          type="date"
          value={fechaFinal}
          onChange={(e) => setFechaFinal(e.target.value)}
        />
        <button type="submit">Buscar</button>

        <button onClick={limpiarFiltro}>limpiar</button>
        
      </form>
    </>
  );
}

export default Filtro;
