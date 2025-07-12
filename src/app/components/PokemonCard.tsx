import { Pokemon } from "@/utils/fetchPokemon";
import Image from "next/image";


export default function PokemonCard({ pokemon, onClose }: {pokemon: Pokemon, onClose: () => void}) {
  return (
    <div className="flex max-w-sm bg-amber-200 rounded-lg flex-col p-6">
      <button
        onClick={() => onClose()}
        className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 bg-transparent hover:bg-black/10 rounded-full text-xl font-bold leading-none cursor-pointer"
      >
        ×
      </button>
      <p className="font-bold">HP{" "}{pokemon.hp}</p>
        <Image
          className="self-center"
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width={200}
          height={200}
        />
      <p className="text-2xl">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
      <div>{pokemon.abilities ? pokemon.abilities.map(ability => (
          <div key={ability.name} className="w-full max-w-sm">
            <p className="font-bold pt-1">{ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}</p>
            <p className="line-clamp-3 text-sm ml-0.5 mr-0.5 text-gray-700 whitespace-normal">{ability.description}</p>
          </div>
        )) : null}
      </div>
    </div>
  )
}