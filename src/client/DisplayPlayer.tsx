import { useContext, useState } from "react";
import { PlayerDataContext } from "./App";

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
            <p> Found some info! GL Presenting it!</p>
        );
    }
}

export default DisplayPlayer;