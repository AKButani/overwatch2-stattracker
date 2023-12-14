import { scaleOrdinal } from "d3";
import { sankey, sankeyJustify, sankeyLinkHorizontal } from "d3-sankey";
import { HeroStatCat, PlayerCareer, PlayerCareerStatsGamemode } from "./types";
import { useContext, useState } from "react";
import { SelectedModeContext } from "./DisplayPlayer";

const MARGIN_Y = 25;
const MARGIN_X = 5;

const colorDict: {[key: string]: string} = {
  "Support": "#00FF00",
  "Damage": "#f23a22",
  "Tank": "#00BFFF",
  "Total": "#f99e1a",
}

const lightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
const linkColor = lightMode ? "#8c8c89" : "#d9d9d0";
// if these are too small, it won't display properly
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
    if (interm[3] === null || interm[3] === undefined) continue;
    if (interm[3]!.stats === null) continue;
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
    var hero_cap = hero.charAt(0).toUpperCase() + hero.slice(1);
    if (hero_cap === "Wrecking-ball") {
      hero_cap = "Wrecking Ball";
    } else if (hero_cap === "Junker-queen") {
      hero_cap = "Junker Queen";
    } else if (hero_cap === "Soldier-76") {
      hero_cap = "Soldier: 76";
    }
    nodes.push({name: hero_cap, category: role, weight: time});
    links.push({source: role, target: hero_cap, value: time})
    timePerRole[role] += time;
  });
  roles.forEach((role) => {
    const time = timePerRole[role]!;
    if (time != 0) {
      nodes.push({name: role, category: role, weight: time})
      links.push({source: "Total", target: role, value: time})
    }
  });
  nodes.push({name: "Total", category: "Total", weight: 0});
  return {nodes: nodes, links:links};
}



export const SankeyDiagram = (props:{playerData:PlayerCareer}) => {
  const stats = props.playerData.stats;
  const [sorted, setSorted] = useState<number>(0);
  const selectedMode = useContext(SelectedModeContext);

  const handleSortedClick = () => {
    setSorted(sorted == 1 ? 2 : 1);
  }

  // create nodes and links
  if (stats === null || typeof stats === "undefined") {
    return null;
  }
  const platformStats = selectedMode.platform === "pc" ? stats!.pc! : stats!.console!;

  if (platformStats == null || platformStats == undefined) {
    return null;
  }
  const gameModeStats = selectedMode.mode === "competitive" ? platformStats.competitive! : platformStats.quickplay!;
  var sankey = null;
  if (!gameModeStats) return null;

  const playtime_array = createPlaytimeArray(gameModeStats);
  const data = convertToNodesLinks(playtime_array);
  sankey = Sankey({width: WIDTH, height: HEIGHT, data: data}, sorted);

  const buttonStyle = {
    width: '250px',
    padding: '10px',
    margin: '10px',
    display: 'inline-block',
  };

  const buttonContainerStyle = {
    display: 'inline-block',
  }

  return  (
            <>
              <h2>
              Playtime
              </h2>
              {sankey}
              <div style={buttonContainerStyle}>
                <button style={buttonStyle} onClick={handleSortedClick}>{sorted != 1 ? 'Sort by playtime' : 'Sort alphabetically'}</button>
              </div>
            </>
          )
  
}

const Sankey = ({ width, height, data }: SankeyProps, sorted: number) => {
  // const allGroups = [...new Set(data.nodes.map((d) => d.category))].sort();
  // const colorScale = scaleOrdinal<string>().domain(allGroups).range(COLORS);

  var nodeSortValue = (node1: NodeData, node2: NodeData) : number=> {
    // < 0: node1 above node2; > 0: node1 below node2
    return node2.weight - node1.weight;
  };

  var nodeSortAlph = (node1: NodeData, node2: NodeData) : number=> {
    // < 0: node1 above node2; > 0: node1 below node2
    return node1.name.localeCompare(node2.name);
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

    if (sorted == 1) {
      sankeyGenerator = sankeyGenerator.nodeSort(nodeSortValue);
    } else if (sorted == 2) {
      sankeyGenerator = sankeyGenerator.nodeSort(nodeSortAlph);
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
          // stroke={"black"} // uncomment to paint surrounding box
          fill={colorDict[node.category]}
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