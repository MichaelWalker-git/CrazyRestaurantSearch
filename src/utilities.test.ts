import {googleData, yelpTestData} from "./testData";
import {createdJoinedMapWithGoogleData, createReadableUrl, fillMapWithYelpData} from "./utilities";

test('fillMapWithYelpData utility', () => {
  const result = fillMapWithYelpData(yelpTestData);
  const actualResultMap = new Map();
  actualResultMap.set("41 Franklin St", yelpTestData);

  expect(result).toEqual(actualResultMap);
});

test('fillMapWithYelpData utility - empty', () => {
  const result = fillMapWithYelpData([]);
  const actualResultMap = new Map();

  expect(result).toEqual(actualResultMap);
});

test('createdJoinedMapWithGoogleData utility', () => {
  const yelpMap = fillMapWithYelpData(yelpTestData);
  const actualResultMap = new Map();
  actualResultMap.set("41 Franklin St", [...yelpTestData, ...googleData]);

  const result = createdJoinedMapWithGoogleData(googleData, yelpMap);

  expect(result).toEqual(actualResultMap);
});


test('createdJoinedMapWithGoogleData utility - empty', () => {
  const yelpMap = new Map();

  const result = createdJoinedMapWithGoogleData(googleData, yelpMap);
  const actualResultMap = new Map();

  expect(result).toEqual(actualResultMap);
});

describe("createReadableUrl for Body Page", () => {
  test('createReadableUrl utility - http + no wwww', () => {
    const expectedResult = "richtablesf.com";
    expect(createReadableUrl("http://richtablesf.com/")).toEqual(expectedResult);
  });


  test('createReadableUrl utility - http + wwww', () => {
    const expectedResult = "zunicafe.com";
    expect(createReadableUrl("http://www.zunicafe.com/")).toEqual(expectedResult);
  });

  test('createReadableUrl utility + https + www', () => {
    const expectedResult = "nightbirdrestaurant.com";
    expect(createReadableUrl("https://www.nightbirdrestaurant.com/")).toEqual(expectedResult);
  });

  test('createReadableUrl utility - https + no www', () => {
    const expectedResult = "developer.mozilla.org";
    expect(createReadableUrl("https://developer.mozilla.org/en-US/docs/Web/API/URL/hostname")).toEqual(expectedResult);
  });


})
