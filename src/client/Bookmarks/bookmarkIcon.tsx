import { useContext } from "react";
import { BookmarksContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark} from '@fortawesome/free-solid-svg-icons';
import { PlayerSummary} from "../types";




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
    }
    return (
        <div  style={{ display: "flex", flexGrow: "row", justifyContent: "flex-start", alignItems: "center", gap: "10px" }}>
            <div onClick={() => (handleClick())} style={{cursor: 'pointer', display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px" }}>
                <FontAwesomeIcon icon={faBookmark} color={checkifBookmarked(props.username.replace(/#/g, "-")) ? 'lightgrey' : 'grey'} size="3x" />
                <div className="white">
                    Favourite
                </div>
            </div>
        </div>
    );
}

{/* "fa-light fa-bookmark" */}