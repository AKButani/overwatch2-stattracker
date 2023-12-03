import { HEROES_KEYS, PlayerCareer, PlayerInfo, mode, platform, comparisonCategory, PlayerCareerStatsGamemode} from "./types";

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


//gets the value for a certain hero on a certain platform in a certain gamemode for a certain category
export function getHeroComparison(playerData: PlayerCareer, heroName: HEROES_KEYS, platform: platform, mode: mode, category: comparisonCategory):number{
    if(platform != "both" && mode != "both"){
        const arr = playerData?.stats?.[platform]?.[mode]?.heroes_comparisons?.[category]?.values;
        if (!arr) {return 0;}
        const heroInfo = arr.find(item => item.hero === heroName);
        if (!heroInfo) {return 0;}
        return heroInfo.value;
    }else if(platform == "both" && mode != "both"){
        return getHeroComparison(playerData, heroName, "pc", mode, category) + getHeroComparison(playerData, heroName, "console", mode, category);
    }else if(platform != "both" && mode == "both"){
        return getHeroComparison(playerData, heroName, platform, "quickplay", category) + getHeroComparison(playerData, heroName, platform, "competitive", category);
    }else if(platform == "both" && mode == "both"){
        return getHeroComparison(playerData, heroName, "pc", "both", category) + getHeroComparison(playerData, heroName, "console", "both", category);
    }
    return 0;
}