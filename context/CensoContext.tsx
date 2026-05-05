import { createContext, useContext, useEffect, useState } from 'react';
import { fetchOpciones } from '../services/opciones';

const CensoContext = createContext(null);

export const CensoProvider = ({ children }) => {
  const [censo, setCenso] = useState({});
  const [opciones, setOpciones] = useState(null);
  const [opcionesCargadas, setOpcionesCargadas] = useState(false);

  const cargarOpciones = async () => {
    const data = await fetchOpciones();

    if (data) {
      setOpciones(data);
    }

    setOpcionesCargadas(true);
  };

  useEffect(() => {
    cargarOpciones();
  }, []);

  const updateCenso = (campo, valor) => {
    setCenso((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const resetCenso = () => {
    setCenso({});
  };

  const prepararNuevoRegistroMismaUbicacion = () => {
    setCenso((prev) => ({
      ...prev,
      especie: '',
      numero_ejemplares: '',
    }));
  };

  return (
    <CensoContext.Provider
      value={{
        censo,
        updateCenso,
        resetCenso,
        prepararNuevoRegistroMismaUbicacion,
        opciones,
        opcionesCargadas,
        cargarOpciones,
      }}
    >
      {children}
    </CensoContext.Provider>
  );
};

export const useCenso = () => useContext(CensoContext);