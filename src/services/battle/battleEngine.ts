import { useBattle } from "@/contexts/battleContext";
import { Move } from "@/types/pokemon";
import calculateDamage from "./calculateDamage";
import { Team, PokemonOfTeam } from "@/types/team";


export default function useBattleEngine() {
  const { currentTurn, setCurrentTurn, updatePokemonHp, setAttackAnimation } = useBattle();

  const executeMove = (attacker: PokemonOfTeam, target: PokemonOfTeam, move: Move) => {
    setAttackAnimation({
      attacker: {team: attacker.team, pokemon: attacker.pokemon},
      target: {team: target.team, pokemon: target.pokemon},
      move,
    });
    setTimeout(() => {
      const damage = calculateDamage(attacker.pokemon, target.pokemon, move);
      updatePokemonHp(target.pokemon, target.team, - damage);
      setCurrentTurn(switchTeam(currentTurn));
    }, 1000)

  };

  return { executeMove };
};

function switchTeam(team: Team): Team {
  return team === "team1" ? "team2" : "team1";
};