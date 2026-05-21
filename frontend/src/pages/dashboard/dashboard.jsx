import "./dashboard.css";
import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

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
    limpiarFiltro,
    handleHoy,
    handleSemana,
    handleMes,
    loading,
  } = useVentasRango();

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <div className="dashboard-layout">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <h1 className="sidebar-logo">🌭 Ricokys</h1>
        <nav className="sidebar-nav">
          <button onClick={() => navigate("/")}>Dashboard</button>
          <button onClick={() => navigate("/inventario")}>Inventario</button>
          <button onClick={() => navigate("/balance")}>Balance</button>
          <button onClick={() => window.open("/ventas")}>Ventas</button>
          <button onClick={() => window.open("/ficho")}>Fichos</button>
        </nav>
      </aside>

      {menuOpen && (
        <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <main className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-header-top">
            <div className="container-todo">
              <div className="menu-btn-container">
                <button
                  className="menu-btn"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Contenido según ruta */}
        {isDashboard && (
          <>
            <div className="dashboard-header-text">
              <h1 className="dashboard-titulo">Panel de ventas</h1>
              <p className="dashboard-subtitulo">Control y estadísticas</p>
            </div>
            <Filtro
              fechaInicio={fechaInicio}
              fechaFinal={fechaFinal}
              setFechaInicio={setFechaInicio}
              setFechaFinal={setFechaFinal}
              buscarVentas={buscarVentas}
              limpiarFiltro={limpiarFiltro}
              handleHoy={handleHoy}
              handleSemana={handleSemana}
              handleMes={handleMes}
            />
            {loading && <div className="dashboard-loading">Cargando</div>}
            <Resultados ventasRango={ventasRango} totalRango={totalRango} />
          </>
        )}
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
