import { useContext, useState } from "react";
import { PlayerDataContext } from "./App";
import HeroInfoCard from "./HeroInfoCard";
import SankeyDiagram from "./SankeyDiagram";
import { CircDiagramPicker } from "./CircularPacking/CircDiagramPicker";
import PlayerInfoBanner from "./PlayerInfoBanner";
import { Tabs, TabList, Tab } from "react-tabs";
import { createContext } from "react";
import { gamemode, platform } from "./types";
import { getModefromTab, getPlatformFromTab } from "./helperFunctions";

export type ModeChosen = {
    platform: platform;
    mode: gamemode;
}

export const SelectedModeContext = createContext<ModeChosen>({platform: "pc", mode: "competitive"});

const DisplayPlayer = (props : {username:string}) => {
    const playerData = useContext(PlayerDataContext)?.playerData;
    const [tabIndex, setTabIndex] = useState<number>(0); //0: visualisations, 1: heroes, ...
    const [modeTab, setModeTab] = useState<number>(0); //0: QP, 1: Comp

    //This is the platform state, for reference on how to use, you can compare it with modeTab 
    const [platformTab, setplatformTab] = useState<number>(0); //0: pc, 1: Console
    
    if (playerData === undefined){
        return;
    }
    else if (playerData === false){
        return (
            <p> Player not Found or some other error</p>
        )
    } else{
        const stats = playerData!.stats!;
        if (stats == null || stats == undefined) {
            return (<p> Player has no stats </p>)
        }
        const consoleStats = playerData.stats!.console!;
        const consolePossible = consoleStats != null && consoleStats != undefined;
        const pcStats = playerData.stats!.pc!;
        const pcPossible = pcStats != null && pcStats != undefined;
        if (!pcPossible) {
            setplatformTab(1);
        }
        if (!pcPossible && !consolePossible) {
            return (
                <>
                    No stats to display
                </>
            );
        }
        const platformStats = platformTab == 0 ? pcStats : consoleStats;
        const qpStats = platformStats.quickplay!;
        const quickplayPossible = qpStats != null && qpStats != undefined;
        const compStats = platformStats.competitive!;
        const compPossible = compStats != null && compStats != undefined;
        return (
            <SelectedModeContext.Provider value={{platform: getPlatformFromTab(platformTab), mode: getModefromTab(modeTab)}}>            
                <PlayerInfoBanner summary={playerData.summary} tabIndex={tabIndex} setTabIndex={setTabIndex} username={props.username}/>
                <div style={{ display: "flex", flexDirection: "row", gap: 100 }}> {/* Styling to be changed */}
                    <Tabs selectedIndex={modeTab} onSelect={(index) => setModeTab(index)}>
                        <TabList>
                            {quickplayPossible ? <Tab className="react-tabs__tab tab">QuickPlay</Tab> : null}
                            {compPossible ? <Tab className="react-tabs__tab tab">Competitive</Tab> : null}
                        </TabList>
                    </Tabs>
                    <Tabs selectedIndex={platformTab} onSelect={(index) => setplatformTab(index)}>
                        <TabList>
                            {pcPossible ? <Tab className="react-tabs__tab tab">PC</Tab> : null}
                            {consolePossible ? <Tab className="react-tabs__tab tab">Console</Tab> : null}
                        </TabList>
                    </Tabs>
                </div>

                {tabIndex == 0 && (
                    <>
                     <SankeyDiagram playerData={playerData}/>
                     <CircDiagramPicker key={modeTab + platformTab} width={500} height={500} data={playerData}/>
                    </>
                )}
                {tabIndex == 1 && (
                    <HeroInfoCard HeroData={playerData.stats} Herostats={playerData.stats?.pc?.competitive?.career_stats}/>
                )}
                
            </ SelectedModeContext.Provider>
        );
    }
}

export default DisplayPlayer;
