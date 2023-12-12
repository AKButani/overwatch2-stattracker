
import { createContext, useState } from "react";
import "./App.css";
import Layout from "./Layout";
import SearchBar from "./SearchBar";
import { PlayerCareer, PlayerInfoContext } from "./types";
import DisplayPlayer from "./DisplayPlayer";
import { Bookmarks } from "./bookmarks";
/*Test Player: WarDevil#11626*/

export const PlayerDataContext = createContext<PlayerInfoContext | undefined>(undefined);

function App() {
  
  const [username, setUsername] = useState<string>("");
  const [playerData, setPlayerData] = useState<PlayerCareer | undefined | false>(undefined); //false means player not found, undefined means not searched yet
  console.log("PlayerData", playerData);

  const onUsernameSearch = async () => {
    // uncomment below for testing
    // setUsername("emongg-11183"); // e.g. "WarDevil-11626", "Lemonade-11498", "emongg-11183"
    //testing
    //console.log("player Summary Fetch:", await (await fetch(`/players/${username}`)).json());
    try {
      let response = await fetch(`/players/${username}`)
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
        

        //local storage handling for bookmarks
        var iconUrl;
        var namecardUrl;
        if(data != undefined && ((data as PlayerCareer).summary) != undefined){
          iconUrl = (data as PlayerCareer).summary.avatar;
          namecardUrl = (data as PlayerCareer).summary.namecard;
        } else {
          iconUrl = undefined;
          namecardUrl = undefined;
        }
        const storedBookmarked = localStorage.getItem("bookmarkedPlayers");
        var bookmarks : Array<[string , string | undefined, string | undefined]> = [];
        if(storedBookmarked != null){
          bookmarks = JSON.parse(storedBookmarked);
        }
        
        var alreadyThere : Boolean = false;
        for(var i = 0; i < bookmarks.length; i++){
          if (bookmarks[i]![0] == username){
            alreadyThere = true;
          }
        }
        if(!alreadyThere){
          bookmarks.push([username, iconUrl, namecardUrl]);
          localStorage.setItem("bookmarkedPlayers", JSON.stringify(bookmarks));

        }        
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.log("in error");
      console.log('Error:', error);
    }
  }


  return (
    <PlayerDataContext.Provider value={{ playerData: playerData, setPlayerData: setPlayerData }}>
      <Layout>
        <SearchBar searchTerm={username} setSearchTerm={setUsername} onSearch={onUsernameSearch} />
        <DisplayPlayer />
      </Layout>
    </PlayerDataContext.Provider>
  );
}

export default App;
