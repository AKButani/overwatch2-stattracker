import * as d3 from "d3"; // we will need d3.js
import { HEROES_KEYS, PlayerCareer } from "../types";
const heroes: HEROES_KEYS[] = [
  "ana",
  "ashe",
  "baptiste",
  "bastion",
  "brigitte",
  "cassidy",
  "dva",
  "doomfist",
  "echo",
  "genji",
  "hanzo",
  "junker-queen",
  "junkrat",
  "kiriko",
  "lucio",
  "mei",
  "mercy",
  "moira",
  "orisa",
  "pharah",
  "ramattra",
  "reaper",
  "reinhardt",
  "roadhog",
  "sigma",
  "sojourn",
  "soldier-76",
  "sombra",
  "symmetra",
  "torbjorn",
  "tracer",
  "widowmaker",
  "winston",
  "wrecking-ball",
  "zarya",
  "zenyatta",
];

type CircularPackingProps = {
  width: number;
  height: number;
  data: PlayerCareer;
  valueFunction: (data: PlayerCareer, hero: HEROES_KEYS) => number;
};
type TreeNode = {
  type: 'node';
  value: number;
  name: string;
  children: Tree[];
};
type TreeLeaf = {
  type: 'leaf';
  name: string;
  value: number;
};
type Tree = TreeNode | TreeLeaf;
export const CircDiagram = ({ width, height, data, valueFunction }: CircularPackingProps) => {
    
  //build data structure the data    
  const graphData : Tree= {
      type: 'node',
      name: 'boss',
      value: 2300,
      children: heroes.map((hero) => ({
        type: 'leaf',
        name: hero.toUpperCase(),
        value: valueFunction(data, hero),
      }))
  }

  // build the hierarchy object
  const hierarchy = d3
    .hierarchy(graphData)
    .sum((d) => d.value)
    .sort((a, b) => b.value! - a.value!);
  const packGenerator = d3.pack<Tree>().size([width, height]).padding(4);
  const root = packGenerator(hierarchy as d3.HierarchyNode<Tree>);
  console.log("root", root);

  
  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      {root
        .descendants()
        .slice(1)
        .map((node) => (
          <circle
            key={node.data.name}
            cx={node.x}
            cy={node.y}
            r={node.r}
            stroke="#553C9A"
            strokeWidth={2}
            fill="#B794F4"
            fillOpacity={0.2}
          />
        ))}
      {root
        .descendants()
        .slice(1)
        .map((node) => (
          <text
            key={node.data.name}
            x={node.x}
            y={node.y}
            fontSize={13}
            fontWeight={0.4}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {node.data.name}
          </text>
        ))}
        {root
        .descendants()
        .slice(1)
        .map((node) => (
          <image
            key={node.data.name}
            x={node.x - node.r}
            y={node.y - node.r}
            width={node.r * 2}
            height={node.r * 2}
            href={"./public/Images/heroes/"+ node.data.name.toLocaleLowerCase() +".png"}
          />
        ))}
    </svg>
  );
};

