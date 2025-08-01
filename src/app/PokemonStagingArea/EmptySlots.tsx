import { stagingListStyles } from "@/styles/teamStyles";
import { Team } from "@/types/team";
import { Pokemon } from "@/types/pokemon";


export default function EmptySlots({ pokemons, team }: { pokemons: Pokemon[], team: Team }) {
  const style = stagingListStyles[team];
  
  return (
    Array.from({ length: Math.max(0, 6 - pokemons.length) }).map((_, index) => (
      <div 
        key={`empty-${index}`}
        className={`flex items-center bg-gray-50 rounded-lg p-2 border-2 border-dashed ${style.emptySlotBg} gap-2 lg:gap-3 h-12 lg:h-16`}
      >
        <div className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full ${style.emptySlotInnerBg} flex-shrink-0`}>
          <span className={`text-base lg:text-lg ${style.text}`}>+</span>
        </div>
        <p className={`text-xs lg:text-sm ${style.text}`}>
          Empty Slot
        </p>
      </div>
    ))
  )
};