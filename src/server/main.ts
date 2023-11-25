import express from "express";
import ViteExpress from "vite-express";

// creates the expres app do not change
const app = express();

// add your routes here

//get player data for specific playerId (perfect match)
app.get("/players/:playerId", async function (_req, res) {
  
  try {
    let response = await fetch(`https://overfast-api.tekrop.fr/players/${_req.params.playerId}`);
    if(!response.ok){
      res.status(response.status).send(response.statusText);
    }else{
      let data = await response.json();
      console.log("responding: ", response)
      res.status(200).json(data);
    }
  } catch (error) {
    console.log("in error");
    res.status(400).send("Server Error")
  }
  
})

// example route which returns a message
app.get("/hello", async function (_req, res) {
  res.status(200).json({ message: "Hello World!" });
});

// Do not change below this line
ViteExpress.listen(app, 5173, () =>
    console.log("Server is listening on http://localhost:5173"),
);
