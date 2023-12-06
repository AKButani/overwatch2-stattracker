import { useContext } from "react";
import { PlayerDataContext } from "./App";
import PlayerAvatar from "./PlayerAvatar";
import PlayerNameWithBackground from "./PlayerNameWithBackground";
import {getPlayTime} from "./helperFunctions"
import HeroInfoCard from "./HeroInfoCard";
import SankeyDiagram from "./SankeyDiagram";
import { CircDiagramPicker } from "./CircularPacking/CircDiagramPicker";
import PlayerInfoBanner from "./PlayerInfoBanner";


const DisplayPlayer = () => {
    const playerData = useContext(PlayerDataContext)?.playerData;
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
                <PlayerInfoBanner summary={playerData.summary}/>
                <SankeyDiagram playerData={playerData}/>
                <CircDiagramPicker width={500} height={500} data={playerData}/>
                {console.log(getPlayTime(playerData, true))}
                <HeroInfoCard HeroData={playerData.stats?.pc?.competitive?.heroes_comparisons} Herostats={playerData.stats?.pc?.competitive?.career_stats}/>
            </>
        );
    }
}

export default DisplayPlayer;
