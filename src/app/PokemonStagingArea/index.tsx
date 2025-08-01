"use client"
import { usePokemonSelection } from "@/contexts/pokemonSelectionContext";
import StagingTeam from "./StagingTeam";
import Link from "next/link";


export default function PokemonStagingArea() {
  const { resetSelection } = usePokemonSelection();

  return (
    <>
    <div className="max-h-fit bg-gradient-to-r from-blue-50 via-purple-50 to-red-50 p-6 mr-3 ml-3 rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between sm:items-center mb-3 lg:mb-4 gap-2">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Staging Area</h2>
        <div className="flex justify-end items-center sm:gap-1 lg:gap-3">
          <button 
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
            onClick={resetSelection}
          >
            Reset
          </button>
          <Link className="py-2 px-3 lg:py-3 lg:px-4 lg:text-lg text-white rounded-xl bg-green-500 hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg" href={"/Arena"}>Battle!</Link>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-3">
        <StagingTeam team={"team1"} />

        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg lg:text-xl px-4  py-2 lg:py-3 rounded-full shadow-lg transform lg:rotate-12 border-2 border-yellow-300">
            VS
          </div>
        </div>

        <StagingTeam team={"team2"} />
      </div>
    </div>
    </>
  )
}
