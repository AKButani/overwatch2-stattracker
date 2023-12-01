import { HEROES_KEYS, PlayerCareer } from "./types";

export function getPlayTime(playerData: PlayerCareer, isComp: boolean | "both"){ //true for competitive , false for QuickPlay, both for both 
    //let t = playerData.stats?.pc?.competitive?.heroes_comparisons
    
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

export function getHeroRole(hero: HEROES_KEYS) {
    switch (hero) {
        case "dva":
        case "orisa":
        case "reinhardt":
        case "roadhog":
        case "sigma":
        case "winston":
        case "wrecking-ball":
        case "zarya":
        case "junker-queen":
        case "ramattra":
        case "doomfist":
            return "tank";
        case "ashe":
        case "bastion":
        
        case "echo":
        case "genji":
        case "hanzo":
        case "junkrat":
        case "cassidy":
        case "mei":
        case "pharah":
        case "reaper":
        case "soldier-76":
        case "sombra":
        case "symmetra":
        case "torbjorn":
        case "tracer":
        case "widowmaker":
        case "sojourn":
            return "damage";
        case "kiriko":
        case "ana":
        case "baptiste":
        case "brigitte":
        case "lucio":
        case "mercy":
        case "moira":
        case "zenyatta":
        case "illari":
            return "support";
        default:
            // Handle unknown heroes
            return "";
    }
}