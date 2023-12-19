
import { createContext, useEffect, useState } from "react";
import "./App.css";
import Layout from "./Layout";
import SearchBar from "./SearchBar";
import { PlayerCareer, PlayerInfoContext } from "./types";
import DisplayPlayer from "./DisplayPlayer";
/*Test Player: WarDevil#11626*/

export type BookmarksContextType = {
  bookmarks: Array<[string, string, string]>;
  setBookmarks: React.Dispatch<React.SetStateAction<Array<[string, string, string]>>>;
};

export const PlayerDataContext = createContext<PlayerInfoContext | undefined>(undefined);
export const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

function App() {
  
  const [username, setUsername] = useState<string>("");
  const [playerData, setPlayerData] = useState<PlayerCareer | undefined | false>(undefined); //false means player not found, undefined means not searched yet
  const [bookmarks, setBookmarks] = useState<Array<[string, string, string]>>(localStorage.getItem("bookmarkedPlayers")? JSON.parse(localStorage.getItem("bookmarkedPlayers")!) : []);
  console.log("PlayerData", playerData);

  const onUsernameSearch = async () => {
    // uncomment below for testing
    // setUsername("samsungnunca-1517"); // e.g. "WarDevil-11626", "Lemonade-11498", "emongg-11183"
    //testing
    //console.log("player Summary Fetch:", await (await fetch(`/players/${username}`)).json());
    console.log("onSearch");
    try {
      const rightUsername = username.replace('#', '-');
      let response = await fetch(`/players/${rightUsername}`)
      console.log(response.status)
      if (!response.ok) {
        // If the response status is not OK (not in the range 200-299), handle the error
        if (response.status === 404) {
          // Handle 404 Not Found
          console.log("in 404");
          setPlayerData(false);
        } else {
          // Handle other error cases
          console.log('Server error');
        }
      } else {
        // If the response status is OK, handle the successful response
        const data = await response.json();
        console.log('Data:', data);
        setPlayerData(data);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.log("in error");
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    const onSearch = async () => {
      // uncomment below for testing
      // setUsername("samsungnunca-1517"); // e.g. "WarDevil-11626", "Lemonade-11498", "emongg-11183"
      //testing
      //console.log("player Summary Fetch:", await (await fetch(`/players/${username}`)).json());
      if (username != "") {
        console.log("onSearch");
        try {
          const rightUsername = username.replace('#', '-');
          let response = await fetch(`/players/${rightUsername}`)
          console.log(response.status)
          if (!response.ok) {
            // If the response status is not OK (not in the range 200-299), handle the error
            if (response.status === 404) {
              // Handle 404 Not Found
              console.log("in 404");
              setPlayerData(false);
            } else {
              // Handle other error cases
              console.log('Server error');
            }
          } else {
            // If the response status is OK, handle the successful response
            const data = await response.json();
            console.log('Data:', data);
            setPlayerData(data);
          }
        } catch (error) {
          // Handle network errors or other exceptions
          console.log("in error");
          console.log('Error:', error);
        }
      }
      
    };

    onSearch();
  }, [username]);


  return (
    <PlayerDataContext.Provider value={{ playerData: playerData, setPlayerData: setPlayerData }}>
      <BookmarksContext.Provider value={{ bookmarks: bookmarks, setBookmarks: setBookmarks }} >
        <Layout>
          <SearchBar searchTerm={username} setSearchTerm={setUsername} onSearch={onUsernameSearch} />
          <DisplayPlayer username={username} />
        </Layout>
      </BookmarksContext.Provider>
    </PlayerDataContext.Provider>
  );
}

export default App;
