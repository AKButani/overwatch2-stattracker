import * as d3 from "d3"; // we will need d3.js
import { HEROES_KEYS, PlayerCareer } from "../types";
import { useSpring, animated, SpringValue } from "react-spring";
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
  const animatedProps = useSpring({
    cx,
    cy,
    r,
  });
  return (
    <animated.circle
      {...props}
      r={animatedProps.r as any}
      cx={animatedProps.cx as any}
      cy={animatedProps.cy as any}
      viewBox={""}
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
        href={href} />
        
  )
};
