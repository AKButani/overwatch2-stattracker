import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./bookmark.css";
import "../Layout.css"
import { useEffect } from 'react';


const SingleBookmark = (props: {playerName:string, onSearch:() => void, playerIcon:string, playerNamecard:string, setSearchTerm:React.Dispatch<React.SetStateAction<string>>}) => {
    const handleSearch = () => {
        console.log("in handleSearch")
        props.setSearchTerm(props.playerName);
        //props.onSearch()
    }    
    return(
        <div>
            <div onClick={handleSearch} className="player-bookmark" style={{background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${props.playerNamecard})`,
            backgroundPosition: 'center', backgroundSize: 'fit'}}>
                <div className="avatar" style={{gridArea: "avatar"}}>
                    <img className="icon" src={props.playerIcon}/>
                </div>
                <div style={{gridArea: "info"}} className="info">
                    <h1 className="name">{((props.playerName).split('-')[0] as string).toUpperCase()} </h1>
                </div>
            </div>
        </div>
    ) 
}

export const Bookmarks = (props: {onSearch: () => void, setSearchTerm:React.Dispatch<React.SetStateAction<string>>}) => {
    const storedBookmarks = localStorage.getItem('bookmarkedPlayers');
    if(!storedBookmarks){
        return(null);
    }
    const bookmarks : Array<string> = JSON.parse(storedBookmarks);
    console.log(bookmarks)
    return(
        <div>
            <div className="bookmark-container">
                {bookmarks.map(([playerName, icon, namecard]) => (
                    <SingleBookmark playerName={playerName as string} playerIcon={icon as string} playerNamecard={namecard as string} onSearch={props.onSearch} setSearchTerm={props.setSearchTerm}/>
                ))
                }
            </div>
        </div>
    )
}