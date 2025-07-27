import { Pokemon, Move } from "@/types/pokemon";
import { motion } from "framer-motion";
import getTypeColor from "../../styles/getTypeColor";
import { Team } from "@/contexts/pokemonSelectionContext";
import { moves } from "@/styles/arenaStyles";


type Props = {
  pokemon: Pokemon;
  team: Team;
  onClose: () => void;
  onMoveSelect: (move: Move) => void;
};
export default function MovesPopup({ pokemon, team, onClose, onMoveSelect }: Props) {
  const styles = moves[team];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: team === "team1" ? -10 : 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: team === "team1" ? -10 : 10 }}
      transition={{ duration: 0.2 }}
      className={`absolute ${styles.placement} left-1/2 -translate-x-1/2 w-64 z-[100]
        rounded-xl shadow-xl border ${styles.bg} ${styles.border}`}
    >
      <div className="p-3 max-h-64 overflow-y-auto">
        {pokemon.moves?.map((move, index) => (
          <button
            key={index}
            className={`w-full text-left text-sm p-3 rounded-lg mb-2 border 
              ${styles.hover} transition-colors duration-150 cursor-pointer`}
            onClick={() => {
              onMoveSelect(move);
              onClose();
            }}
          >
            <p className={`font-bold capitalize ${styles.text}`}>
              {move.name}
            </p>
            <div className="flex gap-2 text-xs text-gray-500">
              {move.type && (
                <span className={`px-2 py-0.5 rounded-full font-medium ${getTypeColor(move.type)}`}>
                  {move.type}
                </span>
              )}
              {move.power && <span>Power: {move.power}</span>}
            </div>
          </button>
        ))}
      </div>
      <div className="p-2 border-t text-center">
        <button
          onClick={() => onClose()}
          className="text-xs text-gray-500 hover:underline cursor-pointer"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}