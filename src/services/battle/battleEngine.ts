import { useBattle } from "@/contexts/battleContext";
import { Move, Pokemon } from "@/types/pokemon";
import calculateDamage from "./calculateDamage";
import { Team } from "@/contexts/pokemonSelectionContext";


type PokemonOfTeam = {
  team: Team,
  pokemon: Pokemon,
};

export default function useBattleEngine() {
  const { currentTurn, setCurrentTurn, updatePokemonHp } = useBattle();

  const executeMove = (attacker: PokemonOfTeam, defender: PokemonOfTeam, move: Move) => {
    const damage = calculateDamage(attacker.pokemon, defender.pokemon, move);
    updatePokemonHp(defender.pokemon, defender.team, - damage);
    setCurrentTurn(switchTeam(currentTurn));
  };

  return { executeMove };
};

function switchTeam(team: Team): Team {
  return team === "team1" ? "team2" : "team1";
};