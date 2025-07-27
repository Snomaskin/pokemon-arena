import { Pokemon } from "@/types/pokemon";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import getTypeColor from "../../styles/getTypeColor";
import MovesPopup from "./MovesPopup";
import { card } from "@/styles/arenaStyles";
import type { Team } from "@/contexts/pokemonSelectionContext";
import { AnimatePresence } from "framer-motion";


type Props = {
  pokemon: Pokemon;
  team: Team;
};
export default function PokemonCard({ pokemon, team }: Props) {
  const styles = card[team];
  const cardRef = useRef<HTMLDivElement>(null);
  const [showMoves, setShowMoves] = useState<Pokemon | null>(null);
  
  useEffect(() => {
    if (!showMoves) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        closeMoves();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoves]);

  const handlePokemonClick = () => {
    setShowMoves(pokemon);
  };

  const closeMoves = () => {
    setShowMoves(null);
  };

  return (
    <div
      ref={cardRef}
      className={"relative"}
    >
      <div
        className={`lg:min-w-35 sm:max-w-30 ${showMoves ? "ring-4 ring-yellow-400" : ""} ${styles.bg} ${styles.border}
          rounded-xl p-4 border-2 shadow-lg hover:shadow-xl cursor-pointer
          transition-all duration-200 transform hover:scale-105`}
        onClick={() => handlePokemonClick()}
      >

        <div className="mb-2">
          <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
            <span>HP</span>
            <span>100/100</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div className={`${styles.healthBar} h-2 rounded-full w-full`}></div>
          </div>
        </div>

        <div className="flex justify-center mb-3">
          <div className={`relative w-20 h-20 bg-gradient-to-br ${styles.imageBg} rounded-full p-2`}>
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="font-bold text-gray-800 capitalize text-sm mb-1">
            {pokemon.name}
          </p>
          <div className="flex justify-center gap-1">
            {pokemon.types?.map((type, index) => (
              <span 
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        
      </div>
      <AnimatePresence>
        {showMoves && (
          <MovesPopup
            pokemon={pokemon}
            team={team}
            onClose={closeMoves}
            onMoveSelect={closeMoves}
          />
        )}
      </AnimatePresence>
    </div>
  );
}