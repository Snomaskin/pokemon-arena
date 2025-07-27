"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import type { Pokemon } from "@/types/pokemon";


interface PokemonSelectionContextType {
  selection: PokemonSelectionType;
  updatePokemonSelection: (pokemon: Pokemon, team: Team) => void;
  selectedTeam: Team | null;
  setSelectedTeam: React.Dispatch<Team | null>;
  resetSelection: () => void;
  rmPokemon: (pokemon: Pokemon, team: Team) => void;
};

interface PokemonSelectionType {
  team1: Pokemon[] | null;
  team2: Pokemon[] | null;
};

type Team = "team1" | "team2";

const PokemonSelectionContext = createContext<PokemonSelectionContextType | undefined>(undefined);

const PokemonSelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selection, setSelection] = useState<PokemonSelectionType>({
    team1: null,
    team2: null,
  });
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

const updatePokemonSelection = (pokemon: Pokemon, team: Team) => {
  setSelection(prev => {
    const currentTeam = prev[team] ?? [];
    const alreadyExists = currentTeam.some(p => p.id === pokemon.id);

    if (alreadyExists || prev[team]?.length == 6) {
      return prev; 
    }

    return {
      ...prev,
      [team]: [...currentTeam, pokemon],
    };
  });
};


  const resetSelection = () => {
    setSelection({ team1: null, team2: null });
  };

  const rmPokemon = (pokemon: Pokemon, team: Team) => {
    setSelection(prev => {
      if (!prev[team]) return prev;

      const updatedTeam = prev[team].filter(p => p.name !== pokemon.name)
      return {
        ...prev,
        [team]: updatedTeam
      }
    })
  };

  return (
    <PokemonSelectionContext.Provider
      value={{
        selection,
        updatePokemonSelection,
        selectedTeam,
        setSelectedTeam,
        resetSelection,
        rmPokemon,
      }}
    >
      {children}
    </PokemonSelectionContext.Provider>
  );
}

const usePokemonSelection = () => {
  const context = useContext(PokemonSelectionContext);
  if (!context) {
    throw new Error("usePokemonSelection must be used within a PokemonSelectionProvider");
  };
  return context;
};

export {type Team, type PokemonSelectionType, PokemonSelectionProvider, usePokemonSelection };