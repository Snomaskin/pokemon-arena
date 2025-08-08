"use client"
import PokemonCard from "./ArenaCard";
import { Team } from "@/types/team";
import { usePokemonSelection } from "@/contexts/pokemonSelectionContext";
import { motion } from "framer-motion";
import { useBattle } from "@/contexts/battleContext";
import { ReactNode } from "react";


type Props = {
  team: Team;
};
export default function ArenaTeam({ team }: Props) {
  const { currentTurn } = useBattle();

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
     {currentTurn === team ? (
      <CurrentTeamOverlay>
        <TeamGrid team={team} canMove={true}/>
      </CurrentTeamOverlay>
     )
    : <TeamGrid team={team} canMove={false} />
    }
    </motion.div>
  );
}

function TeamGrid({ team, canMove }: { team: Team, canMove: boolean }) {
  const { selection } = usePokemonSelection();
  const pokemons = selection[team];

  return (
    <div className={`grid gap-6 justify-items-center justify-self-center ${
      pokemons.length <= 3 
      ? "grid-cols-3"
      : "grid-cols-6"}`}
    >
      {pokemons.map((pokemon) => (
        <PokemonCard 
          key={pokemon.id + team}
          pokemon={pokemon}
          team={team}
          canMove={canMove}
        />
      ))}
    </div>
  );
}

function CurrentTeamOverlay({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="relative bg-amber-200/70 px-6 md:py-10 rounded-2xl z-[100]"
      animate={{
        scale: [1, 1.03, 1],
        opacity: [1, 0.95, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
      }}
    >      
      {children}
    </motion.div>
  );
}