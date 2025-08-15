"use client";
import { useState, useEffect } from "react";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import PokemonCard from "./PokemonCard";
import { usePokemonSelection } from "@/contexts/pokemonSelectionContext";
import { Team } from "@/types/team";
import { selectionStyles } from "@/styles/teamStyles";
import Modal from "@/components/Modal";


export default function PokemonGrid({ pokemons, team }: { pokemons: Pokemon[], team: Team }) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { updatePokemonSelection } = usePokemonSelection();

  const handleAddPokemon = (pokemon: Pokemon, team: Team) => {
    updatePokemonSelection(pokemon, team);
    setShowModal(false);
  }

  useEffect(() => {
    if (selectedPokemon) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [selectedPokemon]);


  const style = selectionStyles[team];

  return (
    <>
      <div className="w-full max-w-7xl mx-auto pl-3 mb-6">
        <div className={`${style.bg} ${style.border} border-2 rounded-xl shadow-lg p-4 lg:p-6`}>

          <div className="mb-4 lg:mb-6 text-center">
            <h3 className={`text-lg lg:text-xl font-bold ${style.title} mb-1`}>
              {team === 'team1' ? 'Team 1 Selection' : 'Team 2 Selection'}
            </h3>
            <p className={`text-sm ${style.subtitle}`}>
              Choose your fighters
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-x-9 justify-items-center">
            {pokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className={`flex w-16 h-16 lg:w-20 lg:h-20 ${style.itemBg} rounded-full shadow-md justify-center items-center ${style.itemHoverBg} hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 ${style.border} group`}
                onClick={() => setSelectedPokemon(pokemon)}
              >
                <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                  <Image
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    width={56}
                    height={56}
                    className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPokemon && (
        <Modal showModal={showModal} hideModal={() => setSelectedPokemon(null)}>
          <PokemonCard pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} onSelect={handleAddPokemon} team={team} />
        </Modal>
      )}
    </>
  );
}