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
        placeholder="Search..."
        value={props.searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={props.onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
