import { findNodesWithRouteToLocation } from "../6.findPointsAlongShortestRoute";

const testMap = {
  WATFORD: {
    routes: [
      { origin: "WATFORD", destination: "EUSTON", distance: 25 },
      { origin: "WATFORD", destination: "GARSTON", distance: 2 },
    ],
    weight: 0,
  },
  EUSTON: {
    routes: [
      { origin: "EUSTON", destination: "WATFORD", distance: 25 },
      { origin: "EUSTON", destination: "GARSTON", distance: 27 },
    ],
    weight: 25,
  },
};

describe("suite of tests for findNodesWithRouteToLocation", () => {
  test("array of routes returned with that end at specified station", () => {
    expect(findNodesWithRouteToLocation("GARSTON", testMap)).toStrictEqual([
      { origin: "WATFORD", destination: "GARSTON", distance: 2 },
      { origin: "EUSTON", destination: "GARSTON", distance: 27 },
    ]);
    expect(findNodesWithRouteToLocation("WATFORD", testMap)).toStrictEqual([
      { origin: "EUSTON", destination: "WATFORD", distance: 25 },
    ]);
  });
});
