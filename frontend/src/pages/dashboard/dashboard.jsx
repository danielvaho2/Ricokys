import "./dashboard.css";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <h1 className="sidebar-logo">🌭 Ricokys</h1>

        <nav className="sidebar-nav">
          <button onClick={() => navigate("/")}>Dashboard</button>
          <button onClick={() => window.open("/inventario")}>
            Inventario
          </button>{" "}
          <button onClick={() => window.open("/ventas")}>Ventas</button>
          {/* aún no existe */}
          <button onClick={() => window.open("/ficho")}>Fichos</button>
        </nav>
      </aside>

      {/* OVERLAY MOBILE */}
      {menuOpen && (
        <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* CONTENIDO */}
      <main className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-header-top">
            <div className="container-todo">
              {/* BOTON MOBILE */}
              <div className="menu-btn-container">
                <button
                  className="menu-btn"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  ☰
                </button>
              </div>
              <div className="dashboard-header-text">
                <h1 className="dashboard-titulo">Panel de ventas</h1>
                <p className="dashboard-subtitulo">Control y estadísticas</p>
              </div>
            </div>
          </div>
        </div>

        {/* FILTRO SOLO EN DASHBOARD */}
        {isDashboard && (
          <Filtro
            fechaInicio={fechaInicio}
            fechaFinal={fechaFinal}
            setFechaInicio={setFechaInicio}
            setFechaFinal={setFechaFinal}
            buscarVentas={buscarVentas}
            limpiarFiltro={limpiarFiltro}
          />
        )}

        {loading && <div className="dashboard-loading">Cargando</div>}

        {/* RESULTADOS SOLO EN DASHBOARD */}
        {isDashboard && (
          <Resultados ventasRango={ventasRango} totalRango={totalRango} />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
