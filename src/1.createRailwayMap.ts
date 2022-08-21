import { convertCSVtoJS } from "./2.convertCSVtoJS";
import { createListOfTiplocs } from "./3.createListOfTiplocs";
import { getShortestRoute } from "./4.getShortestRoute";
import { Railway, Route, ShortestRoute } from "./typing";

/**
 *
 * @returns functions as the basis of querying the railway infratsructure
 */

export function createRailwayMap(): Railway {
  //pull in the data from the CSV file. In this way, this step only has to be done once for multiple searches.
  const railwayData: Route[] = convertCSVtoJS("tracks.csv");

  //returns list of unique TIPLOCs in alphabetical order
  const tiplocArr = createListOfTiplocs(railwayData);

  //number of routes in the data
  function getNumRoutes(): number {
    return railwayData.length;
  }

  //list of all TIPLOCs in the data
  function getListOfTiplocs(): string[] {
    return tiplocArr;
  }

  //number of TIPLOCS in the data
  function getNumTiplocs(): number {
    return tiplocArr.length;
  }

  //return the shortest route between two TIPLOCS
  function findShortestRoute(
    origin: string,
    destination: string,
  ): ShortestRoute {
    return getShortestRoute(
      origin.toUpperCase(),
      destination.toUpperCase(),
      railwayData,
    );
  }

  return {
    getNumRoutes,
    getListOfTiplocs,
    getNumTiplocs,
    findShortestRoute,
  };
}
