import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pruebas from "./pages/pruebas/pruebas";
import Ventas from './pages/Ventas/venta'
import Dashboard from './pages/dashboard/dashboard'
import Ficho from "./pages/fichos/ficho";

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          
          <Route path="/prueba" element={<Pruebas />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/ficho" element={<Ficho />} />
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;