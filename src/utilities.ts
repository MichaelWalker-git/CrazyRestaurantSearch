import {GoogleBusiness, YelpBusiness} from "./types";

export const joinDataSources = (res: [{businesses: Array<YelpBusiness>}, {results: Array<GoogleBusiness>}]) => {
  const resultMap = new Map();
  const joinedMap = new Map();
  const yelpResults = res[0].businesses;
  const googleResults = res[1].results;
  for (let i = 0; i < yelpResults.length; i++) {
    if(yelpResults[i].location.address1?.length > 0){
      resultMap.set(yelpResults[i].location.address1, [yelpResults[i]]);
    }
  }
  for (let j = 0; j < googleResults.length; j++) {
    const firstPartAddress = googleResults[j].vicinity.split(",")[0];
    if(resultMap.has(firstPartAddress)){
      const currentBizArr = resultMap.get(firstPartAddress);
      joinedMap.set(firstPartAddress, [...currentBizArr, googleResults[j]]);
    }
  }
  return joinedMap;
}
