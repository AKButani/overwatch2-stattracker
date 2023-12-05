import { scaleOrdinal } from "d3";
import { sankey, sankeyJustify, sankeyLinkHorizontal } from "d3-sankey";
import { HeroStatCat, PlayerCareer, PlayerCareerStatsGamemode } from "./types";
import { useState } from "react";

const MARGIN_Y = 25;
const MARGIN_X = 5;
// colors are weird, they differ between the two diagrams, 
// comments below hold for QP
const COLORS = ["#e85252", // damage node + support link color
                "#5dde35", // support node + tank link color
                "#2d33cf", // tank node + total link color
                "#9a6fb0", // "total node" color
                "#e3dc19"];// damage link color
// if these are too small, it won't display properly
const linkColor = "#f0d297";
const WIDTH = 1000;
const HEIGHT = 600;

interface NodeData {
  name: string;
  category: string;
  weight: number;
}

interface LinkData {
  source: string; 
  target: string; 
  value: number;
}

type Data = {
  nodes: NodeData[];
  links: LinkData[];
};

type SankeyProps = {
  width: number;
  height: number;
  data: Data;
};

type HeroTimeTuple = [string, number];

const roles = ["Support", "Damage", "Tank"]

const timeConverter = 1;

const heroRoleTable: { [key:string]: string} = {
  "cassidy": "Damage",
  "torbjorn": "Damage",
  "sombra": "Damage",
  "sojourn": "Damage",
  "kiriko": "Support",
  "lifeweaver": "Support",
  "mauga": "Tank",
  "mercy": "Support",
  "reaper": "Damage",
  "reinhardt": "Tank",
  "tracer": "Damage",
  "moira": "Support",
  "widowmaker": "Damage",
  "orisa": "Tank",
  "lucio": "Support",
  "soldier-76": "Damage",
  "dva": "Tank",
  "genji": "Damage",
  "zenyatta": "Support",
  "winston": "Tank",
  "pharah": "Damage",
  "brigitte": "Support",
  "bastion": "Damage",
  "roadhog": "Tank",
  "symmetra": "Damage",
  "ana": "Support",
  "junkrat": "Damage",
  "zarya": "Tank",
  "hanzo": "Damage",
  "lúcio": "Support",
  "mei": "Damage",
  "torbjörn": "Damage",
  "sigma": "Tank",
  "ashe": "Damage",
  "baptiste": "Support",
  "echo": "Damage",
  "wrecking-ball": "Tank",
  "doomfist": "Tank",
  "junker-queen": "Tank",
  "ramattra": "Tank",
  "illari": "Support",
}

const createPlaytimeArray = (stats:PlayerCareerStatsGamemode) : HeroTimeTuple[] => {
  const result = [];
  const career_stats = stats.career_stats;
  for (const key in career_stats) {
    if (key === "all-heroes") continue;
    const interm = career_stats[key] as HeroStatCat[];
    if (interm === null) continue;
    const obj = interm[3]!.stats[0]!;
    if (obj.key! === "time_played") {
      result.push([key, obj.value] as HeroTimeTuple);
    }
  }
  // console.log(result);
  return result;
}

const convertToNodesLinks = (playtime_per_hero: HeroTimeTuple[]) : Data => {
  const timePerRole: {[key: string]: number} = {};
  roles.forEach((role) => {
    timePerRole[role] = 0;
  })
  const nodes : NodeData[] = [];
  const links : LinkData[] = [];
  playtime_per_hero.forEach(([hero, time]) => {
    var role = heroRoleTable[hero];
    if (role === undefined) {
      role = "Support";
      heroRoleTable[role] = "Support";
    };
    nodes.push({name: hero, category: role, weight: time});
    links.push({source: role, target: hero, value: time / timeConverter})
    timePerRole[role] += time;
  });
  roles.forEach((role) => {
    const time = timePerRole[role]!;
    nodes.push({name: role, category: role, weight: time})
    links.push({source: "Total", target: role, value: time / timeConverter})
  });
  nodes.push({name: "Total", category: "Total", weight: 0});
  return {nodes: nodes, links:links};
}



export const SankeyDiagram = (props:{playerData:PlayerCareer}) => {
  const [sorted, setSorted] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<string>("Comp")

  const handleGameModeClick = () => {
    setGameMode(gameMode === "Comp" ? "QP" : "Comp");
  }

  const handleSortedClick = () => {
    setSorted(!sorted);
  }

  // create nodes and links
  const stats = props.playerData.stats;
  if (stats === null || typeof stats === "undefined") {
    return null;
  }
  const gameModeStats = gameMode === "Comp" ? stats!.pc!.competitive! : stats!.pc!.quickplay!;
  var sankey = null;
  if (!gameModeStats) return null;

  const playtime_array = createPlaytimeArray(gameModeStats);
  const data = convertToNodesLinks(playtime_array);
  sankey = Sankey({width: WIDTH, height: HEIGHT, data: data}, sorted);

  const buttonStyle = {
    width: '250px',
    padding: '10px',
  };

  const buttonContainerStyle = {
    display: 'inline-block',
  }

  return  (
            <>
              <h1>
              {gameMode === "Comp" ? "Competitive Playtime " : "Quickplay Playtime"}
              </h1>
              {sankey}
              <div style={buttonContainerStyle}>
                <button style={buttonStyle} onClick={handleGameModeClick}>{gameMode === "Comp" ? 'Switch to Quickplay' : 'Switch to Competitive'}</button>
                <button style={buttonStyle} onClick={handleSortedClick}>{!sorted ? 'Sort by playtime' : 'Unsort'}</button>
              </div>
            </>
          )
}

const Sankey = ({ width, height, data }: SankeyProps, sorted: Boolean) => {
  const allGroups = [...new Set(data.nodes.map((d) => d.category))].sort();
  const colorScale = scaleOrdinal<string>().domain(allGroups).range(COLORS);

  var nodeSort = (node1: NodeData, node2: NodeData) : number=> {
    // < 0: node1 above node2; > 0: node1 below node2
    return node2.weight - node1.weight;
  };

  // Set the sankey diagram properties
  var sankeyGenerator = sankey<NodeData, LinkData>()
    .nodeWidth(32)
    .nodePadding(10)
    .extent([
      [MARGIN_X, MARGIN_Y],
      [width - MARGIN_X, height - MARGIN_Y],
    ])
    .nodeId((node) => node.name)
    .nodeAlign(sankeyJustify) // decides horizontal node position, doesn't matter here
    // comment out below to have
    // .nodeSort(nodeSort)
    ;

    if (sorted) {
      sankeyGenerator = sankeyGenerator.nodeSort(nodeSort);
    }
    

  // Compute nodes and links positions
  const { nodes, links } = sankeyGenerator(data);

  // Draw the nodes
  const allNodes = nodes.map((node) => {
    return (
      <g key={node.index}>
        <rect
          height={node.y1! - node.y0!}
          width={sankeyGenerator.nodeWidth()}
          x={node.x0}
          y={node.y0!}
          stroke={"black"}
          fill={colorScale(node.category)}
          fillOpacity={1}
          rx={0.5}
        />
      </g>
    );
  });

  // Draw the links
  const allLinks = links.map((link, i) => {
    const linkGenerator = sankeyLinkHorizontal();
    const path = linkGenerator(link);

    return (
      <path
        key={i}
        d={path!}
        // stroke={colorScale(link.source)}
        stroke={linkColor}
        fill="none"
        strokeOpacity={0.4}
        strokeWidth={link.width}
      />
    );
  });

  //
  // Draw the Labels
  //
  const allLabels = nodes.map((node, i) => {
    return (
      <text
        key={i}
        x={node.x0! < width / 2 ? node.x1! + 6 : node.x0! - 6}
        y={(node.y1! + node.y0!) / 2}
        dy="0.35rem"
        textAnchor={node.x0! < width / 2 ? "start" : "end"}
        fontSize={12}
      >
        {node.name}
      </text>
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        {allLinks}
        {allNodes}
        {allLabels}
      </svg>
    </div>
  );
};

export default SankeyDiagram;