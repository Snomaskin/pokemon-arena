"use client"
import PokemonCard from "./ArenaCard";
import { Team } from "@/types/team";
import { usePokemonSelection } from "@/contexts/pokemonSelectionContext";
import { motion } from "framer-motion";
import { useBattle } from "@/contexts/battleContext";
import { ReactNode } from "react";
import { teamRocket, ashPikachuSitting } from "@/assets/index";
import Image from "next/image";
import SpeechBubble from "@/components/SpeechBubble";


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
      className={`flex ${team === "team2" && "flex-row-reverse"}`}
    >
      <div className={`lg:flex hidden relative ${team === "team1" ? "-left-15" : "-right-15 mt-25"}  items-center justify-center z-[500] ${currentTurn === team ? "animate-bounce" : "animate-pulse"}`}>
        <SpeechBubble text="test" arrowRight={team === "team1"} />
        <Image
          src={team === "team1" ? ashPikachuSitting : teamRocket}
          alt={team}
          width={team === "team1" ? 130 : 150}
        />   
      </div>   
     {currentTurn === team ? (
      <CurrentTeamOverlay>
        <TeamGrid team={team} canMove={true}/>
      </CurrentTeamOverlay>
     )
    : 
     <OpposingTeamOverlay>
      <TeamGrid team={team} canMove={false} />
    </OpposingTeamOverlay>
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

function OpposingTeamOverlay({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="relative bg-red-200/50 px-6 md:py-10 rounded-2xl z-[50]"
      animate={{
        scale: [1, 0.98, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
      }}
    >      
      {children}
    </motion.div>
  );
}