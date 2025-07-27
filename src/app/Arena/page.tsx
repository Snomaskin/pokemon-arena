import ArenaTeam from "./ArenaTeam";


export default function Arena() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 p-4">
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-700 mb-2">
          Pokémon Battle
        </h1>
        <div className="w-70 h-0.5 bg-amber-300 mx-auto"></div>
      </div>

      <div className="flex flex-col items-center">

        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          Team 1
        </h2>

        <ArenaTeam team="team1" />

        <div className="flex items-center justify-center m-8 w-full">
          <div className="h-px bg-blue-300 flex-1"></div>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg lg:text-xl px-4  py-2 rounded-full shadow-lg border-2 border-yellow-300">
            VS
          </div>
          <div className="h-px bg-red-300 flex-1"></div>
        </div>


        <h2 className="text-2xl font-semibold text-red-600 mb-4 text-center">
          Team 2
        </h2>

        <ArenaTeam team="team2"/>

      </div>
    </div>
  );
}