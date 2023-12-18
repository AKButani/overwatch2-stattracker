import React, { useContext, useState, useEffect} from "react";
import { CircDiagram } from "./CircDiagram";
import { HEROES_KEYS, PlayerCareer, comparisonCategory} from "../types";
import { getHeroComparison} from "../helperFunctions";
import { SelectedModeContext } from "../DisplayPlayer";
import { valueFunction, getDisplayValueFunction} from "./circTypes";
import { PlayerDataContext } from "../App";

export const CircDiagramPicker = (props: { key: number; data: PlayerCareer; width: number; height: number }) => {
  const heroes: HEROES_KEYS[] = [
    "ana",
    "ashe",
    "baptiste",
    "bastion",
    "brigitte",
    "cassidy",
    "dva",
    "doomfist",
    "echo",
    "genji",
    "hanzo",
    "junker-queen",
    "junkrat",
    "kiriko",
    "lifeweaver",
    "lucio",
    "mauga",
    "mei",
    "mercy",
    "moira",
    "orisa",
    "pharah",
    "ramattra",
    "reaper",
    "reinhardt",
    "roadhog",
    "sigma",
    "sojourn",
    "soldier-76",
    "sombra",
    "symmetra",
    "torbjorn",
    "tracer",
    "widowmaker",
    "winston",
    "wrecking-ball",
    "zarya",
    "zenyatta",
  ];
  const data : PlayerCareer= useContext(PlayerDataContext)?.playerData as PlayerCareer;
  const [valueFunction, setValueFunction] = useState<valueFunction>(() => ((data:PlayerCareer, hero:HEROES_KEYS) => 5));
  const [displayValueFunction, setDisplayValueFunction] = useState<getDisplayValueFunction>(() => ((value:number) => "-"));
  const selectedMode = useContext(SelectedModeContext);
  const [selectedValue, setSelectedValue] = useState<comparisonCategory | string>("none");
 
  useEffect(() => {
    setDisplayValueFunction(() => ((value:number) => "-"));
    setValueFunction (() => ((data:PlayerCareer, hero:HEROES_KEYS) => 5));
    setSelectedValue("none");
  },[data]);

  const checkAllZeros = (category : comparisonCategory) => {
      return (
        heroes.every((hero) => {
          return (getHeroComparison(props.data, hero, selectedMode.platform , selectedMode.mode , category) == 0)
        })
      )
  }
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value == "none"){
        setValueFunction (() => ((data:PlayerCareer, hero:HEROES_KEYS) => 5));
    } else {
        setValueFunction(() => ((data:PlayerCareer, hero:HEROES_KEYS):number => getHeroComparison(data, hero, selectedMode.platform , selectedMode.mode , event.target.value as comparisonCategory)));
    }
    setSelectedValue(event.target.value);
    switch(event.target.value) {
      case "none":
        setDisplayValueFunction(() => ((value:number) => "-"));
        break;
      case "time_played":
        setDisplayValueFunction(() => ((value:number) => (value/3600).toFixed(1) + " h"));
        break;
      case "games_won":
        setDisplayValueFunction(() => ((value:number) => value + ""));
        break;
      case "weapon_accuracy":
        setDisplayValueFunction(() => ((value:number) => value + "%"));
        break;
      case "win_percentage":
        setDisplayValueFunction(() => ((value:number) => value + "%"));
        break;
      case "eliminations_per_life":
        setDisplayValueFunction(() => ((value:number) => value + ""));
        break;
      case "critical_hit_accuracy":
        setDisplayValueFunction(() => ((value:number) => value + "%"));
        break;
      case "multikill_best":
        setDisplayValueFunction(() => ((value:number) => value + ""));
        break;
      case "objective_kills":
        setDisplayValueFunction(() => ((value:number) => value + ""));
        break;
    }
      
  }
  console.log("all Zeros", checkAllZeros("win_percentage"));
  return (
     
    <div style={{ textAlign: 'center' }}>
      <label htmlFor="valueFunctionPicker"></label>
      <select id="valueFunctionPicker" value={selectedValue} onChange={handleSelectChange}>
        <option value="none">None</option>
        {!checkAllZeros("time_played") && <option value="time_played">Playtime</option>}
        {!checkAllZeros("games_won") && <option value="games_won">Games Won</option>}
        {!checkAllZeros("weapon_accuracy") && <option value="weapon_accuracy">Weapon Accuracy</option>}
        {!checkAllZeros("win_percentage") && <option value="win_percentage">Win Percentage</option>}
        {!checkAllZeros("eliminations_per_life") && <option value="eliminations_per_life">Eliminations per Life</option>}
        {!checkAllZeros("critical_hit_accuracy") && <option value="critical_hit_accuracy">Critical Hit Accuracy</option>}
        {!checkAllZeros("multikill_best") && <option value="multikill_best">Best Kill Streak</option>}
        {!checkAllZeros("objective_kills") && <option value="objective_kills">Objective Kills</option>}
        {/* Add more options as needed */}
      </select>
      <CircDiagram width={props.width} height={props.height} data={props.data} valueFunction={valueFunction} getDisplayValue={displayValueFunction}/>
    </div>
  );
};

