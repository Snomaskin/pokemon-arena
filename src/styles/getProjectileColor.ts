const getProjectileColor = (moveType: string) => {
  const colors = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    psychic: 'bg-purple-500',
    ice: 'bg-cyan-500',
    dragon: 'bg-indigo-500',
    dark: 'bg-gray-800',
    fairy: 'bg-pink-500',
    fighting: 'bg-red-700',
    poison: 'bg-purple-700',
    ground: 'bg-yellow-700',
    flying: 'bg-blue-300',
    bug: 'bg-green-600',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-900',
    steel: 'bg-gray-500',
    normal: 'bg-gray-400'
  };
  return colors[moveType as keyof typeof colors] || colors.normal;
};

export { getProjectileColor }