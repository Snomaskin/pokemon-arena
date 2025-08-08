"use client"
import { usePokemonSelection } from "./pokemonSelectionContext";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Move, Pokemon } from "@/types/pokemon";
import { PokemonOfTeam, Team } from "@/types/team";


interface BattleContextType {
  arenaTeams: ArenaTeams;
  getTeamPokemons: (team: Team) => ArenaPokemon[];
  currentTurn: Team;
  setCurrentTurn: React.Dispatch<Team>;
  moveSelectedFor: SelectedMoveForTeam | undefined;
  setMoveSelectedFor: React.Dispatch<SelectedMoveForTeam | undefined>;
  setCardRef: (pokemon: Pokemon, team: Team, ref: React.RefObject<HTMLDivElement | null>) => void;
  getCardRef: (pokemon: Pokemon, team: Team) => React.RefObject<HTMLDivElement | null> | undefined;
  updatePokemonHp: (pokemon: Pokemon, team: Team, hpChange: number) => void;
  attackAnimationData: AttackAnimationData | null;
  setAttackAnimationData: React.Dispatch<AttackAnimationData | null>;
  getPokemonHp: (pokemon: Pokemon, team: Team) => number;
  getIsDefeated: (pokemon: Pokemon, team: Team) => boolean | undefined;
  winner: Team | undefined;
  setWinner: React.Dispatch<Team | undefined>;
  resetBattle: () => void;
};
interface ArenaPokemon extends Pokemon {
  cardRef?: React.RefObject<HTMLDivElement | null>;
  hasMoved?: boolean;
};
interface ArenaTeams {
  team1: ArenaPokemon[];
  team2: ArenaPokemon[];
};
interface SelectedMoveForTeam {
  team: Team;
  pokemon: Pokemon;
  move: Move;
};
interface AttackAnimationData {
  attacker: PokemonOfTeam;
  target: PokemonOfTeam;
  move: Move;
};

const BattleContext = createContext<BattleContextType | undefined>(undefined);

function BattleProvider({ children }: { children: ReactNode }) {
  const { selection } = usePokemonSelection();
  const [arenaTeams, setArenaTeams] = useState<ArenaTeams>({
    team1: selection.team1,
    team2: selection.team2,
  });
  const [currentTurn, setCurrentTurn] = useState<Team>("team1");
  const [moveSelectedFor, setMoveSelectedFor] = useState<SelectedMoveForTeam | undefined>();
  const [attackAnimationData, setAttackAnimationData] = useState<AttackAnimationData | null>(null);
  const [winner, setWinner] = useState<Team | undefined>(undefined);

  useEffect(() => {
    setArenaTeams({
      team1: selection.team1,
      team2: selection.team2,
    });
  }, [selection.team1, selection.team2]);

  useEffect(() => {
    const teamsReady =
      arenaTeams.team1.length > 0 && arenaTeams.team2.length > 0;
    if (!teamsReady) return;

    const team1Defeated = arenaTeams.team1.every(p => p.isDefeated);
    const team2Defeated = arenaTeams.team2.every(p => p.isDefeated);

    if (team1Defeated) setWinner("team2");
    if (team2Defeated) setWinner("team1");
  }, [arenaTeams]);

  const getTeamPokemons = (team: Team) => {
    return arenaTeams[team];
  };

  const findPokemonInTeam = (pokemon: Pokemon, arr: ArenaPokemon[]) => {
    const foundPokemon = arr.find(p => p.id === pokemon.id);
    if (foundPokemon) {
      return foundPokemon
    } else {
      console.warn("Pokemon not found")
    }
  };

  const updatePokemonHp = (pokemon: Pokemon, team: Team, hpChange: number) => {
    setArenaTeams(prev => {
      const affectedTeamSelection = prev[team];
      const affectedPokemon = findPokemonInTeam(pokemon, affectedTeamSelection);
      if (affectedPokemon){

        const newHp = Math.max(0, affectedPokemon.hp + hpChange);
        const updatedPokemon = {
          ...affectedPokemon, 
          hp: newHp, 
          isDefeated: newHp <= 0,
          cardRef: affectedPokemon.cardRef,
        };

        const updatedSelection = affectedTeamSelection.map(p => p.id === affectedPokemon.id ? updatedPokemon : p);
        return {...prev, [team]: updatedSelection};
      } else {
        console.log("Failed to deal damage.")
        return prev;
      }
    });
  };

  const getPokemonHp = (pokemon: Pokemon, team: Team) => {
    const selectedPokemon = findPokemonInTeam(pokemon, arenaTeams[team]);
    return selectedPokemon ? selectedPokemon.hp : pokemon.hp;
  };

  const setCardRef = (pokemon: Pokemon, team: Team, ref: React.RefObject<HTMLDivElement | null>) => {
    setArenaTeams(prev => {
      const selectedPokemon = findPokemonInTeam(pokemon, prev[team]);
      if (selectedPokemon) {
        const updatedPokemon: ArenaPokemon = {...selectedPokemon, cardRef: ref};
        const updatedSelection = prev[team].map(p => p.id === updatedPokemon.id ? updatedPokemon : p);
        return {...prev, [team]: updatedSelection};
      } else {
        return prev;
      }
    });
  };

  const getCardRef = (pokemon: Pokemon, team: Team) => {
    const selectedPokemon = findPokemonInTeam(pokemon, arenaTeams[team]);
    if (selectedPokemon?.cardRef) {
      return selectedPokemon.cardRef;
    } else {
      console.log("No card ref found for", selectedPokemon);
      return undefined
    }
  };

  const getIsDefeated = (pokemon: Pokemon, team: Team) => {
    const selectedPokemon = findPokemonInTeam(pokemon, arenaTeams[team]);
    return selectedPokemon?.isDefeated
  };

  const resetBattle = () => {
    setArenaTeams({
      team1: selection.team1,
      team2: selection.team2,
    });
    setCurrentTurn("team1");
    setWinner(undefined);
    setAttackAnimationData(null);
    setMoveSelectedFor(undefined);
  };


  return (
    <BattleContext.Provider
      value={{
        arenaTeams,
        getTeamPokemons,
        currentTurn,
        setCurrentTurn,
        moveSelectedFor,
        setMoveSelectedFor,
        setCardRef,
        getCardRef,
        updatePokemonHp,
        getPokemonHp,
        getIsDefeated,
        attackAnimationData,
        setAttackAnimationData,
        winner,
        setWinner,
        resetBattle,
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

export {BattleProvider, useBattle, type AttackAnimationData}