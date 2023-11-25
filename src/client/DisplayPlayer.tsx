import { useContext, useState } from "react";
import { PlayerDataContext } from "./App";
import PlayerAvatar from "./PlayerAvatar";

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
        const avatarUrl = playerData.summary.avatar;
        return (
            <>
                <p> Found some info! GL Presenting it!</p>
                <PlayerAvatar imageUrl={avatarUrl}/>
            </>
        );
    }
}

export default DisplayPlayer;