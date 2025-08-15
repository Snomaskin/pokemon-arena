"use client"
import PokemonStagingArea from "./PokemonStagingArea";
import PokemonGrid from "./PokemonGrid";
import { usePokemonSelection, type GameMode } from "@/contexts/pokemonSelectionContext";
import Loader from "@/components/Loader";
import VS from "@/components/OrangeOvalTextContainer";
import PokemonArenaHeader from "@/components/PokemonArenaHeader";
import Image from "next/image";
import { misty, ashPikachuSitting, ashPikachuStanding, pokeComputer } from "@/assets/index";
import { AnimatePresence, motion } from "framer-motion";


export default function GameSetupStart() {
  const { gameMode } = usePokemonSelection();

  return (
    <div className="flex flex-col w-full flex-grow">
    <AnimatePresence mode="popLayout">
      {gameMode ? (
        <motion.div
          key="gameModes"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex flex-grow w-full justify-center"
        >
          <GameModes gameMode={gameMode} />
        </motion.div>
      ) : (
          <motion.div
            key="gameModeSelect"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full flex-grow"
          >
            <GameModeSelect />
          </motion.div>
      )}
    </AnimatePresence>
    </div>
  )
}

function GameModeSelect() {
  const { setGameMode } = usePokemonSelection();

  return (
    <div className="flex flex-col w-full h-full">

      <PokemonArenaHeader />

      <div className="flex w-full h-full">
        
        <button
          className="flex flex-col flex-1 group items-center justify-center text-2xl gap-10 font-bold text-green-900 bg-gradient-to-br from-red-50 to-red-500
                    shadow-inner hover:from-green-200 hover:to-green-300 hover:shadow-lg transition-colors duration-300 cursor-pointer"
          onClick={() => setGameMode("playerVsPlayer")}
        >
          <div className="flex bg-white w-40 h-40 rounded-full items-center justify-center p-4 border shadow-2xl">
            <Image
              src={ashPikachuSitting}
              alt="Human"
              width={110}
            />
            
          </div>
          <h2>Human</h2>
           <VS text="VS"/> 
          <div className="flex bg-white w-40 h-40 rounded-full items-center justify-center p-4 border shadow-2xl">
            <Image
              src={misty}
              alt="Human"
              width={100}
            />   
          </div>     
          <h2>Human</h2>
        </button>

        {/* Divider line and circle */}
        <div className="absolute top-13/24 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-4 border-black z-10" />
        <div className="w-1 bg-black h-full" />

        <button
          className="group relative flex flex-1 flex-col items-center justify-center gap-10 text-2xl font-bold text-indigo-900 bg-gradient-to-br
                   from-gray-100 to-white shadow-inner hover:from-indigo-200 hover:to-indigo-300 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex flex-col items-center gap-10 group-hover:opacity-0 transition-opacity duration-500">
            <Image
              src={ashPikachuStanding}
              alt="Human"
              width={120}
            />   
            <h2>Human</h2>
            <VS text="VS" />
            <Image
              src={pokeComputer}
              alt="Computer"
              width={110}
            />   
            <h2>Computer</h2>
          </div>
          <div className="absolute  items-center justify-center text-4xl font-black text-indigo-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-shadow-2xl">
            Coming Soon
          </div>
        </button>

      </div>
    </div>
  );
}

function GameModes({ gameMode }: {gameMode: GameMode}) {
  const { selection, cachedPokemons } = usePokemonSelection();

  const hasPokemons = (selection.team1?.length ?? 0) > 0 || (selection.team2?.length ?? 0) > 0;

  return (
    <>
      {gameMode === "playerVsPlayer" 
        ? <div className='flex pt-2'>
            {cachedPokemons?.length 
              ? <>
                  <PokemonGrid pokemons={cachedPokemons} team='team1' />
                  <PokemonGrid pokemons={cachedPokemons} team='team2' />
                </>
              : <Loader />
            }
            </div>
        : <div className='flex pt-2'>
            {cachedPokemons?.length 
              ? <PokemonGrid pokemons={cachedPokemons} team='team1' />
              : <Loader />
            }
          </div>
          
      }
      <AnimatePresence mode="popLayout">
        {hasPokemons && 
          <motion.div
            key="gameModes"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}

          >
            <PokemonStagingArea />
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}