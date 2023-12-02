import {CircDiagram} from "./CircDiagram"
import React, {useState, useEffect} from "react"
import { HEROES_KEYS, PlayerCareer} from "../types"
import {getHeroPlaytime, dummy} from "../helperFunctions"




export const CircDiagramPicker = (props:{data: PlayerCareer, width:number, height: number}) => {
   
    const [valueFunction, setValueFunction] = useState(() => dummy);

     return(
        <div>
        <button onClick={() => setValueFunction(() => ((data:PlayerCareer, hero:HEROES_KEYS) => getHeroPlaytime(data, hero, "pc", "competitive")))}>
            Press me.
        </button>
    
        <CircDiagram width={props.width} height={props.height} data={props.data} valueFunction={valueFunction}></CircDiagram>
        </div>
        
        
     )
}
