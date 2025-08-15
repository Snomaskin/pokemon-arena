import StagingTeam from "./StagingTeam";
import Link from "next/link";
import VS from "@/components/OrangeOvalTextContainer";
import PokeBallTextContainer from "@/components/PokeBallTextContainer";


export default function PokemonStagingArea() {

  return (
    <>
      <div className="max-h-fit bg-gradient-to-r from-blue-50 via-purple-50 to-red-50 p-6 mr-3 ml-3 mt-2 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between sm:items-center mb-3 lg:mb-4 lg:mx-4">
          <h2 className="self-start mt-4 lg:mt-7 text-xl lg:text-2xl font-bold text-purple-900">Staging Area</h2>
          <Link href={"/Arena"} className="lg:mr-6 lg:mb-2"> 
            <PokeBallTextContainer text="Go!" />
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-3">
          <StagingTeam team={"team1"} />
          <VS text="VS"/>
          <StagingTeam team={"team2"} />
        </div>
        
      </div>
    </>
  )
}
