import { filterForOnwardsRoutes } from "../5.buildGraph";
import { Route } from "../typing";

const testMap: Route[] = [
  { origin: "WATFORD", destination: "EUSTON", distance: 25 },
  { origin: "EUSTON", destination: "WATFORD", distance: 25 },
  { origin: "EUSTON", destination: "WEMBlEY", distance: 10 },
  { origin: "WATFORD", destination: "GARSTON", distance: 2 },
];

describe("suite of tests for filterForOnwardRoutes", () => {
  test("routes with an origin equal to tiploc are returned", () => {
    expect(filterForOnwardsRoutes("EUSTON", testMap)).toStrictEqual([
      { origin: "EUSTON", destination: "WATFORD", distance: 25 },
      { origin: "EUSTON", destination: "WEMBlEY", distance: 10 },
    ]);
    expect(filterForOnwardsRoutes("WATFORD", testMap)).toStrictEqual([
      { origin: "WATFORD", destination: "EUSTON", distance: 25 },
      { origin: "WATFORD", destination: "GARSTON", distance: 2 },
    ]);
    expect(filterForOnwardsRoutes("WEMBLEY", testMap)).toStrictEqual([]);
  });
});
