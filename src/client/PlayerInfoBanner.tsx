import { PlatformCompetitiveRank, PlayerSummary, RoleDetails } from "./types";
import "./PlayerInfoBanner.css";
import {Tabs, TabList, Tab, TabPanel} from "react-tabs";
import 'react-tabs/style/react-tabs.css';



const PlayerInfoBanner = (props: {summary: PlayerSummary, tabIndex: number, setTabIndex: React.Dispatch<React.SetStateAction<number>>}) => {
    return (
    <div className="player-banner" style={{background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${props.summary.namecard})`,
    backgroundPosition: 'center', backgroundSize: 'cover'}}>
        {/* <div style={{gridArea: "banner", height: 50, overflow: "hidden"}}>
            <img src={props.summary.namecard} />
        </div> */}

        <div style={{gridArea: "avatar", height: 200}}>
            <img src={props.summary.avatar}/>
        </div>

        <div style={{gridArea: "info"}}>
            <h1>{props.summary.username.toUpperCase()} </h1>
            {props.summary.title}
        </div>
        
        <div style={{gridArea: "ranks"}}>
           <DisplayRanks comp={props.summary.competitive} />
        </div>
        <Tabs style={{ gridArea: "selector" }} selectedIndex={props.tabIndex} onSelect={(index) => props.setTabIndex(index)}>
            <TabList>
                <Tab className="react-tabs__tab tab">Visualisations</Tab>
                <Tab className="react-tabs__tab tab">Heroes</Tab>
            </TabList>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
        </Tabs>

        

    </div>
    );
}

const DisplayRanks = (props: {comp: PlatformCompetitiveRank | undefined}) => {
    
    return (
        <div className="ranks-grid">
            <div>
                <img src={props.comp?.pc?.damage.role_icon} width={20} height={20}/> 
            </div>
            <div>
                <img src={props.comp?.pc?.support.role_icon} width={20} height={20}/> 
            </div>
            <div>
                <img src={props.comp?.pc?.tank.role_icon} width={20} height={20}/> 
            </div>

            <div>
                <img src={props.comp?.pc?.damage.rank_icon} width={50} height={50}/> 
            </div>
            <div>
                <img src={props.comp?.pc?.support.rank_icon} width={50} height={50}/> 
            </div>
            <div>
                <img src={props.comp?.pc?.tank.rank_icon} width={50} height={50}/> 
            </div>

        </div>
    )
}

export default PlayerInfoBanner;