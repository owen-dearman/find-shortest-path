export interface Railway {
  getNumStations: () => number;
  getNumRoutes: () => number;
  getListOfStations: () => string[];
  findShortestRoute: (arg0: string, arg1: string) => ShortestRoute;
}

export type Route = {
  originStation: string;
  destinationStation: string;
  distance: number;
};

export type RouteMap = {
  [key: string]: {
    name: string;
    routes: OnwardsRoute[];
    weight: number;
  };
};

export type OnwardsRoute = { destination: string; weight: number };

export type ShortestRoute = {
  distance: number;
  nodes: string[];
  numTracks: number;
};
