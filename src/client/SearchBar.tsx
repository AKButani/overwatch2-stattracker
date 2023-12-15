// SearchBar.js
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bookmarks } from './Bookmarks/Bookmarks';

const SearchBar = (props: {searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>>, onSearch: () => void}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let mod_username =  event.target.value;
    props.setSearchTerm(mod_username);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Call the onSearch function when Enter key is pressed
      props.onSearch();
    }
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Player name (eg. emongg-11183)"
          value={props.searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ marginBottom: 0, width: '500px', border: 'none'}}
        />
        <FontAwesomeIcon onClick={props.onSearch} icon={faSearch} size='lg' />
      </div>
      <Bookmarks onSearch={props.onSearch} setSearchTerm={props.setSearchTerm}></Bookmarks>
    </div>
  );
};

export default SearchBar;
