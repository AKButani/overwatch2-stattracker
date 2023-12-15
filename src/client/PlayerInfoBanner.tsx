import { PlatformCompetitiveRank, PlayerSummary} from "./types";
import "./PlayerInfoBanner.css";
import {Tabs, TabList, Tab} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { DamageIcon, SupportIcon, TankIcon } from "./RoleIcons";



const PlayerInfoBanner = (props: {summary: PlayerSummary, tabIndex: number, setTabIndex: React.Dispatch<React.SetStateAction<number>>}) => {
    const bannerStyle = {
        background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${props.summary.namecard})`,
        backgroundPosition: 'center', 
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat" 
    }
    
    return (
            <div className="player-banner" style={bannerStyle}>
                {/* <div style={{gridArea: "banner", height: 50, overflow: "hidden"}}>
            <img src={props.summary.namecard} />
        </div> */}

                <div style={{ gridArea: "avatar", height: 200 }}>
                    <img src={props.summary.avatar} />
                </div>

                <div style={{ gridArea: "info" }} className="lightGrey">
                    <h1 className="white">{props.summary.username.toUpperCase()} </h1>
                    {props.summary.title}
                </div>

                <div style={{ gridArea: "ranks" }}>
                    <DisplayRanks comp={props.summary.competitive} />
                </div>
                <Tabs style={{ gridArea: "selector" }} selectedIndex={props.tabIndex} onSelect={(index) => props.setTabIndex(index)}>
                    <TabList>
                        <Tab className="react-tabs__tab tab lightGrey">Overview</Tab>
                        <Tab className="react-tabs__tab tab lightGrey">Heroes</Tab>
                    </TabList>
                    {/* <TabPanel></TabPanel>
            <TabPanel></TabPanel> */}
                </Tabs>



            </div>
    );
}

const DisplayRanks = (props: {comp: PlatformCompetitiveRank | undefined}) => {
    if (props.comp?.pc || props.comp?.console){
        return (
            <div className="ranks-grid">
                <div>
    
                </div>
    
                <DamageIcon />
                <SupportIcon />
                <TankIcon />
    
    
                {props.comp?.pc && (
                    <>
                    
                    <div>
                        PC
                    </div>
        
                    <div>
                        <img src={props.comp?.pc?.damage?.rank_icon} width={50} height={50}/> 
                    </div>
                    <div>
                        <img src={props.comp?.pc?.support?.rank_icon} width={50} height={50}/> 
                    </div>
                    <div>
                        <img src={props.comp?.pc?.tank?.rank_icon} width={50} height={50}/> 
                    </div>
                    </>
                )}
                
                {props.comp?.console && (
                <>
                <div>
                    CONSOLE
                </div>
    
                <div>
                    <img src={props.comp?.console?.damage?.rank_icon} width={50} height={50}/> 
                </div>
                <div>
                    <img src={props.comp?.console?.support?.rank_icon} width={50} height={50}/> 
                </div>
                <div>
                    <img src={props.comp?.console?.tank?.rank_icon} width={50} height={50}/> 
                </div>
                </>
                )}
    
            </div>
        )
    }else{
        return;
    }
    
}

export default PlayerInfoBanner;