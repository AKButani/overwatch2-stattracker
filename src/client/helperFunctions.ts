import { PlayerCareer, PlayerInfo } from "./types";

export function getPlayTime(playerData: PlayerCareer, isComp: boolean | "both"){ //true for competitive , false for QuickPlay, both for both 
    console.log(playerData.stats?.pc?.competitive?.heroes_comparisons.time_played.values);
    if (isComp == "both"){

    }else if(isComp){
        let pcStats = playerData.stats?.pc?.competitive?.heroes_comparisons.time_played.values;
        let consoleStats = playerData.stats?.pc?.competitive?.heroes_comparisons.time_played.values;
        let res = pcStats;
        //need to create a function
    }
}