import { createRailwayMap } from "./createRailwayMap";

const map = createRailwayMap();

describe("suite of tests for getNumStations", () => {
  test("number of stations in database is returned", () => {
    expect(map.getNumStations()).toStrictEqual(8302);
  });
});
