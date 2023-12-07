import { HeroComparison, HEROES_KEYS, HeroStats } from "./types";
//import myimage from "./public/images/ana.png";
import './App.css';
import { useState } from "react";
import { getHeroRole } from "./helperFunctions";

type sortingType = "time_played" | "eliminations_per_life" | "games_won" | "win_percentage";

const OneHeroInfoCard = (props: { HeroData: HeroComparison | undefined, HeroName: string, Herostats: HeroStats | undefined }) => {
    
    let Data = props.HeroData;
    let heroStats = props.Herostats; //this is all Herostats
    //all categories for a specific hero e.g. best, average, etc.
    let specificHero = (heroStats != undefined) ? heroStats[props.HeroName] : undefined;

    console.log("Hero : ", Data);
    if (Data != undefined && specificHero != undefined){
        const [showDetails, setShowDetails] = useState(false);
        console.log(heroStats);

        let heroSpecificInfo = specificHero.find(function(entry) {
            return entry.category === "hero_specific";
        })?.stats;
        const toggleDetails = () => {
            setShowDetails(!showDetails);
        };
        let play_time = Data.time_played?.values.find(find_predicate(props))?.value;
        let kd = Data.eliminations_per_life?.values.find(find_predicate(props))?.value;
        let numWins = Data.games_won?.values.find(find_predicate(props))?.value;
        let winRate = Data.win_percentage?.values.find(find_predicate(props))?.value;
        return (
            <div className={`hero-card ${showDetails ? 'expanded' : ''}`} onClick={toggleDetails}>
                <div className="name gridEntry">
                    {props.HeroName.toLocaleUpperCase()}
                </div>
                <div className="role gridEntry">
                    {getHeroRole(props.HeroName as HEROES_KEYS)}
                </div>
                <div className="hero-image">
                    <img src={"/Images/heroes/" + props.HeroName.toLowerCase() + ".png"} width={200} height={200}/>
                </div>
                <div className="data gridEntry">
                    <strong>Play Time </strong><br />
                    {Math.round(play_time! / 60)} minutes
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
                    {winRate}%
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
                    <i className="fa fa-angle-down" />
                </div>
            </div>
        );
    }else{
        return <></>;
    }
    
};



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
                <option value="win_percentage">Win Percentage</option>
                <option value="eliminations_per_life">Eliminations per Life</option>
            </select>
        </div>
    );
}

const HeroInfoCard = (props: { HeroData: HeroComparison | undefined, Herostats: HeroStats | undefined }) => {
    let [sortBy, setSortBy] = useState<sortingType>("time_played");
    
    let array = props.HeroData?.[sortBy]?.values.sort(compare);
    return (
        <>
            <SortSelector setSortBy={setSortBy}/>
            {array?.map((element) => {
                return (
                    <OneHeroInfoCard HeroData={props.HeroData} HeroName={element.hero} Herostats={props.Herostats}/>
                )
            })}
        </>
    )
}

export default HeroInfoCard;