import { Pokemon } from "@/types/pokemon";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import getTypeColor from "@/styles/getTypeColor";
import MovesPopup from "./MovesPopup";
import { card } from "@/styles/arenaStyles";
import { Team } from "@/types/team";
import { AnimatePresence } from "framer-motion";
import { useBattle } from "@/contexts/battleContext";
import { type TeamStyles } from "@/types/teamStylesType";
import useBattleEngine from "@/services/battle/battleEngine";
import PokemonSpeak from "./PokemonSpeak";
import TargetArrow from "./TargetArrow";


type Props = {
  pokemon: Pokemon;
  team: Team;
  canMove: boolean
};
export default function PokemonCard({ pokemon, team, canMove }: Props) {
  const styles = pokemon.isDefeated ? card.isDefeated : card[team];
  const cardRef = useRef<HTMLDivElement>(null);
  const [showMoves, setShowMoves] = useState<Pokemon | null>(null);
  const { moveSelectedFor, setMoveSelectedFor } = useBattle();
  const { executeMove } = useBattleEngine();
  const { setCardRef, getIsDefeated, arenaTeams, getHasMoved } = useBattle();
  const isOfFirstThreePokemon = arenaTeams[team].findIndex(p => p.id === pokemon.id) <= 2;
  const hasMoved = getHasMoved(pokemon, team);

  const isDefeated = getIsDefeated(pokemon, team);

  useEffect(() => {
    if (cardRef.current) {
      setCardRef(pokemon, team, cardRef);
    }
  }, [pokemon, team, cardRef]); 

  useEffect(() => {
    if (!showMoves) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowMoves(null);
        setMoveSelectedFor(undefined);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoves, setMoveSelectedFor]);

  const handlePokemonClick = () => {
    if (isDefeated || hasMoved) return;

    // if Defending 
    if (moveSelectedFor && moveSelectedFor.team !== team) {
      const attacker = {team: moveSelectedFor.team, pokemon:moveSelectedFor.pokemon};
      const target = {team, pokemon};

      executeMove(attacker, target, moveSelectedFor.move);
      setMoveSelectedFor(undefined);    
    };

    // if Attacking 
    if (canMove && !hasMoved) {
      setShowMoves(pokemon);
    };
  };

  const closeMoves = () => {
    setShowMoves(null);
  };

  return (
    <div
      ref={cardRef}
      className={"relative"}
    >
      {(moveSelectedFor?.team === team && moveSelectedFor.pokemon === pokemon) && <PokemonSpeak text="Select  target!" isOfFirstThree={isOfFirstThreePokemon} />}
      {(moveSelectedFor && moveSelectedFor?.team !== team && !isDefeated) && <TargetArrow />}
      <div
        className={`relative scale-60 md:scale-none lg:min-w-35 max-w-30 lg:max-w-none ${showMoves ? "ring-4 ring-yellow-400" : ""} ${styles.bg} ${styles.border}
          rounded-xl p-4 border-2 shadow-lg ${!isDefeated ? "hover:shadow-xl cursor-pointer hover:scale-65 md:hover:scale-105" : "cursor-not-allowed opacity-75"}
          duration-200 hover:z-[200]`}
        onClick={() => handlePokemonClick()}
      >

        <PokemonHp pokemon={pokemon} team={team} styles={styles} />

        <div className="flex justify-center mb-3">
          <div className={`relative w-20 h-20 bg-gradient-to-br ${styles.imageBg} rounded-full p-2`}>
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              width={80}
              height={80}
              className={`w-full h-full object-contain ${(isDefeated || hasMoved) ? 'filter grayscale brightness-50' : ''}`}
            />

            {isDefeated && (
              <div className="absolute inset-0 bg-black-300 bg-opacity-90 rounded-full flex items-center justify-center" />
            )}
          </div>
        </div>

        <div className="text-center">
          <p className={`font-bold capitalize text-sm mb-1 ${isDefeated ? 'text-gray-500' : 'text-gray-800'}`}>
            {pokemon.name}
          </p>
          <div className="flex justify-center gap-1">
            {pokemon.types?.map((type, index) => (
              <span 
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isDefeated ? 'bg-gray-300 text-gray-600' : getTypeColor(type)
                }`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        
      </div>
      <AnimatePresence>
        {showMoves && !isDefeated && (
          <MovesPopup
            pokemon={pokemon}
            team={team}
            onClose={closeMoves}
            isOfFirstThree={isOfFirstThreePokemon}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PokemonHp({ pokemon, team, styles }: {pokemon: Pokemon, team: Team, styles: TeamStyles[keyof TeamStyles]}) {
  const { getPokemonHp } = useBattle();
  const maxHp = pokemon.hp;
  const currentHp = getPokemonHp(pokemon, team);
  const hpDifference = Math.max(0, Math.min(100, (currentHp / maxHp) * 100))

  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
        <span>HP</span>
        <span>{currentHp} / {maxHp}</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2">
        <div 
          className={`${styles.healthBar} h-2 rounded-full`}
          style={{ width: `${hpDifference}%` }}
        ></div>
      </div>
    </div>
  )
}