import { useContext, useEffect, useState } from "react";
import { BookmarksContext, PlayerDataContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark} from '@fortawesome/free-solid-svg-icons';
import { HEROES_KEYS, PlayerCareer, PlayerSummary, platform} from "../types";




export const BookmarkIcon = (props: {summary: PlayerSummary, username: string}) => {

    const setBookmarks = useContext(BookmarksContext)?.setBookmarks;
    const bookmarks = useContext(BookmarksContext)?.bookmarks;
    
    /* const storedBookmarked = localStorage.getItem("bookmarkedPlayers");
    var bookmarks : Array<[string , string | undefined, string | undefined]> = [];
    //the type is username, iconUrl, and namecardurl
    if(storedBookmarked != null){
        bookmarks = JSON.parse(storedBookmarked);
    } */

    if (bookmarks == undefined){
        return;
    }

    const checkifBookmarked = (playerName: string) => {
        for (let player of bookmarks) {
            if(player[0] == playerName){
                return true;
            }
        }
        return false;
    }
    
    //const [isBookmarked, setIsBookmarked] = useState(bookmarks.filter((item) => item[0] == props.username.replace(/#/g, "-")).length > 0);
    const handleClick = () => {
        const newBookmarkState = !checkifBookmarked(props.username.replace(/#/g, "-"));
        //setIsBookmarked(newBookmarkState);
        const username = props.username.replace(/#/g, "-");
        const iconUrl = props.summary.avatar;
        const namecardUrl = props.summary.namecard;
        let newBookmarks = [...bookmarks];

        if(newBookmarkState){
            newBookmarks.push([username, iconUrl ? iconUrl: "", namecardUrl? namecardUrl: ""]);
        }else{
            newBookmarks = newBookmarks.filter(
                (item) => item[0] != username
            );
        }
        localStorage.setItem("bookmarkedPlayers", JSON.stringify(newBookmarks));
        setBookmarks!(newBookmarks); //we stringify and then parse to get rid of the undefined values
        console.log("Bookmarks", bookmarks);
    }
    return (
        <div style={{ cursor: 'pointer', color: checkifBookmarked(props.username.replace(/#/g, "-")) ? 'grey' : 'lightgrey' }}>
          <FontAwesomeIcon icon={faBookmark} onClick={() => (handleClick())} size="3x"/>
        </div>
    );
}

{/* "fa-light fa-bookmark" */}