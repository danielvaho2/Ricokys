import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pruebas from "./pages/pruebas/pruebas";
import Ventas from './pages/Ventas/venta'

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          
          <Route path="/prueba" element={<Pruebas />} />
          <Route path="/ventas" element={<Ventas />} />
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;