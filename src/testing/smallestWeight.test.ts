import { smallestWeight } from "../getShortestRoute";

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
const testArr = ["WATFORD", "EUSTON"];

describe("suite of tests for smallestWeight", () => {
  test("name of node with smallest distance from origin shoud be returned", () => {
    expect(smallestWeight(testArr, testMap)).toStrictEqual("WATFORD");
  });
});
