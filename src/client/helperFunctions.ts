import { HEROES_KEYS, PlayerCareer, PlayerInfo } from "./types";

export function getPlayTime(playerData: PlayerCareer, isComp: boolean | "both"){ //true for competitive , false for QuickPlay, both for both 
    if (isComp == "both"){
        return undefined;
    }else if(isComp){
        let pcStats = playerData.stats?.pc?.competitive?.heroes_comparisons.time_played.values;
        console.log("PC: ", pcStats);
        let consoleStats = playerData.stats?.console?.competitive?.heroes_comparisons.time_played.values;
        console.log("Console", consoleStats);
        if (pcStats == undefined){
            return consoleStats?.map(function (consEntry){
                return {
                    hero: consEntry.hero,
                    console: consEntry.value,
                    pc: 0
                }
            });
        }else if( consoleStats == undefined){
            return pcStats.map(function (pcEntry){
                return {
                    hero: pcEntry.hero,
                    console: 0,
                    pc: pcEntry.value
                }
            });
        }else{
            return combinePCandConsole(pcStats, consoleStats);
        }
    }else{
        return undefined;
    }
}

function combinePCandConsole(pcStats: {hero: HEROES_KEYS; value: number;}[], consoleStats: { hero: HEROES_KEYS; value: number; }[]) {
    var combinedData = pcStats.map(function (pcEntry) {
        var consoleEntry = consoleStats!.find(function (compEntry) {
            return compEntry.hero === pcEntry.hero;
        });

        // If there is a corresponding entry in console Data, combine them; otherwise, use 0 for console value
        var consoleValue = consoleEntry ? consoleEntry.value : 0;

        return {
            hero: pcEntry.hero,
            pc: pcEntry.value,
            console: consoleValue
        };
    });
    return combinedData;
}


//not correct, only gives time of pc quickplay
export function getOverallHeroPlaytime(playerData: PlayerCareer, heroName : HEROES_KEYS){
    const arr = playerData.stats?.pc?.quickplay?.heroes_comparisons.time_played.values;
    console.log("arr", arr);
    if(arr == undefined){
        return 0;
    }
    const l = arr.length;
    console.log("length", l);
    var i = 0;
    
    while (i < l && arr[i]!.hero != heroName) {
        
        i = i + 1;
    }
    if(i >= l){
        return 0
    } else {
        console.log(arr[i]!.hero, arr[i]!.value)
        return arr[i]!.value;
    }
}