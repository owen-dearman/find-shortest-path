import { map } from "./map";

describe("suite of tests for getNumTiplocs", () => {
  test("the correct number of tiplocs is returned", () => {
    expect(map.getNumTiplocs()).toStrictEqual(8302);
  });
});
