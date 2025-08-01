import { usePokemonSelection } from "@/contexts/pokemonSelectionContext";
import { useBattle } from "@/contexts/battleContext";
import PokemonCard from "./PokemonCard";


export default function WinnerPokemons() {
    const { selection } = usePokemonSelection();
    const { winner } = useBattle();
    const winnerPokemons = selection[winner!];

    return (
      <div className="w-full max-w-3xl mx-auto">

        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg">
            🏆 Congratulations, {winner?.toUpperCase()} 🏆
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-6 lg:gap-8 items-center justify-center">
          {winnerPokemons && winnerPokemons.map((pokemon, index) => (
            <div 
              key={pokemon.id} 
              className="animate-fade-in-up"
              style={{ 
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'both'
              }}
            >
              <PokemonCard 
                pokemon={pokemon} 
                team={winner!} 
              />
            </div>
          ))}
        </div>


        <div className="mt-4 lg:mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="grid grid-cols-3 gap-4 text-center text-white">
            <div>
              <div className="text-2xl font-bold text-yellow-300">{winnerPokemons?.length || 0}</div>
              <div className="text-sm opacity-80">Champions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-300">100%</div>
              <div className="text-sm opacity-80">Superior Team</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-300">⭐⭐⭐</div>
              <div className="text-sm opacity-80">Rating</div>
            </div>
          </div>
        </div>
      </div>
    )
}
