import "./dashboard.css";

import Filtro from "../../components/dashboard/filtro/filtro";
import Resultados from "../../components/dashboard/resultado/resultados";
import { useVentasRango } from "../../hooks/dashboard/useVentasRango";

function Dashboard() {
  const {
    ventasRango,
    totalRango,
    fechaInicio,
    fechaFinal,
    setFechaInicio,
    setFechaFinal,
    buscarVentas,
    loading,
    limpiarFiltro,
  } = useVentasRango();

  return (
    <div className="contenedor-filtro">
     
      <div className="dashboard-header">
        <h1 className="dashboard-titulo">🌭 Ricokys</h1>

        <p className="dashboard-subtitulo">Panel de ventas</p>
      </div>

        
      <Filtro
        fechaInicio={fechaInicio}
        fechaFinal={fechaFinal}
        setFechaInicio={setFechaInicio}
        setFechaFinal={setFechaFinal}
        buscarVentas={buscarVentas}
        limpiarFiltro={limpiarFiltro}
      />

      {loading && <div className="dashboard-loading">Cargando</div>}

      <Resultados ventasRango={ventasRango} totalRango={totalRango} />
      </div>
   
  );
}

export default Dashboard;
