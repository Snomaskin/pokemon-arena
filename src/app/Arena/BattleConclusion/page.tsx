"use client"
import WinnerPokemons from "./WinnerPokemons"
import Link from "next/link"
import { useBattle } from "@/contexts/battleContext"


export default function BattleConculsion() {
  const { resetBattle } = useBattle();
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">

        <div className="mb-8 mt-2 animate-bounce">
          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-2xl border-4 border-yellow-300">
            <h1 className="text-4xl lg:text-6xl font-black text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text mb-2">
              🎉 VICTORY! 🎉
            </h1>

          </div>
        </div>


        <div className="mb-6 lg:mb-12">
          <WinnerPokemons />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            className="group relative py-4 px-8 lg:py-5 lg:px-10 text-lg lg:text-xl font-bold text-white rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 active:scale-95" 
            href={"/"}
            onClick={() => resetBattle()}
          >
            <span className="relative z-10">
              ⚔️ Battle Again!
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </Link>
          
        </div>


        <div className="absolute top-10 left-10 text-6xl animate-pulse opacity-30">⭐</div>
        <div className="absolute top-20 right-16 text-4xl animate-pulse opacity-20 animation-delay-1000">✨</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-pulse opacity-25 animation-delay-2000">🎊</div>
        <div className="absolute bottom-32 right-12 text-3xl animate-pulse opacity-30 animation-delay-3000">🏆</div>
      </div>
    </div>
  )
}