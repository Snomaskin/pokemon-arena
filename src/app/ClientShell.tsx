'use client';
import { usePokemonSelection } from '@/contexts/pokemonSelectionContext';
import PokemonGrid from './PokemonGrid';
import PokemonStagingArea from './PokemonStagingArea';
import { Pokemon } from '@/types/pokemon'; 


export default function ClientShell({ pokemons }: {pokemons: Pokemon[]}) {
  const { selection } = usePokemonSelection();

  const hasPokemons = (selection.team1?.length ?? 0) > 0 || (selection.team2?.length ?? 0) > 0;

  return (
    <div className='flex pt-2'>
      <PokemonGrid pokemons={pokemons} team='team1' />
      <PokemonGrid pokemons={pokemons} team='team2' />
      {hasPokemons && <PokemonStagingArea />}
    </div>
  );
}
