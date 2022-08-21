import { OnwardsRoute, Route, RouteMap } from "./typing";

export function buildMapFromOrigin(
  origin: string,
  data: Route[],
): { nodes: RouteMap; unvisitedNodes: string[] } {
  const nodes = createDefaultMap(data);
  const unvisitedNodes: string[] = [];

  //set up the weights based on starting point
  for (const station in nodes) {
    if (nodes[station].name === origin) {
      nodes[station].weight = 0;
    } else {
      nodes[station].weight = Infinity;
    }
    unvisitedNodes.push(nodes[station].name);
  }
  return { nodes, unvisitedNodes };
}

function createDefaultMap(data: Route[]) {
  const mapOfRoutes = {} as RouteMap;
  for (const node of data) {
    const routeDestinations: OnwardsRoute[] = [];
    //get all onward routes from the current node
    const arrayOfOnwardsRoutes = filterForOnwardsRoutes(node, data);
    //for each onward route from the current node, push it into routeDestinations
    arrayOfOnwardsRoutes.forEach((route) => {
      routeDestinations.push({
        destination: route.destinationStation,
        weight: route.distance + 1,
      });
    });
    //create a node in the graph for each data point, containing its name, connected nodes, and a default distance from the origin
    mapOfRoutes[node.originStation] = {
      name: node.originStation,
      routes: removeDuplicates(routeDestinations),
      // routes: routeDestinations,
      weight: 1,
    };
  }
  return mapOfRoutes;
}

function removeDuplicates(nodes: OnwardsRoute[]): OnwardsRoute[] {
  const reducedNodeArr: OnwardsRoute[] = [];
  for (const n of nodes) {
    if (
      reducedNodeArr.filter((x) => x.destination === n.destination).length < 1
    ) {
      reducedNodeArr.push(n);
    }
  }
  return reducedNodeArr;
}

function filterForOnwardsRoutes(
  currentStation: Route,
  databaseOfStations: Route[],
): Route[] {
  const currentStationName = currentStation.originStation;
  //return array of stations with a starting point or ending point of the same name as the current station
  const onwardsRoutes = databaseOfStations.filter(
    (track) =>
      track.originStation === currentStationName
  );
  // || track.destinationStation === currentStationName,
  const formattedReturnRoutes = formatReturnRoutes(
    onwardsRoutes,
    currentStationName,
  );
  return onwardsRoutes.concat(formattedReturnRoutes);
}

function formatReturnRoutes(routes: Route[], nodeName: string): Route[] {
  const formattedRoutes: Route[] = [];
  for (const route of routes) {
    if (route.destinationStation === nodeName) {
      const formattedRoute: Route = {
        originStation: route.destinationStation,
        destinationStation: route.originStation,
        distance: route.distance,
      };
      formattedRoutes.push(formattedRoute);
    }
  }
  return formattedRoutes;
}
