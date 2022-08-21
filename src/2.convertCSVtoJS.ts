import path from "path";
import { readFileSync } from "fs";
import { Route } from "./typing";

export function convertCSVtoJS(fileName: string): Route[] {
  const filePath = path.join(__dirname, fileName);
  const csvArray = readFileSync(filePath).toString().split("\r\n");

  //create empty array for data
  const dataArr: Route[] = [];

  //start loop from 1 to avoid headers
  for (let idx = 1; idx < csvArray.length; idx++) {
    //current row
    const node = csvArray[idx];
    //current row as array
    const arrayOfValues = node.split(",");
    //account for rogue blank lines
    if (arrayOfValues !== undefined) {
      //add 1 to the distance to avoid 0 distance errors
      const data = {
        origin: arrayOfValues[0],
        destination: arrayOfValues[1],
        distance: parseFloat(arrayOfValues[2]),
      };
      //only push if there are no duplicates in the array already
      const duplicates = dataArr.filter(
        (dataPoint) =>
          dataPoint.destination === data.destination &&
          dataPoint.origin === data.origin &&
          dataPoint.distance === data.distance,
      );
      if (duplicates.length < 1) {
        dataArr.push(data);
      }
    }
  }
  return dataArr;
}
