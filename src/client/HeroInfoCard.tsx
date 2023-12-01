import { HeroComparison, HEROES_KEYS, HeroStats } from "./types";
//import myimage from "./public/images/ana.png";
import './App.css';
import { useState } from "react";


const OneHeroInfoCard = (props: { HeroData: HeroComparison | undefined, HeroName: string, Herostats: HeroStats | undefined }) => {
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
                <div className="name gridEntry">
                    {props.HeroName.toLocaleUpperCase()}
                </div>
                <div className="role gridEntry">
                    Support
                </div>
                <div className="hero-image">
                    <img src='https://d15f34w2p8l1cc.cloudfront.net/overwatch/3429c394716364bbef802180e9763d04812757c205e1b4568bc321772096ed86.png' width={200} height={200}/>
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
                                    <strong>{element.label}</strong> <br /> {element.value}
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


const HeroInfoCard = (props: { HeroData: HeroComparison | undefined, Herostats: HeroStats | undefined }) => {
    return (
        <>
            {props.HeroData?.games_won.values.map((element, index) => {
                return (
                    <OneHeroInfoCard HeroData={props.HeroData} HeroName={element.hero} Herostats={props.Herostats}/>
                )
            })}
        </>
    )
}

export default HeroInfoCard;