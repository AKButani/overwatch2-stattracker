import { useContext, useState } from "react";
<<<<<<< HEAD
import { PlayerDataContext, UsernameContext} from "../App";
=======
import { PlayerDataContext } from "../App";
>>>>>>> 53db94090d98f96b3e68667b4cc5682fdf565572
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark} from '@fortawesome/free-solid-svg-icons';
import { HEROES_KEYS, PlayerCareer, PlayerSummary, platform} from "../types";




export const BookmarkIcon = (props: {summary: PlayerSummary, username: string}) => {
    
    const storedBookmarked = localStorage.getItem("bookmarkedPlayers");
    var bookmarks : Array<[string , string | undefined, string | undefined]> = [];
    //the type is username, iconUrl, and namecardurl
    if(storedBookmarked != null){
        bookmarks = JSON.parse(storedBookmarked);
    }

    const checkifBookmarked = (playerName: string) => {
        for (let player of bookmarks) {
            if(player[0] == playerName){
                return true;
            }
        }
        return false;
    }
    
    const [isBookmarked, setIsBookmarked] = useState(bookmarks.filter((item) => item[0] == props.username).length > 0);
    const handleClick = () => {
        const newBookmarkState = !isBookmarked;
        setIsBookmarked(newBookmarkState);
        const username = props.username;
        const iconUrl = props.summary.avatar;
        const namecardUrl = props.summary.namecard;

        if(newBookmarkState){
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
        <div style={{ cursor: 'pointer', color: checkifBookmarked(props.username) ? 'grey' : 'black' }}>
          <FontAwesomeIcon icon={faBookmark} onClick={() => (handleClick())} size="3x"/>
        </div>
    );
}
