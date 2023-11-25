// SearchBar.js


const SearchBar = (props: {searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>>, onSearch: () => void}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let mod_username =  event.target.value;
    props.setSearchTerm(mod_username);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Player name (eg. emongg-11183)"
        value={props.searchTerm}
        onChange={handleInputChange}
        style={{ width: '500px', textAlign: 'center'}}
      />
      <button onClick={props.onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
