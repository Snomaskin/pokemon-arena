import { Pokemon, Move } from "@/types/pokemon";
import { motion } from "framer-motion";
import getTypeColor from "@/styles/getTypeColor";
import { Team } from "@/types/team";
import { moves } from "@/styles/arenaStyles";
import { useBattle } from "@/contexts/battleContext";


type Props = {
  pokemon: Pokemon;
  team: Team;
  onClose: () => void;
  isOfFirstThree: boolean;
};
export default function MovesPopup({ pokemon, team, onClose, isOfFirstThree }: Props) {
  const styles = moves[team];
    const { setMoveSelectedFor } = useBattle();

  const handleMoveSelect = (move: Move) => {
    setMoveSelectedFor({team, pokemon, move});
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: team === "team1" ? -10 : 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: team === "team1" ? -10 : 10 }}
      transition={{ duration: 0.2 }}
      className={`absolute ${styles.placement} ${isOfFirstThree ? "-left-1/6" : "-right-1/6"} lg:left-1/2 lg:-translate-x-1/2 md:translate-y-0 w-64 z-[200]
        scale-75 md:scale-none rounded-xl shadow-xl border ${styles.bg} ${styles.border}`}
    >
      <div className="p-3 max-h-64 overflow-y-auto">
        {pokemon.moves?.map((move, index) => (
          <button
            key={index}
            className={`w-full text-left text-sm p-3 rounded-lg mb-2 border 
              ${styles.hover} transition-colors duration-150 cursor-pointer`}
            onClick={() => {
              handleMoveSelect(move);
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