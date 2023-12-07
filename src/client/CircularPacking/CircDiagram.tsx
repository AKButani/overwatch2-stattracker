import * as d3 from "d3"; // we will need d3.js
import { HEROES_KEYS, PlayerCareer, Role} from "../types";
import { useSpring, animated, SpringValue } from "react-spring";
import {useState} from "react";
import { getHeroRole } from "../helperFunctions";
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
  "mauga",
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


const getRoleColor = (role:Role): string => {
  const colorMap: Record<string, string> = {
    tank: "blue",
    damage: "red",
    support: "gold"
  }
  return colorMap[role] || 'rgba(255, 255, 255, 1)';
}

const getHeroColor = (hero: HEROES_KEYS): string => {
  // Define your color mapping here
  const role = getHeroRole(hero);

  if(role == ""){
    return "black";
  }
  return getRoleColor(role);
};

export type CircularPackingProps = {
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
export const CircDiagram = (props:{ width: number, height:number, data:PlayerCareer, valueFunction: (data: PlayerCareer, hero: HEROES_KEYS) => number}) => {
  
  //build data structure the data    
  const graphData : Tree= {
      type: 'node',
      name: 'boss',
      value: 2300,
      children: heroes.map((hero) => ({
        type: 'leaf',
        name: hero.toUpperCase(),
        value: props.valueFunction(props.data, hero),
      }))
  }

  // build the hierarchy object
  const hierarchy = d3
    .hierarchy(graphData)
    .sum((d) => d.value)
    .sort((a, b) => b.value! - a.value!);
    
  const packGenerator = d3.pack<Tree>().size([props.width, props.height]).padding(4);
  const root = packGenerator(hierarchy as d3.HierarchyNode<Tree>);
  console.log("root", root);

  
  return (
    <svg width={props.width} height={props.height} style={{ display: "inline-block" }}>
      {root
        .descendants()
        .slice(1)
        .map((node) => (
          <AnimatedCircle
            key={node.data.name}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={getHeroColor((node.data.name as string).toLocaleLowerCase() as HEROES_KEYS)}
            fillOpacity={0.5}
          />
        ))}
        {root
        .descendants()
        .slice(1)
        .map((node) => (
          <AnimatedImage
            key={node.data.name}
            x={node.x - node.r}
            y={node.y - node.r}
            width={node.r * 2}
            height={node.r * 2}
            href={"/Images/heroes/"+ node.data.name.toLocaleLowerCase() +".png"}
            style={{ clipPath: 'circle()' }}
          />
        ))}
    </svg>
  );
};

const AnimatedCircle = ({
  cx,
  cy,
  r,
  ...props
}: React.SVGAttributes<SVGCircleElement>) => {

  const [isHover, setIsHover] = useState(false);
  const handleMouseHover = () => {
    setIsHover(true);
  };
  const handleMouseOut = () => {
    setIsHover(false);
  };
  const animatedProps = useSpring({
    cx,
    cy,
    r,
  });

  return (
    <animated.circle
      {...props}
      r={r}
      cx={animatedProps.cx as any}
      cy={animatedProps.cy as any}
      onMouseOver={handleMouseHover}
      onMouseLeave={handleMouseOut}
      viewBox={""}
      stroke={isHover ? "rgba(255, 255, 255, 1)": "rgba(0, 0, 0, 1)"}
      strokeWidth={isHover ? 8: 2}
      pointerEvents="all"
    />
  );
};

const AnimatedImage = ({
  x,
  y,
  width,
  height,
  href,
  style,
  ...props
}:({x:number; y:number; width:number; height:number; href:string, style:{ clipPath: string; }})) => {
  const animatedProps = useSpring({
    x,
    y,
    width,
    height,
    style,
  });

  return( <animated.image 
        {...props} 
        x={animatedProps.x} 
        y={animatedProps.y} 
        width={animatedProps.width} 
        height={animatedProps.height} 
        style={{ clipPath: 'circle()' }}
        pointerEvents="none"
        href={href} 
        />
        
  )
};
