'use client';
import { usePokemonSelection } from '@/contexts/pokemonSelectionContext';
import { Pokemon } from '@/types/pokemon'; 
import { useEffect } from 'react';


export default function ClientShell({ pokemons }: {pokemons: Pokemon[]}) {
  const { updateCachedPokemons } = usePokemonSelection();

  useEffect(() => {
    updateCachedPokemons(pokemons);
  }, [pokemons]);

  return null;
}