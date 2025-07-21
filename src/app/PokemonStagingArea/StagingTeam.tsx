"use client"
import { type Team, usePokemonSelection } from "@/contexts/pokemonSelectionContext";
import { stagingStyles } from "@/styles/teamStyles";
import PokemonList from "./PokemonList";


export default function StagingTeam({ team }: { team: Team }) {
  const { selection, rmPokemon } = usePokemonSelection();
  const teamPokemons = selection[team];
  const style = stagingStyles[team];

  return (
    <div className="flex-1 lg:max-w-md">
      <div className={`${style.bg} lg:min-w-44 lg:min-h-[488px] rounded-lg p-2 border-2 ${style.border}`}>
        <h3 className={`text-base lg:text-lg font-semibold ${style.titleText} mb-2 lg:mb-3 text-center`}>Team 1</h3>
        {teamPokemons && teamPokemons.length > 0 ? (
          <PokemonList team={team} pokemons={teamPokemons} rmPokemon={rmPokemon} />
        ) : (
          <div className={`flex flex-col lg:min-h-100 items-center justify-center ${style.baseText} py-4 lg:py-8`}>
            <p className="text-xs lg:text-sm">No Pokemon selected</p>
            <p className={`text-xs ${style.altText} mt-1 lg:block`}>Choose your fighters!</p>
          </div>
        )}
      </div>
    </div>
  );
};