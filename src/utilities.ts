import {GoogleBusiness, YelpBusiness} from "./types";

export const joinDataSources = (res: [{businesses: Array<YelpBusiness>}, {results: Array<GoogleBusiness>}]) => {
  const yelpResults = res[0].businesses;
  const googleResults = res[1].results;
  const resultMap = fillMapWithYelpData(yelpResults)

  return createdJoinedMapWithGoogleData(googleResults, resultMap);
}

export const fillMapWithYelpData = (yelpResults: Array<YelpBusiness>) => {
  const resultMap = new Map();
  for (let i = 0; i < yelpResults.length; i++) {
    if(yelpResults[i].location.address1?.length > 0){
      resultMap.set(yelpResults[i].location.address1, [yelpResults[i]]);
    }
  }
  return resultMap;
}

export const createdJoinedMapWithGoogleData = (googleResults: Array<GoogleBusiness>, resultMap: Map<string, Array<YelpBusiness>>) => {
  const joinedMap = new Map();

  for (let j = 0; j < googleResults.length; j++) {
    const firstPartAddress = googleResults[j].vicinity.split(",")[0];
    if(resultMap.has(firstPartAddress)){
      const currentBizArr = resultMap.get(firstPartAddress);
      console.log(currentBizArr, "!?!")
      if (currentBizArr?.length) {
        joinedMap.set(firstPartAddress, [...currentBizArr, googleResults[j]]);
      }
    }
  }
  return joinedMap;
}
