import { RouteMap } from "./typing";

export function findPointsAlongShortestRoute(
  start: string,
  end: string,
  nodes: RouteMap,
): { nodesOnRoute: string[]; numTracks: number } {
  let nodesOnRoute: string[] = [];
  let currentNode = end;
  while (currentNode !== start) {
    nodesOnRoute.push(currentNode);
    let minWeight = Infinity;
    for (const route of nodes[currentNode].routes) {
      //current onwards route's distance from origin + the distance to that routes destination
      const cumulativeWeight = route.weight + nodes[route.destination].weight;
      //pick the shortest onwards route from the origin each time
      if (cumulativeWeight < minWeight) {
        minWeight = cumulativeWeight;
        currentNode = route.destination;
      }
    }
  }
  const numTracks = nodesOnRoute.length;
  nodesOnRoute.push(start);
  nodesOnRoute = nodesOnRoute.reverse();
  return { nodesOnRoute: nodesOnRoute, numTracks: numTracks };
}
