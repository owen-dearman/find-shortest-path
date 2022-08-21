import { createListOfTiplocs } from "../3.createListOfTiplocs";

describe("suite of tests for createListOfTiplocs", () => {
  test("array of tiploc names is returned", () => {
    expect(
      createListOfTiplocs([
        { origin: "EUSTON", destination: "WATFORD", distance: 25 },
        { origin: "WATFORD", destination: "EUSTON", distance: 25 },
      ]),
    ).toStrictEqual(["EUSTON", "WATFORD"]);
  });
  test("duplicates are not included", () => {
    expect(
      createListOfTiplocs([
        { origin: "EUSTON", destination: "WATFORD", distance: 25 },
        { origin: "WATFORD", destination: "EUSTON", distance: 25 },
        { origin: "WATFORD", destination: "GARSTON", distance: 2 },
      ]),
    ).toStrictEqual(["EUSTON", "WATFORD"]);
  });
});
