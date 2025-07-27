'use client';
import { usePokemonSelection } from '@/contexts/pokemonSelectionContext';
import PokemonGrid from './PokemonGrid';
import PokemonStagingArea from './PokemonStagingArea';
import { Pokemon } from '@/types/pokemon'; 
import { useState, useEffect } from 'react';
import pokemonWithBase64Img from '@/utils/pokemonWithBase64Img';
import Loader from '@/components/Loader';


export default function ClientShell({ pokemons }: {pokemons: Pokemon[]}) {
  const { selection } = usePokemonSelection();
  const [cachedPokemons, setCachedPokemons] = useState<Pokemon[]>();

  useEffect(() => {
    const updateCachedPokemons = async () => {
      const newPokemons = await Promise.all(pokemons.map((p) => pokemonWithBase64Img(p)));
      setCachedPokemons(newPokemons);
    }; 
    updateCachedPokemons();
  }, []);

  const hasPokemons = (selection.team1?.length ?? 0) > 0 || (selection.team2?.length ?? 0) > 0;

  return (
    <div className='flex pt-2'>
      {cachedPokemons?.length 
      ? <><PokemonGrid pokemons={cachedPokemons} team='team1' />
        <PokemonGrid pokemons={cachedPokemons} team='team2' />
        </>
      : <Loader />
      }

      {hasPokemons && <PokemonStagingArea />}
    </div>
  );
}