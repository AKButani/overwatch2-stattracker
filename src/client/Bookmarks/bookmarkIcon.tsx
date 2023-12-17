import { useContext, useState } from "react";
import { PlayerDataContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark} from '@fortawesome/free-solid-svg-icons';
import { HEROES_KEYS, PlayerCareer, PlayerSummary, platform} from "../types";


export const BookmarkIcon = (props: {summary: PlayerSummary, username: string}) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const handleClick = (book:Boolean) => {
        setIsBookmarked(!isBookmarked);
        const storedBookmarked = localStorage.getItem("bookmarkedPlayers");
        var bookmarks : Array<[string , string | undefined, string | undefined]> = [];
        if(storedBookmarked != null){
            bookmarks = JSON.parse(storedBookmarked);
        }
       
        const username = props.username;
        const iconUrl = props.summary.avatar;
        const namecardUrl = props.summary.namecard;

        if(!book){
            bookmarks.push([username, iconUrl, namecardUrl]);
        }else{
            bookmarks = bookmarks.filter(
                (item) => item[0] != username
            );
        }
        localStorage.setItem("bookmarkedPlayers", JSON.stringify(bookmarks));
        console.log("Bookmarks", bookmarks);
    }
    return (
        <div style={{ cursor: 'pointer', color: isBookmarked ? 'grey' : 'black' }}>
          <FontAwesomeIcon icon={faBookmark} onClick={() => (handleClick(isBookmarked))} size="3x"/>
        </div>
    );
}