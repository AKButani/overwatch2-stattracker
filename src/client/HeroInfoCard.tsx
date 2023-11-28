import { HeroComparison } from "./types";
import myimage from "./public/images/ana.png";
import './App.css';


const HeroInfoCard = (props: { HeroData: HeroComparison | undefined, HeroName: string }) => {
    let Data = props.HeroData;
    if (Data != undefined){
        let play_time = Data.time_played.values.find(find_predicate(props))?.value;
        let kd = Data.eliminations_per_life.values.find(find_predicate(props))?.value;
        let numWins = Data.games_won.values.find(find_predicate(props))?.value;
        let winRate = Data.win_percentage.values.find(find_predicate(props))?.value;

        return (
            <div className="hero-card">
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
                <button className="toggle-button"> 
                    <i className="fa fa-expand" />
                </button>
            </div>
        );
    }else{
        return <></>;
    }
    
};

export default HeroInfoCard;

function find_predicate(props: { HeroData: HeroComparison | undefined; HeroName: string; }): (value: { hero: import("d:/AKB/ETH/5th Sem/Web engineering/Final/abutani_project_express/src/client/types").HEROES_KEYS; value: number; }, index: number, obj: { hero: import("d:/AKB/ETH/5th Sem/Web engineering/Final/abutani_project_express/src/client/types").HEROES_KEYS; value: number; }[]) => unknown {
    return function (entry) {
        return entry.hero == props.HeroName;
    };
}
