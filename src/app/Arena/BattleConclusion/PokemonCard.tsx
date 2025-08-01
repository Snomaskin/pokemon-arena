import Image from "next/image"
import { card } from "@/styles/arenaStyles"
import { Team } from "@/types/team"
import { Pokemon } from "@/types/pokemon";


export default function PokemonCard({ pokemon, team}: { pokemon: Pokemon, team: Team }) {
  const styles = card[team];

  return (
    <div className={"relative 'animate-float'"}>
      
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 text-3xl animate-bounce">
        👑
      </div>

      <div className={`absolute inset-0 ${styles.bg} rounded-xl blur-lg opacity-30 scale-110 animate-pulse`} />

      <div
        className={`relative max-h-45 lg:max-h-none lg:min-w-40 sm:max-w-36 ${styles.bg} ${styles.border}
          rounded-xl p-6 border-4 shadow-2xl hover:shadow-3xl cursor-pointer
          transition-all duration-300 transform hover:scale-110 scale-105 shadow-3xl border-yellow-400`}
      >

        <>
          <div className="absolute top-2 right-2 text-yellow-400 animate-ping">✨</div>
          <div className="absolute top-4 left-2 text-yellow-300 animate-ping animation-delay-500">⭐</div>
          <div className="absolute bottom-2 right-4 text-yellow-500 animate-ping animation-delay-1000">💫</div>
        </>

        <div className="flex justify-center mb-4">
          <div className={`relative w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br ${styles.imageBg} rounded-full p-3 shadow-inner animate-spin-slow `}>
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              width={100}
              height={100}
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </div>
        </div>

        <div className="text-center">
          <p className={"font-bold capitalize text-base lg:text-lg mb-2 text-yellow-800"}>
            {pokemon.name}
          </p>

        </div>
      </div>
    </div>
  )
}