export type Role = "tank" | "damage" | "support";
export type HEROES_KEYS =
  | "ana"
  | "ashe"
  | "baptiste"
  | "bastion"
  | "brigitte"
  | "cassidy"
  | "dva"
  | "doomfist"
  | "echo"
  | "genji"
  | "hanzo"
  | "illari"
  | "junker-queen"
  | "junkrat"
  | "kiriko"
  | "lucio"
  | "mei"
  | "mercy"
  | "moira"
  | "orisa"
  | "pharah"
  | "ramattra"
  | "reaper"
  | "reinhardt"
  | "roadhog"
  | "sigma"
  | "sojourn"
  | "soldier-76"
  | "sombra"
  | "symmetra"
  | "torbjorn"
  | "tracer"
  | "widowmaker"
  | "winston"
  | "wrecking-ball"
  | "zarya"
  | "zenyatta";

export type locales =
  | "de-de"
  | "en-gb"
  | "en-us"
  | "es-es"
  | "es-mx"
  | "fr-fr"
  | "it-it"
  | "ja-jp"
  | "ko-kr"
  | "pl-pl"
  | "pt-br"
  | "ru-ru"
  | "zh-tw";
export type Ability = {
  name: string;
  description: string;
  icon: string;
};

export type MapGamemode =
  | "assault"
  | "capture-the-flag"
  | "control"
  | "deathmatch"
  | "elimination"
  | "escort"
  | "hybrid"
  | "push"
  | "team-deathmatch";

type CompetitiveDivision =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "master"
  | "grandmaster";
export type Privacy = "public" | "private";
type RoleIconUri = string;
type RankIconUri = string;

type PlayerEndorsement = {
  level: number; //Player Endorsement level. 0 if no information found. 1 to 5 otherwise.
  frame: string; //URL of the endorsement frame corresponding to the level
};

export type PlatformCompetitiveRank = {
  pc?: CompetitiveRank; //Competitive rank on PC
  console?: CompetitiveRank; //Competitive rank on console
};

export type RoleDetails = {
  division: CompetitiveDivision; //Division of the rank (bronze, silver, gold, platinum, diamond, master, grandmaster)
  tier: number; //Tier inside the division, lower is better (1 to 5)
  role_icon: RoleIconUri; //URL the role icon
  rank_icon: RankIconUri; //URL of the rank icon associated with the player rank (division + tier)
};

type CompetitiveRank = {
  tank: RoleDetails; //Details about the tank rank
  damage: RoleDetails; //Details about the damage rank
  support: RoleDetails; //Details about the support rank
};

type PlayerCareerStats = {
  pc?: PlayerCareerStatsPlatform; //Stats on PC
  console?: PlayerCareerStatsPlatform; //Stats on console
};

type PlayerCareerStatsPlatform = {
  quickplay?: PlayerCareerStatsGamemode; //Stats in quickplay
  competitive?: PlayerCareerStatsGamemode; //Stats in competitive
};

export type PlayerCareerStatsGamemode = {
  heroes_comparisons: HeroComparison;
  career_stats?: HeroStats;
};

export type HeroComparison = {
    time_played: PlayerCareerValueStat; //Time played on each hero
    games_won: PlayerCareerValueStat; //Games won on each hero
    weapon_accuracy: PlayerCareerValueStat; //Weapon accuracy on each hero
    win_percentage: PlayerCareerValueStat; //Win percentage on each hero
    eliminations_per_life: PlayerCareerValueStat; //Eliminations per life on each hero
    critical_hit_accuracy: PlayerCareerValueStat; //Critical hit accuracy on each hero
    multikill_best: PlayerCareerValueStat; //Best multikill on each hero
    objective_kills: PlayerCareerValueStat; //Objective kills on each hero
};



export type PlayerCareerValueStat = {
  label: string;
  values: {
    hero: HEROES_KEYS;
    value: number;
  }[];
} | null;

export type PlayerSummary = {
  username: string; //Username of the player
  avatar?: string; //URL of the avatar of the player
  title?: string; //Title of the player
  endorsement: PlayerEndorsement; //Endorsement of the player
  competitive?: PlatformCompetitiveRank; //Competitive rank of the player
  privacy: Privacy; //Privacy of the player
  namecard?: string; //Namecard of the player
};

export type PlayerCareer = {
  summary: PlayerSummary; //Summary of the player
  stats?: PlayerCareerStats; //Stats of the player
};

export type PlayerInfo = {
  summary: PlayerSummary;
  career: PlayerCareer;
}

export type SearchResponse = {
  total: number; // Total number of results >= 0
  results: Player[]; // List of players found
}

export type Player = {
  player_id: string; // Player unique name. Identifier of the player : BattleTag (with "#" replaced by "-")
  name: string; // Player nickname displayed in the game
  privacy: Privacy; // Privacy of the player career. If private, only some basic informations are available on player details endpoint (avatar, endorsement)
  career_url: string; // Player's career OverFast API URL (Get player career data) [ 1 .. 65536 ] characters
};

export type PlayerInfoContext = {
  playerData: PlayerCareer | undefined | false;
  setPlayerData: React.Dispatch<React.SetStateAction<false | PlayerCareer | undefined>>;
}

export type HeroStats = Record<string, HeroStatCat[]>;


// e.g category: "hero-specific" label: "Hero Specific", stats: etc.
export type HeroStatCat = {
  category: string,
  label: string,
  stats: {
    key: string,
    label: string,
    value: number
  }[]
}

export type careerStatCategory = "assists" |"average" | "best" | "combat" | "game" | "hero_specific" | "match_awards"|  "miscellaneous";
export type comparisonCategory = "time_played" | "games_won" | "weapon_accuracy" | "win_percentage" | "eliminations_per_life" | "critical_hit_accuracy" | "multikill_best" | "objective_kills"
export type platform = "pc" | "console" | "both";
export type mode = "quickplay" | "competitive" | "both";
