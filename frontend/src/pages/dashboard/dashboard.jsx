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
    limpiarFiltro
  } = useVentasRango();

  return (
    <div className="contenedor-filtro">

      <Filtro
        fechaInicio={fechaInicio}
        fechaFinal={fechaFinal}
        setFechaInicio={setFechaInicio}
        setFechaFinal={setFechaFinal}
        buscarVentas={buscarVentas}
        limpiarFiltro={limpiarFiltro}
      />

      {loading && <p>Cargando...</p>}

      <Resultados ventasRango={ventasRango}
      totalRango={totalRango}
    
       />

    </div>
  );
}

export default Dashboard;