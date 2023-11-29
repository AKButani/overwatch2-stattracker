import { scaleOrdinal } from "d3";
import { sankey, sankeyJustify, sankeyLinkHorizontal } from "d3-sankey";
import { PlayerCareer, PlayerCareerStatsGamemode } from "./types";

const MARGIN_Y = 25;
const MARGIN_X = 5;
const COLORS = ["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"];
// if these are too small, it won't display properly
const WIDTH = 1000;
const HEIGHT = 600;

interface NodeData {
  name: string;
  category: string;
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

// type Data = {
//   nodes: { name: string; category: string }[];
//   links: { source: string; target: string; value: number }[];
// };

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
    const obj = career_stats[key][3].stats[0];
    if (obj.key ===! "time_played") continue;
    result.push([key, obj.value] as HeroTimeTuple);
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
    nodes.push({name: hero, category: role});
    links.push({source: role, target: hero, value: time / timeConverter})
    timePerRole[role] += time;
  });
  roles.forEach((role) => {
    nodes.push({name: role, category: role})
    const time = timePerRole[role]!;
    links.push({source: "total", target: role, value: time / timeConverter})
  });
  nodes.push({name: "total", category: "total"});
  return {nodes: nodes, links:links};
}

export const SankeyDiagram = (props:{playerData:PlayerCareer}) => {
  // create nodes and links
  // const playtime_array_mockup: HeroTimeTuple[] = [["ana", 10], ["tracer", 20], ["reaper", 15], ["mercy", 40], ["zarya", 5]]
  const comp_stats = props.playerData.stats!.pc!.competitive!;
  var comp_sankey = null;
  if (comp_stats) {
    const playtime_array = createPlaytimeArray(comp_stats);
    const data = convertToNodesLinks(playtime_array);
    // const data = convertToNodesLinks(playtime_array_mockup);
    // const data_mockup : Data = {
    //   nodes: [{name: "source", category: "cat1"}, {name: "sink", category: "cat1"}], 
    //   links: [{source: "source", target: "sink", value: 10}]};
    comp_sankey = Sankey({width: WIDTH, height: HEIGHT, data: data});
  }
  const quickplay_stats = props.playerData.stats!.pc!.quickplay!;
  console.log("Quickplay\n", quickplay_stats);
  var quickplay_sankey = null;
  if (quickplay_stats) {
    const playtime_array = createPlaytimeArray(quickplay_stats);
    const data = convertToNodesLinks(playtime_array);
    console.log(data);
    quickplay_sankey = Sankey({width: WIDTH, height: HEIGHT, data: data});
  }
  return  (
            <>
              {quickplay_sankey ? "Quickplay Playtime" : null}
              {quickplay_sankey}
              {comp_sankey ? "Competitive Playtime" : null}
              {comp_sankey}
            </>
          )
}

const Sankey = ({ width, height, data }: SankeyProps) => {
  const allGroups = [...new Set(data.nodes.map((d) => d.category))].sort();
  const colorScale = scaleOrdinal<string>().domain(allGroups).range(COLORS);

  // Set the sankey diagram properties
  const sankeyGenerator = sankey<NodeData, LinkData>() // TODO: find how to type the sankey() function
    .nodeWidth(26)
    .nodePadding(10)
    .extent([
      [MARGIN_X, MARGIN_Y],
      [width - MARGIN_X, height - MARGIN_Y],
    ])
    .nodeId((node) => node.name) // Accessor function: how to retrieve the id that defines each node. This id is then used for the source and target props of links
    .nodeAlign(sankeyJustify); // Algorithm used to decide node position

  // Compute nodes and links positions
  const { nodes, links } = sankeyGenerator(data);

  //
  // Draw the nodes
  //
  const allNodes = nodes.map((node) => {
    return (
      <g key={node.index}>
        <rect
          height={node.y1! - node.y0!}
          width={sankeyGenerator.nodeWidth()}
          x={node.x0}
          y={node.y0}
          stroke={"black"}
          fill={colorScale(node.category)}
          fillOpacity={1}
          rx={0.9}
        />
      </g>
    );
  });

  //
  // Draw the links
  //
  const allLinks = links.map((link, i) => {
    const linkGenerator = sankeyLinkHorizontal();
    const path = linkGenerator(link);

    return (
      <path
        key={i}
        d={path!}
        stroke={colorScale(link.source)}
        fill="none"
        strokeOpacity={0.3}
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