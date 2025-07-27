"use client"
import PokemonCard from "./PokemonCard";
import type { Team } from "@/contexts/pokemonSelectionContext";
import { usePokemonSelection } from "@/contexts/pokemonSelectionContext";
import { motion } from "framer-motion";


type Props = {
  team: Team;
};
export default function ArenaTeam({ team }: Props) {
  const { selection } = usePokemonSelection();
  const pokemons = selection[team];

  return pokemons?.length && (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={`grid gap-6 justify-items-center ${
        pokemons.length < 3 
        ? "grid-cols-3"
        : "grid-cols-6"}`}
      >
        {pokemons.map((pokemon) => (
          <PokemonCard 
            key={pokemon.id}
            pokemon={pokemon}
            team={team}
          />
        ))}
      </div>
    </motion.div>
  );
}