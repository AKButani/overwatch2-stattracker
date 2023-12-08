import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';




const SingleBookmark = (props: {playerName:string, onSearch:() => void, setSearchTerm:React.Dispatch<React.SetStateAction<string>>}) => {
    const handleSearch = () => {
        props.setSearchTerm(props.playerName);
        props.onSearch()
    }    
    return(
        <div onClick={handleSearch}>
            {props.playerName}
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
            <h3>Recently searched players</h3>
            <div className="bookmark-container">
                {bookmarks.map((playerName) => (
                    <SingleBookmark playerName={playerName} onSearch={props.onSearch} setSearchTerm={props.setSearchTerm}/>
                ))
                }

            </div>
        </div>
    )
}