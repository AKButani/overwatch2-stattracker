import { PlatformCompetitiveRank, PlayerSummary} from "./types";
import "./PlayerInfoBanner.css";
import {Tabs, TabList, Tab, TabPanel} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { DamageIcon, SupportIcon, TankIcon } from "./RoleIcons";
import { BookmarkIcon } from "./Bookmarks/bookmarkIcon";



const PlayerInfoBanner = (props: {summary: PlayerSummary, tabIndex: number, setTabIndex: React.Dispatch<React.SetStateAction<number>>, username:string}) => {
    let url = props.summary.namecard && props.summary.namecard != "https://d15f34w2p8l1cc.cloudfront.net/overwatch/4565e481953f18de9150e966a5bfd692d91df07d038da7d773acdc94030205a7.png" ? props.summary.namecard :  "/Images/banner/default_banner.jpg"
    const bannerStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${url})`,
        backgroundPosition: 'center', 
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat" 
    }
    
    return (
            <div className="player-banner" style={bannerStyle}>
                {/* <div style={{gridArea: "banner", height: 50, overflow: "hidden"}}>
            <img src={props.summary.namecard} />
        </div> */}

                <div style={{ gridArea: "banner", height: "2px" }} />
                <div style={{ gridArea: "bookmark" }}>

                    <BookmarkIcon summary={props.summary} username={props.username} />

                </div>
                <div style={{ gridArea: "avatar", height: 200, display: "flex", alignItems: "center" }}>
                    <img src={props.summary.avatar} height={175} width={175} style={{ borderRadius: "5%" }} />
                </div>

                <div style={{ gridArea: "info" }} className="lightGrey">
                    <h1 className="white" id="BannerUsername">{props.summary.username.toUpperCase()} </h1>
                    {props.summary.title}
                </div>

                <div style={{ gridArea: "ranks" }}>
                    <DisplayRanks comp={props.summary.competitive} />
                </div>
                {props.tabIndex > -1 ? <Tabs style={{ gridArea: "selector" }} selectedIndex={props.tabIndex} onSelect={(index) => props.setTabIndex(index)}>
                    <TabList>
                        <Tab className="react-tabs__tab tab lightGrey">Overview</Tab>
                        <Tab className="react-tabs__tab tab lightGrey">Heroes</Tab>
                    </TabList>
                    <TabPanel />
                    <TabPanel />
                </Tabs> : null}



            </div>
    );
}

const DisplayRanks = (props: {comp: PlatformCompetitiveRank | undefined}) => {
    let pcRankExists = props.comp?.pc?.damage?.rank_icon || props.comp?.pc?.support?.rank_icon || props.comp?.pc?.tank?.rank_icon;
    let consoleRankExists = props.comp?.console?.damage?.rank_icon || props.comp?.console?.support?.rank_icon || props.comp?.console?.tank?.rank_icon;
    //trust me, I hate this more than you do

    
    if (pcRankExists || consoleRankExists){
        return (
            <div className="ranks-grid lightGrey">
                <div>
    
                </div>
    
                <DamageIcon />
                <SupportIcon />
                <TankIcon />
    
    
                {pcRankExists && (
                    <>
                    
                    <div>
                        PC
                    </div>
        
                    <div>
                        {props.comp?.pc?.damage?.rank_icon && <img src={props.comp?.pc?.damage?.rank_icon} width={50} height={50}/> }
                    </div>
                    <div>
                        {props.comp?.pc?.support?.rank_icon && <img src={props.comp?.pc?.support?.rank_icon} width={50} height={50}/> }
                    </div>
                    <div>
                        {props.comp?.pc?.tank?.rank_icon && <img src={props.comp?.pc?.tank?.rank_icon} width={50} height={50}/> }
                    </div>
                    </>
                )}
                
                {consoleRankExists && (
                <>
                <div>
                    CONSOLE
                </div>
    
                <div>
                    {props.comp?.console?.damage?.rank_icon && <img src={props.comp?.console?.damage?.rank_icon} width={50} height={50}/> }
                </div>
                <div>
                    {props.comp?.console?.support?.rank_icon && <img src={props.comp?.console?.support?.rank_icon} width={50} height={50}/> }
                </div>
                <div>
                    {props.comp?.console?.tank?.rank_icon && <img src={props.comp?.console?.tank?.rank_icon} width={50} height={50}/> }
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