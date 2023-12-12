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
  
  const initialHeroHoverState: Record<HEROES_KEYS, boolean> = heroes.reduce(
    (acc, hero) => ({ ...acc, [hero]: false }),
    {} as Record<HEROES_KEYS, boolean>
  );
  const [heroHoverState, setHeroHoverState] = useState<Record<HEROES_KEYS, boolean>>(initialHeroHoverState);
  
  return (
    <svg width={props.width} height={props.height} style={{ display: "inline-block" }}>
      {root
        .descendants()
        .slice(1)
        .map((node) => (
          <AnimatedCircle
            key={node.data.name}
            hero = {node.data.name}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={"black"}
            fillOpacity={0.5}
            heroHoverState = {setHeroHoverState}
            isHover = {heroHoverState}
          />
        ))}
        {root
        .descendants()
        .slice(1)
        .map((node) => (
          <AnimatedImage
            key={node.data.name}
            hero={node.data.name}
            x={node.x - node.r}
            y={node.y - node.r}
            width={node.r * 2}
            height={node.r * 2}
            href={"/Images/heroes/"+ node.data.name.toLocaleLowerCase() +".png"}
            style={{ clipPath: 'circle()' }}
            heroHoverState = {setHeroHoverState}
            isHover = {heroHoverState}
            
          />
        ))}

        {root
        .descendants()
        .slice(1)
        .map((node) => (
          <AnimatedText
          fon
            key={node.data.name}
            hero={node.data.name}
            x={node.x}
            y={node.y}
            fontSize={13}
            fontWeight={0.1}
            textAnchor="middle"
            alignmentBaseline="middle"
            heroHoverState = {setHeroHoverState}
            isHover = {heroHoverState}
          >
            {node.value}
          </AnimatedText>
        ))}
    </svg>
  );
};




const AnimatedCircle = ({
  key,
  hero,
  cx,
  cy,
  r,
  heroHoverState,
  isHover,
  ...props
}) => {

  const initialHoverState: Record<HEROES_KEYS, boolean> = heroes.reduce(
    (acc, hero) => ({ ...acc, [hero]: false }),
    {} as Record<HEROES_KEYS, boolean>
  );
  const newHoverState = initialHoverState;
  newHoverState[hero as HEROES_KEYS] = true;
  const handleMouseHover = () => {
    heroHoverState(newHoverState);
  };
  const handleMouseOut = () => {
    heroHoverState(initialHoverState);
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
      stroke={isHover[hero as HEROES_KEYS] ? "rgba(255, 255, 255, 1)": "rgba(0, 0, 0, 1)"}
      strokeWidth={isHover[hero as HEROES_KEYS] ? 8: 2}
      pointerEvents="all"
    />
  );
};

const AnimatedImage = ({
  x,
  y,
  hero,
  width,
  height,
  href,
  style,
  heroHoverState,
  isHover,
  ...props
}) => {
  const animatedProps = useSpring({
    x,
    y,
    width,
    height,
    style,
    ...props
  });

  return( <animated.image 
        {...props} 
        x={animatedProps.x} 
        y={animatedProps.y} 
        width={animatedProps.width} 
        height={animatedProps.height}
        style={isHover[hero] ? {clipPath: 'circle()', opacity: 0.2} : {clipPath: 'circle()'}}
        pointerEvents="none"
        href={href} 
        />
        
  )
};

const AnimatedText = ({
  x,
  y,
  hero,
  heroHoverState,
  isHover,
  ...props
}) => 
{
  const initialHoverState: Record<HEROES_KEYS, boolean> = heroes.reduce(
    (acc, hero) => ({ ...acc, [hero]: false }),
    {} as Record<HEROES_KEYS, boolean>
  );
  const newHoverState = initialHoverState;
  newHoverState[hero as HEROES_KEYS] = true;
  const handleMouseHover = () => {
    heroHoverState(newHoverState);
  };
  const handleMouseOut = () => {
    heroHoverState(initialHoverState);
  };
  const animatedProps = useSpring({
    x,
    y,
  });
  return (
    <animated.text
      {...props}
      onMouseOver={handleMouseHover}
      onMouseLeave={handleMouseOut}
      x={animatedProps.x as any}
      y={animatedProps.y as any}
      style= {isHover[hero] ? {opacity:1} : {opacity:0}}
      fill="white"
    />
  );
};

