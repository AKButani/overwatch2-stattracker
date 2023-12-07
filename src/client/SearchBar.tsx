// SearchBar.js
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = (props: {searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>>, onSearch: () => void}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let mod_username =  event.target.value;
    props.setSearchTerm(mod_username);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter Player name (eg. emongg-11183)"
        value={props.searchTerm}
        onChange={handleInputChange}
        style={{ marginBottom: 0, width: '500px', border: 'none'}}
      />
      <FontAwesomeIcon onClick={props.onSearch} icon={faSearch} size='lg' />
    </div>
  );
};

export default SearchBar;
