import { gamemode, HeroComparison, HEROES_KEYS, HeroStats, PlayerCareerStats} from "./types";
//import myimage from "./public/images/ana.png";
import './App.css';
import { useContext, useState } from "react";
import { getHeroRole } from "./helperFunctions";
import { ModeChosen, SelectedModeContext } from "./DisplayPlayer";

type sortingType = "time_played" | "eliminations_per_life" | "games_won" | "win_percentage";

const colorDict: {[key: string]: string} = {
    "support": "#00FF00",
    "damage": "#f23a22",
    "tank": "#00BFFF",
    "": "#f99e1a",
}


const OneHeroInfoCard = (props: { HeroData: HeroComparison | undefined, HeroName: string, Herostats: HeroStats | undefined, tabIndex: number}) => {
    
    let Data = props.HeroData;
    let heroStats = props.Herostats; //this is all Herostats
    //all categories for a specific hero e.g. best, average, etc.
    let specificHero = (heroStats != undefined) ? heroStats[props.HeroName] : undefined;

    if (Data != undefined){
        const [showDetails, setShowDetails] = useState(false);

        let heroSpecificInfo = undefined;

        if (specificHero != undefined){
            heroSpecificInfo = specificHero.find(function(entry) {
                return entry.category === "hero_specific";
            })?.stats;
        }
        const toggleDetails = () => {
            setShowDetails(!showDetails);
        };
        
        let play_time = Data.time_played?.values.find(find_predicate(props))?.value;
        let kd = Data.eliminations_per_life?.values.find(find_predicate(props))?.value;
        let numWins = Data.games_won?.values.find(find_predicate(props))?.value;
        let winRate = Data.win_percentage?.values.find(find_predicate(props))?.value;
        let role = getHeroRole(props.HeroName as HEROES_KEYS);
        let role_upper = role.charAt(0).toUpperCase() + role.slice(1);
        const expandable = heroSpecificInfo != undefined;
        return (
            <div tabIndex={expandable ? props.tabIndex + 1000 : -1} className={`hero-card ${`card-` + getHeroRole(props.HeroName as HEROES_KEYS)} ${expandable ? 'expandable':''} ${showDetails ? 'expanded' : ''}`} onClick={toggleDetails} onKeyDown={(e) => {if (e.key === 'Enter') toggleDetails()}}>
                <div className="hero-name gridEntry">
                    {props.HeroName.toLocaleUpperCase()}
                </div>
                <div className="role gridEntry">
                    {role_upper}
                </div>
                <div className="hero-image">
                    <img src={"/Images/heroes/" + props.HeroName.toLowerCase() + ".png"} width={200} height={200}/>
                </div>
                <div className="data gridEntry">
                    <strong>Play Time </strong><br />
                    {calculate_time(play_time!)}
                </div>
                <div className="data gridEntry">
                    <strong>Average Eliminations Per Life</strong> <br />
                    {kd}
                </div>
                <div className="data gridEntry">
                    <strong> Total Number of Wins</strong > <br />
                    {numWins}
                </div>
                <div className="data gridEntry">
                    <strong> Winrate </strong> <br />
                    {winRate ?winRate+"%" : "-"}
                </div>
                {(heroSpecificInfo != undefined) && (
                    <>
                        {heroSpecificInfo.map((element, index) => {
                            return (
                                <div className={`additional-rows gridEntry ${showDetails ? 'visible' : ''}`} style={{ gridArea: `Add${index}`, paddingBottom: 10 }}>
                                    <strong>{element.label}</strong> <br /> {element.value}{element.label.includes("Accuracy") ? "%" : ""}
                                </div>
                            )
                        })}
                    </>
                    )
                }

                <div className="moreDetails">
                    {(!showDetails && heroSpecificInfo != undefined) ? <i className="fa fa-angle-down" /> : <i className="fa fa-angle-up" />}
                </div>
            </div>
        );
    }else{
        return <></>;
    }
    
};

function calculate_time(seconds: number) {
    var hours = Math.floor(seconds/3600);
    var mins = Math.ceil((seconds % 3600) / 60);
    if (mins == 60) {
        mins = 0;
        hours += 1;
    }
    return (
        <>
            {hours > 0 ? (hours > 1 ? hours + " hours" : "1 hour") : ""} {mins != 1 ? mins + " minutes": "1 minute"}
        </>
    );
}

function find_predicate(props: { HeroData: HeroComparison | undefined; HeroName: string; }): (value: { hero: HEROES_KEYS; value: number; }, index: number, obj: { hero: HEROES_KEYS; value: number; }[]) => unknown {
    return function (entry) {
        return entry.hero == props.HeroName;
    };
}

function compare(a: {hero: HEROES_KEYS, value: number},b: {hero: HEROES_KEYS, value: number}){
    return b.value - a.value;
}


const SortSelector = (props: {setSortBy: React.Dispatch<React.SetStateAction<sortingType>>}) => {

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setSortBy(event.target.value as sortingType);    
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <label htmlFor="heroCardSort"></label>
            <select id="heroCardSortPicker" onChange={handleSelectChange}>
                <option value="time_played">Playtime</option>
                <option value="games_won">Games Won</option>
                <option value="eliminations_per_life">Eliminations per Life</option>
            </select>
        </div>
    );
}

const HeroInfoCard = (props: { HeroData: PlayerCareerStats | undefined, Herostats: HeroStats | undefined }) => {
    let [sortBy, setSortBy] = useState<sortingType>("time_played");
    const selectedMode = useContext(SelectedModeContext);
    if(selectedMode.mode != "both" && selectedMode.platform != "both"){ //always true
        let data = props.HeroData?.[selectedMode.platform]?.[selectedMode.mode]?.heroes_comparisons;
        let array = data?.[sortBy]?.values.sort(compare);
        return (
            <>
                <SortSelector setSortBy={setSortBy}/>
                {array?.map((element, index) => {
                    return (
                        <OneHeroInfoCard tabIndex={index} key={element.hero + selectedMode.mode + selectedMode.platform} HeroData={data} HeroName={element.hero} Herostats={props.Herostats}/>
                    )
                })}
            </>
        )
        }
    return;
}

export default HeroInfoCard;