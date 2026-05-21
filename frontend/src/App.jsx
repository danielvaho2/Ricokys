import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pruebas from "./pages/pruebas/pruebas";
import Ventas from "./pages/Ventas/venta";
import Dashboard from "./pages/dashboard/dashboard";
import Ficho from "./pages/fichos/ficho";
import Inventario from "./pages/inventario/inventario";
import Balance from "./pages/balance/balance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/prueba" element={<Pruebas />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/ficho" element={<Ficho />} />
        <Route path="/" element={<Dashboard />}>
        <Route path="inventario" element={<Inventario />} />
        <Route path="balance" element={<Balance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
