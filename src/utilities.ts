import {
  GoogleBusiness,
  YelpBusiness,
  JoinedDataAndUnMatchedData,
  UnMatchedYelpMap,
  JoinedYelpGoogleData, PromiseAllGetAllYelpAndGoogleResults
} from "./types";
import {getGoogleDetail, getIndividualGoogleRestaurant} from "./service/googleMapService";

export const joinDataSources =
  (res: PromiseAllGetAllYelpAndGoogleResults) : Promise<JoinedDataAndUnMatchedData> => {
  const yelpResults = res[0].businesses;
  const googleResults = res[1].results;
  const resultMap = fillMapWithYelpData(yelpResults)

  return createdJoinedMapWithGoogleData(googleResults, resultMap);
}

export const fillMapWithYelpData = (yelpResults: Array<YelpBusiness>) => {
  const resultMap = new Map();
  for (let i = 0; i < yelpResults?.length; i++) {
    if (yelpResults[i].location.address1?.length > 0) {
      resultMap.set(yelpResults[i].location.address1, [yelpResults[i]]);
    }
  }
  return resultMap;
}

export const createdJoinedMapWithGoogleData =
  async (googleResults: Array<GoogleBusiness>, resultMap: Map<string, Array<YelpBusiness>>): Promise<JoinedDataAndUnMatchedData> => {
  const joinedMap = new Map();
  for (let j = 0; j < googleResults?.length; j++) {
    const firstPartAddress = googleResults[j].vicinity.split(",")[0];
    if (resultMap.has(firstPartAddress)) {
      const currentBizArr = resultMap.get(firstPartAddress);
      resultMap.delete(firstPartAddress);
      if (currentBizArr?.length) {
        await getGoogleDetail(googleResults[j].place_id).then(r => {
          joinedMap.set(firstPartAddress, [...currentBizArr, r.result]);
        });
      }
    }
  }

  return {
    joinedDataMap: joinedMap,
    unMatchedMap: resultMap,
  };
}

export const createReadableUrl = (fullUrl: String) => {
  const matches = fullUrl.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  const domain =  matches && matches[1]
  if(domain && domain?.length > 0 && domain.startsWith("www.")){
    return domain.slice(4);
  }
  return domain;
}

export const iterateOverYelpMap = async (yelpMap: UnMatchedYelpMap) : Promise<JoinedYelpGoogleData> => {
  const joinedMap = new Map();
  for (const [mapKey, yelpData] of yelpMap) {
    const fullAddress = ` ${yelpData[0].name} ${yelpData[0].location.address1}`;
    await getIndividualGoogleRestaurant(fullAddress).then((res) =>{
      if(res?.candidates.length > 0){
        getGoogleDetail(res.candidates[0].place_id).then(googleBiz => {
          joinedMap.set(mapKey, [yelpData[0], googleBiz.result])
        })
      }
    })
  }

  return joinedMap;
}

export const joinTwoMaps = (map1: JoinedYelpGoogleData, map2: JoinedYelpGoogleData):  JoinedYelpGoogleData=> {
  const comboMap = new Map();

  map1.forEach((value, key) => comboMap.set(key, value));
  map2.forEach((value, key) => comboMap.set(key, value));

  return comboMap;
}
