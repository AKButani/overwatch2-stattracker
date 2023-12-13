import { HEROES_KEYS, PlayerCareer, comparisonCategory, mode, platform} from "../types";
export type valueFunction = ((data:PlayerCareer, hero:HEROES_KEYS) => number | string);
export type getDisplayValueFunction = ((value:number) => string);