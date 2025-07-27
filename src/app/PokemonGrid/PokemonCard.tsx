import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { type Team } from "@/contexts/pokemonSelectionContext";
import { cardStyles } from "@/styles/teamStyles";
import getTypeColor from "@/styles/getTypeColor";


type Props = {
  pokemon: Pokemon; 
  team: Team;
  onClose: () => void;
  onSelect: (pokemon: Pokemon, team: Team) => void;
};

export default function PokemonCard({ pokemon, team, onClose, onSelect }: Props) {
  const style = cardStyles[team];

  return (
    <div className={`relative max-w-sm min-w-sm ${style.bg} ${style.border} border-4 rounded-xl overflow-hidden`}>
      <div className={`${style.headerBg} px-6 py-4 relative`}>
        <button
          onClick={() => onClose()}
          className={`absolute top-4 right-2 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 ${style.closeHover} rounded-full text-xl font-bold cursor-pointer transition-colors duration-200`}
        >
          ×
        </button>
        <div className="flex items-center justify-between pr-8">
          <h2 className={`text-2xl font-bold ${style.accent} capitalize`}>
            {pokemon.name}
          </h2>
          {pokemon.types.map((type, index) => (
            <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>{type}</span>
          ))}
          <div className={`${style.accent} font-bold text-lg bg-white/50 px-3 py-1 rounded-full`}>
            HP {pokemon.hp}
          </div>
        </div>
      </div>


      <div className="flex justify-center py-6 bg-white/30">
        <div className="relative">
          <Image
            src={pokemon.imageUrl}
            alt={pokemon.name}
            width={180}
            height={180}
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>


      <div className="px-6 pb-6">
        {pokemon.moves && pokemon.moves.length > 0 && (
          <div className="mb-6">
            <h3 className={`text-lg font-bold ${style.accent} mb-3`}>Attacks</h3>
            <div className="space-y-2 lg:space-y-3">
              {pokemon.moves.slice(0, 3).map(move => (
                <div key={move.name} className="bg-white/60 rounded-lg p-2 border border-white/40">
                  <h4 className={`flex items-center justify-between font-bold ${style.accent} capitalize mb-1`}>
                    {move.name}
                    {move.type && (
                      <span className={`mr-2 px-2 py-1 rounded-full text-xs font-medium lowercase ${getTypeColor(move.type)}`}>
                        {move.type}
                      </span>
                    )}
                  </h4>


                  <p className="text-sm line-clamp-2 lg:line-clamp-4 text-gray-700 leading-relaxed">
                    {move.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={() => onSelect(pokemon, team)} 
          className={`w-full ${style.buttonBg} ${style.buttonText} py-3 px-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer`}
        >
          Add to {team === 'team1' ? 'Team 1' : 'Team 2'}
        </button>
      </div>
    </div>
  )
}