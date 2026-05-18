import './ficho.css';
import { useFichos } from '../../hooks/fichos/useFichos';
import FichoCard from '../../components/Ficho/FichoCard';

function FichosPage() {
 const { fichos, loading, error, actualizarFicho, actualizando } = useFichos();

  if (loading) return (
    <div className="fichos-page">
      <div className="fichos-state">
        <div className="fichos-state__dot" />
        Cargando fichos...
      </div>
    </div>
  );

  if (error) return (
    <div className="fichos-page">
      <div className="fichos-state fichos-state--error">{error}</div>
    </div>
  );

  return (
    <div className="fichos-page">
      <div className="fichos-page__header">
        <span className="fichos-page__title">Fichos activos</span>
        <span className="fichos-page__turno">turno en curso</span>
      </div>
      <div className="fichos-grid">
        {fichos.map((ficho) => (
         <FichoCard
            key={ficho.numero_ficho}
            ficho={ficho}
            onActualizar={actualizarFicho}
            cargando={actualizando === ficho.numero_ficho}
          />
        ))}
      </div>
    </div>
  );
}

export default FichosPage;