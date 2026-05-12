import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pruebas from "./pages/pruebas/pruebas";
import Ventas from './pages/Ventas/venta'
import Dashboard from './pages/dashboard/dashboard'

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          
          <Route path="/prueba" element={<Pruebas />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;