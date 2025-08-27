"use client"
import ArenaTeam from "./ArenaTeam";
import AttackAnimationHandler from "./AttackAnimationHandler";
import { useBattle } from "@/contexts/battleContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PokemonArenaHeader from "@/components/PokemonArenaHeader";


export default function Arena() {
  const { winner } = useBattle();
  const router = useRouter();

  useEffect(() => {
    if (winner) {
      console.log(winner)
     router.push("/Arena/BattleConclusion")
    }
  }, [winner, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200">
      
      <PokemonArenaHeader />

      <div className="flex flex-col items-center min-h-screen pt-18 justify-center">

        <ArenaTeam team="team1" />

        <div className="flex items-center justify-center m-8 w-full">
          <div className="h-px bg-blue-300 flex-1" />
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg lg:text-xl px-4  py-2 rounded-full shadow-lg border-2 border-yellow-300">
            VS
          </div>
          <div className="h-px bg-red-300 flex-1" />
        </div>

        <ArenaTeam team="team2"/>

      </div>
      <AttackAnimationHandler />
    </div>
  );
}

