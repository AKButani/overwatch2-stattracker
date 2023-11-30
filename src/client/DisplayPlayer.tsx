import { useContext } from "react";
import { PlayerDataContext } from "./App";
import PlayerAvatar from "./PlayerAvatar";
import PlayerNameWithBackground from "./PlayerNameWithBackground";
import {getPlayTime, getOverallHeroPlaytime} from "./helperFunctions"
import {CircDiagram} from "./CircularPacking/CircDiagram"

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
                {/* I honestly don't like the namecard as of now, but maybe we can do something with it */}
                { (!playerData.summary.namecard) ? 
                    <h2> {playerData.summary.username} </h2>:
                    <PlayerNameWithBackground playerName={playerData.summary.username} imageUrl={playerData.summary.namecard!}/>
                } 
                <PlayerAvatar imageUrl={playerData.summary.avatar}/>
                <CircDiagram width={500} height={500} data={playerData} valueFunction={getOverallHeroPlaytime}/>
                {console.log(getPlayTime(playerData, true))}
            </>
        );
    }
}

export default DisplayPlayer;