import { useState, useEffect } from "react";
import { Pokemon } from "@/utils/fetchPokemon";
import Image from "next/image";
import PokemonCard from "./PokemonCard";


export default function PokemonSelectorGrid({ pokemons }: { pokemons: Pokemon[] }) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedPokemon) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [selectedPokemon]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 m-10 w-[90%] max-w-screen-xl bg-amber-50 shadow rounded-lg place-items-center p-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="flex w-20 h-20 bg-amber-50 rounded-full shadow-xl justify-center items-center hover:bg-amber-200 hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
            onClick={() => setSelectedPokemon(pokemon)}
          >
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              width={70}
              height={60}
            />
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
            showModal ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black opacity-80"
            onClick={() => setSelectedPokemon(null)}
          />
          <div
            className={`relative shadow-2xl transform transition-all duration-300 ${
              showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
          <PokemonCard pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
          </div>
        </div>
      )}
    </>
  );
}
