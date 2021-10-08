import {getYelpResults} from "./yelpService";
import {getGoogleRestaurantResults, getSearchQueryPrediction} from "./googleMapService";
import {iterateOverYelpMap, joinDataSources, joinTwoMaps} from "../utilities";
import {
  GoogleBusiness, JoinedDataAndUnMatchedData, JoinedYelpGoogleData,
  PromiseAllGetAllYelpAndGoogleResults, UnMatchedYelpMap,
  YelpBusiness
} from "../types";

export const callYelpAndGoogle = (
  setLoading: (a: boolean) => void,
  setPrediction: React.Dispatch<React.SetStateAction<never[]>>,
  setSearchResults: (a: Map<string, Array<YelpBusiness | GoogleBusiness>>) => void,
  searchTerm: string,
  latLongSelectedCity: Array<string>,
) => {
  setLoading(true);
  let prev: any;
  Promise.all([
    getYelpResults(searchTerm, latLongSelectedCity[0], latLongSelectedCity[1]),
    getGoogleRestaurantResults(`${latLongSelectedCity[1]},${latLongSelectedCity[0]}`, searchTerm)
  ])
    .then(
      (res: PromiseAllGetAllYelpAndGoogleResults) =>
        handleZeroResultsOrContinueWithJoin(res, latLongSelectedCity, setPrediction, searchTerm))
    .then((mapResult: JoinedDataAndUnMatchedData) => {
      setSearchResults(mapResult.joinedDataMap);
      prev = mapResult.joinedDataMap;
      return mapResult.unMatchedMap;
    })
    .then((unMatchedData: UnMatchedYelpMap) => iterateOverYelpMap(unMatchedData))
    .then((moreJoinedData: JoinedYelpGoogleData) => {
      const newDataState = joinTwoMaps(prev, moreJoinedData);
      setSearchResults(newDataState);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err, "Failure in CallYelpAndGoogle ")
    })
}

const handleZeroResultsOrContinueWithJoin = (
  res: PromiseAllGetAllYelpAndGoogleResults,
  latLongSelectedCity: Array<string>,
  setPrediction: React.Dispatch<React.SetStateAction<never[]>>,
  searchTerm: string,
) => {
  if (res[0].total === 0 || res[1].status === "ZERO_RESULTS") {
    getSearchQueryPrediction(`${latLongSelectedCity[1]},${latLongSelectedCity[0]}`, searchTerm)
      .then((res) => {
        if (res.status === "OK") {
          setPrediction(res.predictions);
        }
      })
  }
  return joinDataSources(res);
}
