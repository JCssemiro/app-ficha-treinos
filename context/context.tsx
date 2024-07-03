
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ListaItemType } from '@/utils/ListaItemType';
import { db } from '@/db'; // Importe seu banco de dados local

interface ExerciciosContextType {
  minhaLista: ListaItemType[];
  adicionarExercicio: (exercicio: ListaItemType) => void;
  removerExercicio: (exercicioId: number) => void;
}

const ExerciciosContext = createContext<ExerciciosContextType>({
  minhaLista: [],
  adicionarExercicio: () => {},
  removerExercicio: () => {},
});

export const useExerciciosContext = () => useContext(ExerciciosContext);

export const ExerciciosProvider = ({ children } : {children : React.ReactNode}) => {
  const [minhaLista, setMinhaLista] = useState<ListaItemType[]>([]);

  useEffect(() => {
    setMinhaLista(db.minhaLista); // Inicializa a lista com os dados do seu banco de dados local
  }, []);

  const adicionarExercicio = (exercicio: ListaItemType) => {
    setMinhaLista([...minhaLista, exercicio]);
  };

  const removerExercicio = (id: number) => {
    setMinhaLista(minhaLista.filter(item => item.id !== id));
  };

  return (
    <ExerciciosContext.Provider value={{ minhaLista, adicionarExercicio, removerExercicio }}>
      {children}
    </ExerciciosContext.Provider>
  );
};