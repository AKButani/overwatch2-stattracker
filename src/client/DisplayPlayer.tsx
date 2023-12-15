import { useContext, useState } from "react";
import { PlayerDataContext } from "./App";
import HeroInfoCard from "./HeroInfoCard";
import SankeyDiagram from "./SankeyDiagram";
import { CircDiagramPicker } from "./CircularPacking/CircDiagramPicker";
import PlayerInfoBanner from "./PlayerInfoBanner";
import { Tabs, TabList, Tab } from "react-tabs";
import { createContext } from "react";
import { mode } from "./types";
import { getModefromTab } from "./helperFunctions";

export const SelectedModeContext = createContext<"quickplay" |"competitive">("competitive");

const DisplayPlayer = (props:{username:string}) => {
    const playerData = useContext(PlayerDataContext)?.playerData;
    const [tabIndex, setTabIndex] = useState<number>(0); //0: visualisations, 1: heroes, ...
    const [modeTab, setModeTab] = useState<number>(0); //0: QP, 1: Comp
    if (playerData === undefined){
        return;
    }
    else if (playerData === false){
        return (
            <p> Player not Found or some other error</p>
        )
    } else{ 
        return (
            <SelectedModeContext.Provider value={getModefromTab(modeTab)}>            
                <PlayerInfoBanner summary={playerData.summary} tabIndex={tabIndex} setTabIndex={setTabIndex} username={props.username}/>
                <Tabs selectedIndex={modeTab} onSelect={(index) => setModeTab(index)}>
                    <TabList>
                        <Tab className="react-tabs__tab tab lightGrey">QuickPlay</Tab>
                        <Tab className="react-tabs__tab tab lightGrey">Competitive</Tab>
                    </TabList>
                </Tabs>

                {tabIndex == 0 && (
                    <>
                     <SankeyDiagram playerData={playerData}/>
                     <CircDiagramPicker key={modeTab} width={500} height={500} data={playerData}/>
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
