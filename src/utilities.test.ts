import {googleData, yelpTestData} from "./testData";
import {createdJoinedMapWithGoogleData, fillMapWithYelpData} from "./utilities";

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
