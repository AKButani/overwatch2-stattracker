import { HeroComparison, HEROES_KEYS, HeroStats } from "./types";
import myimage from "./public/images/ana.png";
import './App.css';
import { useState } from "react";


const HeroInfoCard = (props: { HeroData: HeroComparison | undefined, HeroName: string, Herostats: HeroStats | undefined }) => {
    let Data = props.HeroData;
    let heroStats = props.Herostats; //this is all Herostats
    //all categories for a specific hero e.g. best, average, etc.
    let specificHero = (heroStats != undefined) ? heroStats[props.HeroName] : undefined;

    console.log("Data: ", Data);
    if (Data != undefined && specificHero != undefined){
        const [showDetails, setShowDetails] = useState(false);
        console.log(heroStats);

        let heroSpecificInfo = specificHero.find(function(entry) {
            return entry.category === "hero_specific";
        })?.stats;
        const toggleDetails = () => {
            setShowDetails(!showDetails);
        };
        let play_time = Data.time_played.values.find(find_predicate(props))?.value;
        let kd = Data.eliminations_per_life.values.find(find_predicate(props))?.value;
        let numWins = Data.games_won.values.find(find_predicate(props))?.value;
        let winRate = Data.win_percentage.values.find(find_predicate(props))?.value;
        return (
            <div className={`hero-card ${showDetails ? 'expanded' : ''}`} onClick={toggleDetails}>
                <div className="name">
                    {props.HeroName.toLocaleUpperCase()}
                </div>
                <div className="role">
                    Support
                </div>
                <div className="hero-image">
                    <img src={myimage} width={200} height={200}/>
                </div>
                <div className="data">
                    Play Time <br />
                    {play_time} seconds
                </div>
                <div className="data">
                    Average Elimination Per Life <br />
                    {kd}
                </div>
                <div className="data">
                    Total Number of Wins <br />
                    {numWins}
                </div>
                <div className="data">
                    Winrate <br />
                    {winRate}%
                </div>
                {(heroSpecificInfo != undefined) && (
                    <>
                        <div className={`additional-rows ${showDetails ? 'visible' : ''}`} style={{ gridArea: 'Add' }}>
                            {heroSpecificInfo[0]?.label} <br /> {heroSpecificInfo[0]?.value}
                        </div>
                        <div className={`additional-rows ${showDetails ? 'visible' : ''}`} style={{ gridArea: 'Add2' }}>
                            Additional Row 2
                        </div>
                        {/* Add more rows as needed */}
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

export default HeroInfoCard;

function find_predicate(props: { HeroData: HeroComparison | undefined; HeroName: string; }): (value: { hero: HEROES_KEYS; value: number; }, index: number, obj: { hero: HEROES_KEYS; value: number; }[]) => unknown {
    return function (entry) {
        return entry.hero == props.HeroName;
    };
}
