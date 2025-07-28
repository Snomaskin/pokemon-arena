import { usePokemonSelection } from "./pokemonSelectionContext";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Pokemon } from "@/types/pokemon";
import { Team } from "./pokemonSelectionContext";


interface BattleContextType {
  battleProgress: TeamStatus;
  currentTurn: Team;
  setCurrentTurn: React.Dispatch<Team>
  updatePokemonHp: (pokemon: Pokemon, team: Team, hpChange: number) => void;
  winner: Team | undefined;
};
interface TeamStatus {
  team1: Pokemon[];
  team2: Pokemon[];
};

const BattleContext = createContext<BattleContextType | undefined>(undefined);

function BattleProvider({ children }: { children: ReactNode }) {
  const { selection } = usePokemonSelection();
  const [battleProgress, setBattleProgress] = useState<TeamStatus>({
    team1: selection["team1"],
    team2: selection["team2"],
  });
  const [currentTurn, setCurrentTurn] = useState<Team>("team1");
  const [winner, setWinner] = useState<Team>();

  useEffect(() => {
    const team1Defeated = battleProgress.team1.every(p => p.isDefeated);
    const team2Defeated = battleProgress.team2.every(p => p.isDefeated);

    if (team1Defeated) setWinner("team2");
    if (team2Defeated) setWinner("team1");
  }, [battleProgress]);

  const updatePokemonHp = (pokemon: Pokemon, team: Team, hpChange: number) => {
    setBattleProgress(prev => {
      const affectedTeamSelection = prev[team];
      const affectedPokemon = affectedTeamSelection.find(p => p.id === pokemon.id);
      if (affectedPokemon){
        const newHp = Math.max(0, affectedPokemon.hp + hpChange);
        const updatedPokemon = {...affectedPokemon, hp: newHp, isDefeated: newHp <= 0};
        const updatedSelection = affectedTeamSelection.map(p => p.id === affectedPokemon.id ? updatedPokemon : p);
        return {...prev, [team]: updatedSelection};
      } else {
        return prev;
      }
    });
  };

  return (
    <BattleContext.Provider
      value={{
        battleProgress,
        currentTurn,
        setCurrentTurn,
        updatePokemonHp,
        winner,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};

const useBattle = () => {
  const context = useContext(BattleContext);
  if (!context) {
    throw new Error("useBattle must be used within a BattleProvider");
  };
  return context;
};

export {BattleProvider, useBattle}