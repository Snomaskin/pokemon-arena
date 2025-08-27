"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Pokemon } from "@/types/pokemon";
import { Team } from "@/types/team";
import pokemonWithBase64Img from '@/utils/pokemonWithBase64Img';


interface PokemonSelectionContextType {
  gameMode: GameMode | undefined;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode | undefined>>;
  updateCachedPokemons: (pokemons: Pokemon[]) => void;
  cachedPokemons: Pokemon[] | undefined;
  selection: PokemonSelectionType;
  isHydrated: boolean;
  updatePokemonSelection: (pokemon: Pokemon, team: Team) => void;
  selectedTeam: Team | null;
  setSelectedTeam: React.Dispatch<Team | null>;
  resetSelection: () => void;
  rmPokemon: (pokemon: Pokemon, team: Team) => void;
};

type GameMode = "playerVsPlayer" | "playerVsComputer"

interface PokemonSelectionType {
  team1: Pokemon[];
  team2: Pokemon[];
};

const PokemonSelectionContext = createContext<PokemonSelectionContextType | undefined>(undefined);

function PokemonSelectionProvider({ children }: { children: ReactNode }) {
  const [gameMode, setGameMode] = useState<GameMode | undefined>();
  const [cachedPokemons, setCachedPokemons] = useState<Pokemon[]>();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [selection, setSelection] = useState<PokemonSelectionType>({ team1: [], team2: [] });

  useEffect(() => {
    setIsHydrated(true);
    
    const savedSelection = localStorage.getItem("pokemonSelection");
    if (savedSelection) {

        const parsed = JSON.parse(savedSelection);
        setSelection(parsed);

    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("pokemonSelection", JSON.stringify(selection));
    }
  }, [selection, isHydrated]);

  const updateCachedPokemons = async (pokemons: Pokemon[]) => {
    const newPokemons = await Promise.all(pokemons.map((p) => pokemonWithBase64Img(p)));
    setCachedPokemons(newPokemons);
  }; 

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
    setSelection({ team1: [], team2: [] });
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
        gameMode,
        setGameMode,
        updateCachedPokemons,
        cachedPokemons,
        selection,
        isHydrated,
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

export {type Team, type PokemonSelectionType, type GameMode, PokemonSelectionProvider, usePokemonSelection };