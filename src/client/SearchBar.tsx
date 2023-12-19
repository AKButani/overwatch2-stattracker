// SearchBar.js
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bookmarks } from './Bookmarks/bookmarks';


const SearchBar = (props: {searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>>, onSearch: () => void, loadingState: boolean}) => {
  let currSearch = props.searchTerm;

  const clickHandler = () => {
    props.setSearchTerm(currSearch);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let t =  event.target.value;
    currSearch = t
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Call the onSearch function when Enter key is pressed
      props.setSearchTerm(currSearch);
    }
  };

  return (
    <>
      <div className="search-bar" aria-busy={props.loadingState}>
        <input
          type="text"
          placeholder="Enter player name (e.g. emongg-11183)"
          
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ marginBottom: 0, width: '500px', border: 'none'}}
        />
        <FontAwesomeIcon onClick={clickHandler} icon={faSearch} size='lg' />
      </div>
      <Bookmarks onSearch={props.onSearch} setSearchTerm={props.setSearchTerm}></Bookmarks>
    </>
  );
};

export default SearchBar;
