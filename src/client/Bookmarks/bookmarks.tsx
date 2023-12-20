import "./bookmark.css";
import "../Layout.css"
import { useContext } from 'react';
import { BookmarksContext } from '../App';


const SingleBookmark = (props: {playerName:string, onSearch:() => void, playerIcon:string, playerNamecard:string, setSearchTerm:React.Dispatch<React.SetStateAction<string>>, tabIndex:number}) => {
    const handleSearch = () => {
        props.setSearchTerm(props.playerName);
        //props.onSearch()
    }
    let url = props.playerNamecard && props.playerNamecard != "https://d15f34w2p8l1cc.cloudfront.net/overwatch/4565e481953f18de9150e966a5bfd692d91df07d038da7d773acdc94030205a7.png" ? props.playerNamecard :  "/Images/banner/default_banner.jpg"
    return(
        <div>
            <div tabIndex={props.tabIndex} onKeyDown={(e) => {if (e.key === 'Enter') handleSearch()}} onClick={handleSearch} className="player-bookmark" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${url})`,
            backgroundPosition: 'center', backgroundSize: 'fit', padding: "5px"}}>
                <div className="avatar" style={{gridArea: "avatar"}}>
                    <img className="icon" src={props.playerIcon}/>
                </div>
                <div className="info">
                    <h1 className="name white">{((props.playerName).split('-')[0] as string).toUpperCase()} </h1>
                </div>
            </div>
        </div>
    ) 
}

export const Bookmarks = (props: {onSearch: () => void, setSearchTerm:React.Dispatch<React.SetStateAction<string>>}) => {
    const bookmarksState = useContext(BookmarksContext)?.bookmarks; 
    //const storedBookmarks = localStorage.getItem('bookmarkedPlayers');
    if(bookmarksState == undefined){
        return(null);
    }
    //const bookmarks : Array<[string,string,string]> = JSON.parse(storedBookmarks);
    //console.log(bookmarks)
    return(
        <div>
            <div className="bookmark-container">
                {bookmarksState.map(([playerName, icon, namecard], index) => (
                    <SingleBookmark key={playerName as string} playerName={playerName as string} playerIcon={icon as string} playerNamecard={namecard as string} onSearch={props.onSearch} setSearchTerm={props.setSearchTerm} tabIndex={index + 2}/>
                ))
                }
            </div>
        </div>
    )
}