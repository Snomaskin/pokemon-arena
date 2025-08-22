export default function PokemonArenaHeader() {
  return (
    <div className="flex items-center justify-center w-full h-15 bg-gradient-to-br from-purple-50 to-purple-300 shadow-md relative border-b border-purple-200">
      <h1 className="text-3xl font-bold text-white">Pokémon</h1>
      <h1 className="text-3xl font-black text-red-500">&nbsp;◓&nbsp;</h1>
      <h1 className="text-3xl font-bold text-red-500 mr-12">Arena</h1>
    </div>
  )
}