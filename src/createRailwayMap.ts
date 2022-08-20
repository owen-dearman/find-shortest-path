import { convertCSVtoJS } from "./convertCSVtoJS";
import { createListOfStations } from "./createListOfStations";
import { getShortestRoute } from "./getShortestRoute";
import { Railway, Route, ShortestRoute } from "./typing";

export function createRailwayMap(): Railway {
  //pull in the data
  const railwayData: Route[] = convertCSVtoJS("tracks.csv");
  const stationArr = createListOfStations(railwayData);

  function getNumRoutes(): number {
    return railwayData.length;
  }

  function getListOfStations(): string[] {
    return stationArr;
  }

  function getNumStations(): number {
    return stationArr.length;
  }

  function findShortestRoute(
    origin: string,
    destination: string,
  ): ShortestRoute {
    return getShortestRoute(origin, destination, railwayData);
  }

  return {
    getNumRoutes,
    getListOfStations,
    getNumStations,
    findShortestRoute,
  };
}
