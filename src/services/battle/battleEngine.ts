import { useBattle } from "@/contexts/battleContext";
import { Move } from "@/types/pokemon";
import calculateDamage from "./calculateDamage";
import { Team, PokemonOfTeam } from "@/types/team";


export default function useBattleEngine() {
  const { currentTurn, setCurrentTurn, updatePokemonHp, setAttackAnimationData, findPokemonInTeam, getTeamPokemons, setHasMoved, resetTeamHasMoved } = useBattle();

  const executeMove = (attacker: PokemonOfTeam, target: PokemonOfTeam, move: Move) => {
    const arenaPokemon = findPokemonInTeam(attacker.pokemon, attacker.team);

    if (arenaPokemon?.hasMoved) return "Can only move once per turn. Try another Pokemon.";

    setAttackAnimationData({
      attacker: {team: attacker.team, pokemon: attacker.pokemon},
      target: {team: target.team, pokemon: target.pokemon},
      move,
    });
    setTimeout(() => {
      const damage = calculateDamage(attacker.pokemon, target.pokemon, move);
      updatePokemonHp(target.pokemon, target.team, - damage);
      setHasMoved(attacker.pokemon, attacker.team, true);
      const teamPokemons = getTeamPokemons(attacker.team);
      const teamHasMoved = teamPokemons.every(p => 
        p.id === attacker.pokemon.id || p.hasMoved
      );

      if (teamHasMoved) {
        setCurrentTurn(switchTeam(currentTurn));
        resetTeamHasMoved(attacker.team);
        resetTeamHasMoved(target.team);

      }
    }, 2000)

  };

  return { executeMove };
};

function switchTeam(team: Team): Team {
  return team === "team1" ? "team2" : "team1";
};