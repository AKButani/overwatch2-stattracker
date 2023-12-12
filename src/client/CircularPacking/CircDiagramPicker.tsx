import React, { useContext, useState } from "react";
import { CircDiagram } from "./CircDiagram";
import { HEROES_KEYS, PlayerCareer, comparisonCategory, mode, platform} from "../types";
import { getHeroComparison} from "../helperFunctions";
import { SelectedModeContext } from "../DisplayPlayer";

export const CircDiagramPicker = (props: { key: number; data: PlayerCareer; width: number; height: number }) => {
  type vF = ((data:PlayerCareer, hero:HEROES_KEYS) => number);
  const [valueFunction, setValueFunction] = useState<vF>(() => ((data:PlayerCareer, hero:HEROES_KEYS) => 5));
  const selectedMode = useContext(SelectedModeContext);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if(event.target.value == "none"){
          setValueFunction (() => ((data:PlayerCareer, hero:HEROES_KEYS) => 5));
      } else {
          setValueFunction(() => ((data:PlayerCareer, hero:HEROES_KEYS):number => getHeroComparison(data, hero, "both", selectedMode , event.target.value as comparisonCategory)));
      }
       
    }
  

  return (
    <div style={{ textAlign: 'center' }}>
      <label htmlFor="valueFunctionPicker"></label>
      <select id="valueFunctionPicker" onChange={handleSelectChange}>
        <option value="none">-</option>
        <option value="time_played">Playtime</option>
        <option value="games_won">Games Won</option>
        <option value="weapon_accuracy">Weapon Accuracy</option>
        <option value="win_percentage">Win Percentage</option>
        <option value="eliminations_per_life">Eliminations per Life</option>
        <option value="critical_hit_accuracy">Critical Hit Accuracy</option>
        <option value="multikill_best">Best Kill Streak</option>
        <option value="objective_kills">Objective Kills</option>
        {/* Add more options as needed */}
      </select>
      <CircDiagram width={props.width} height={props.height} data={props.data} valueFunction={valueFunction} />
    </div>
  );
};

