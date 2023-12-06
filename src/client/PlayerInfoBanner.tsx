import { PlatformCompetitiveRank, PlayerSummary, RoleDetails } from "./types";
import "./PlayerInfoBanner.css"



const PlayerInfoBanner = (props: {summary: PlayerSummary}) => {
    const playerBannerStyle = {
        display: 'grid',
        gridTemplateAreas: `
          "banner banner banner"
          "avatar info ranks"
          "selector selector selector"
        `,
        rowGap: '10px',
        columnGap: '10px',
        gridTemplateRows: '50px auto auto',
        backgroundImage: `url(${props.summary.namecard})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        gridTemplateColumns: ''
      };
    return (
    <div className="player-banner" style={{background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${props.summary.namecard})`}}>
        {/* <div style={{gridArea: "banner", height: 50, overflow: "hidden"}}>
            <img src={props.summary.namecard} />
        </div> */}

        <div style={{gridArea: "avatar", height: 200}}>
            <img src={props.summary.avatar}/>
        </div>

        <div style={{gridArea: "info"}}>
            {props.summary.username.toUpperCase()} <br />
            {props.summary.title}
        </div>
        
        <div style={{gridArea: "ranks"}}>
           <DisplayRanks comp={props.summary.competitive} />
        </div>

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