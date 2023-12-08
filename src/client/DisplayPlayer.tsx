import { useContext, useState } from "react";
import { PlayerDataContext } from "./App";
import HeroInfoCard from "./HeroInfoCard";
import SankeyDiagram from "./SankeyDiagram";
import { CircDiagramPicker } from "./CircularPacking/CircDiagramPicker";
import PlayerInfoBanner from "./PlayerInfoBanner";


const DisplayPlayer = () => {
    const playerData = useContext(PlayerDataContext)?.playerData;
    const [tabIndex, setTabIndex] = useState<number>(0); //0: visualisations, 1: heroes, ...
    if (playerData === undefined){
        return;
    }
    else if (playerData === false){
        return (
            <p> Player not Found or some other error</p>
        )
    } else{ 
        return (
            <>            
                <PlayerInfoBanner summary={playerData.summary} tabIndex={tabIndex} setTabIndex={setTabIndex}/>
                {tabIndex == 0 && (
                    <>
                     <SankeyDiagram playerData={playerData}/>
                     <CircDiagramPicker width={500} height={500} data={playerData}/>
                    </>
                )}
                {tabIndex == 1 && (
                    <HeroInfoCard HeroData={playerData.stats?.pc?.competitive?.heroes_comparisons} Herostats={playerData.stats?.pc?.competitive?.career_stats}/>
                )}
                
            </>
        );
    }
}

export default DisplayPlayer;
