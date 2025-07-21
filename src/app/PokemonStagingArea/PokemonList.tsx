import Image from "next/image";
import { Team } from "@/contexts/pokemonSelectionContext";
import { Pokemon } from "@/types/pokemon";
import { stagingListStyles } from "@/styles/teamStyles";
import xIcon from "@/assets/close.png";
import EmptySlots from "./EmptySlots";


export default function PokemonList({ team, pokemons, rmPokemon }: 
  { team: Team, pokemons: Pokemon[], rmPokemon: (pokemon: Pokemon, team: Team) => void }) {
    const style = stagingListStyles[team];

    return (
      <div className="space-y-1 lg:space-y-2">
        {pokemons.map((pokemon) => (
          <div 
            key={pokemon.id} 
            className={`flex items-center bg-white rounded-lg p-2 shadow-md border-2 ${style.border} ${style.borderHover} hover:shadow-lg transition-all duration-200 group`}
          >

            <div className="w-10 h-10 lg:w-12 lg:h-12">
              <Image 
                src={pokemon.imageUrl}
                alt={pokemon.name}
                width={48}
                height={48}
                className="object-contain w-full h-full"
              />
            </div>
            
            <p className="text-xs lg:text-sm text-center font-semibold text-gray-700 capitalize flex-grow">
              {pokemon.name}
            </p>
            
            <button 
              className={`flex w-5 h-5 lg:w-6 lg:h-6 ${style.buttonBg} ${style.buttonHoverBg} items-center justify-center rounded-full opacity-0 group-hover:opacity-100  shadow-md cursor-pointer`}
              onClick={() => rmPokemon(pokemon, team)}
            >
              <div className="w-2 h-2 lg:w-3 lg:h-3 ">
                <Image
                  src={xIcon}
                  alt="Remove"
                  width={12}
                  height={12}
                  className="object-contain filter invert w-full h-full"
                />
              </div>
            </button>
          </div>
        ))}
        
        <EmptySlots pokemons={pokemons} team={team} />
      </div>
    );
};