import { Move, Pokemon } from "@/types/pokemon";

export default function calculateDamage(attacker: Pokemon, defender: Pokemon, move: Move) {
  const level = 1; // Update later once I implement leveling system.
  const movePower = move.power;
  if (movePower === 0) return 0;

  const attackerAtk = attacker.attack;
  const nonZeroAtk = attackerAtk === 0 ? 1 : attackerAtk;

  const defenderDfs = defender.defense;
  const nonZeroDfs = defenderDfs === 0 ? 1 : defenderDfs;

  return Math.floor((((2 * level / 5 + 2) * movePower * (nonZeroAtk / nonZeroDfs)) / 50) + 2)
}