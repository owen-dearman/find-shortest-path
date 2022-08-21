import { Route } from "./typing";
import { findPointsAlongShortestRoute } from "./findPointsAlongShortestRoute";
import { RouteMap, ShortestRoute } from "./typing";
import { buildMapFromOrigin } from "./buildGraph";

export function getShortestRoute(
  origin: string,
  destination: string,
  data: Route[],
): ShortestRoute {
  //created map of connected nodes. Origin has weight of 0, all others have weight of Infinity
  //ALL nodes are present in unvisitedNodes
  const { nodes, unvisitedNodes } = buildMapFromOrigin(origin, data);

  while (unvisitedNodes.length > 0) {
    //Step 1: Find the smallest weighted node that hasn't been visited (node A)
    const currentNode = nodes[smallestWeight(unvisitedNodes, nodes)];

    //Step 1.5: If node A is the destination, then break the loop as paths to this point have been found
    if (currentNode.name === destination) {
      break;
    }

    //Step 2: For each of the onward connected nodes of that node (node B), calculate B's distance from the origin (O) by travelling through node A
    for (const route of currentNode.routes) {
      const destinationName = route.destination;
      const cumulativeWeight = currentNode.weight + route.weight;
      const existingWeight = nodes[destinationName].weight;
      //Step 3: If O -> A -> B distance is shorter than any calculated distance for B so far, then update B's distance from O to this distance
      if (cumulativeWeight < existingWeight) {
        nodes[destinationName].weight = cumulativeWeight;
      }
    }
    //Step 4: Remove node A from univisitedNodes. Provided there are still nodes in unvisitedNodes, this process loops until the destination is found, or all nodes are visited
    const idx = unvisitedNodes.findIndex((node) => node === currentNode.name);
    unvisitedNodes.splice(idx, 1);
  }

  //retrieve distance from O to destination
  const distanceToDestination = nodes[destination].weight;
  //track back along the shortest route to find which nodes it passes through
  const { nodesOnRoute, numTracks } = findPointsAlongShortestRoute(
    origin,
    destination,
    nodes,
  );
  return {
    distance: parseFloat(((distanceToDestination - numTracks) * 0.001).toFixed(3)),
    // distance: distanceToDestination * 0.001,
    nodes: nodesOnRoute,
    numTracks: numTracks,
  };
}

function smallestWeight(arr: string[], nodeMap: RouteMap): string {
  let smallestNode = nodeMap[arr[0]];
  for (const node of arr) {
    if (nodeMap[node].weight < smallestNode.weight) {
      smallestNode = nodeMap[node];
    }
  }
  return smallestNode.name;
}
