import { useContext, useState } from "react";
import { PlayerDataContext } from "./App";
import HeroInfoCard from "./HeroInfoCard";
import SankeyDiagram from "./SankeyDiagram";
import { CircDiagramPicker } from "./CircularPacking/CircDiagramPicker";
import PlayerInfoBanner from "./PlayerInfoBanner";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { createContext } from "react";
import { gamemode, platform } from "./types";
import { getModefromTab, getPlatformFromTab } from "./helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faLock } from "@fortawesome/free-solid-svg-icons";

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
    else if (playerData === false || playerData.summary! === null || playerData.summary! === undefined){
        return (
            <>
                <FontAwesomeIcon icon={faCircleExclamation} size="2xl"/>
                <p> Player not found</p>
            </>
        )
    } else{
        const return_if_no_stats = (
            <>
                <PlayerInfoBanner summary={playerData.summary} tabIndex={-1} setTabIndex={setTabIndex} username={props.username} />
                <FontAwesomeIcon icon={faLock} size="2xl"/> Account is private
            </>);
        const stats = playerData!.stats!;
        if (stats == null || stats == undefined) {
            return return_if_no_stats;
        }
        const consoleStats = playerData.stats!.console!;
        const consolePossible = consoleStats != null && consoleStats != undefined;
        const pcStats = playerData.stats!.pc!;
        const pcPossible = pcStats != null && pcStats != undefined;
        if (!pcPossible) {
            setplatformTab(1);
        }
        if (!pcPossible && !consolePossible) {
            return return_if_no_stats;
        }
        const platformStats = platformTab == 0 ? pcStats : consoleStats;
        const qpStats = platformStats?.quickplay!;
        const quickplayPossible = qpStats != null && qpStats != undefined;
        const compStats = platformStats?.competitive!;
        const compPossible = compStats != null && compStats != undefined;
        return (
            <SelectedModeContext.Provider value={{platform: getPlatformFromTab(platformTab), mode: getModefromTab(modeTab)}}>            
                <PlayerInfoBanner summary={playerData.summary} tabIndex={tabIndex} setTabIndex={setTabIndex} username={props.username}/>
                <div style={{ display: "flex", flexDirection: "row", gap: 100 }}> {/* Styling to be changed */}
                    <Tabs selectedIndex={modeTab} onSelect={(index) => setModeTab(index)}>
                        <TabList>
                            <Tab className="react-tabs__tab tab darkTab" disabled={!quickplayPossible}>QuickPlay</Tab>
                            <Tab className="react-tabs__tab tab darkTab" disabled={!compPossible}>Competitive</Tab> 
                        </TabList>
                        <TabPanel />
                        <TabPanel />
                    </Tabs>
                    <Tabs selectedIndex={platformTab} onSelect={(index) => setplatformTab(index)}>
                        <TabList>
                            <Tab className="react-tabs__tab tab darkTab" disabled={!pcPossible}>PC</Tab>
                           <Tab className="react-tabs__tab tab darkTab" disabled={!consolePossible}>Console</Tab>
                        </TabList>
                        <TabPanel />
                        <TabPanel />
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
