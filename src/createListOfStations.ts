import { Route } from "./typing";

export function createListOfStations(data: Route[]): string[] {
  const stationArr: string[] = [];

  for (const node of data) {
    const isInArr = stationArr.includes(node.originStation);
    if (!isInArr) {
      stationArr.push(node.originStation);
    }
  }
  return stationArr;
}
