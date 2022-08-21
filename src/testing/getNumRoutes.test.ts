import { map } from "./map";

describe("suite of tests for getNumRoutes", () => {
  test("the correct number of routes is returned", () => {
    expect(map.getNumRoutes()).toStrictEqual(19228);
  });
});
