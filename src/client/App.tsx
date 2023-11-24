
import { useState } from "react";
import "./App.css";
import Layout from "./Layout";
import SearchBar from "./SearchBar";
import OverwatchAPI from "overfast-api-client";
import { Player, PlayerInfo } from "./types";
/*Test Player: WarDevil#11626*/


function App() {
  
  const [username, setUsername] = useState<string>("");
  const [playerData, setPlayerData] = useState<PlayerInfo | undefined>(undefined);
  console.log("PlayerData", playerData);

  const onUsernameSearch = async () => {
    //testing
    console.log("player Summary Fetch:", await (await fetch(`/players/${username}`)).json());
    
    console.log("Searching for: ", username);
    //this code should be in backend but i just want to test
    let player_list = await OverwatchAPI.searchPlayers({ name: username })
    console.log("Search results: ", player_list);
    let testPlayerSummary = await fetch("/hello");
    console.log("Test", testPlayerSummary);
    let res = await OverwatchAPI.player(player_list.results[0]!.player_id);
    setPlayerData({ career: await res.career, summary: await res.summary });
  }

  return (
      <Layout>
        <SearchBar searchTerm={username} setSearchTerm={setUsername} onSearch={onUsernameSearch} />
      </Layout>
  );
}

export default App;
