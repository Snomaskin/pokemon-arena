import { Pokemon } from "./pokemon";


type Team = "team1" | "team2";

type PokemonOfTeam = {
  team: Team,
  pokemon: Pokemon,
};

export type { Team, PokemonOfTeam };