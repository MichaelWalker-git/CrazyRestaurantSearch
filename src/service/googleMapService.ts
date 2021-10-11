import {GoogleNearByResponse, PromiseWithCancel} from "../types";

export const getLocationAutoComplete = async (locationText: string) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/autocomplete/json?input=${locationText}&types=(cities)&key=${process.env.REACT_APP_GOOGLE_API}`);
    return res.json();
  } catch (error) {
    console.error("getLocationAutoComplete", error);
  }
}

export const getLatLong = async (locationQuery: string) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/textsearch/json?query=${locationQuery}&key=${process.env.REACT_APP_GOOGLE_API}`);
    return res.json();
  } catch (error) {
    console.error("getLatLong", error);
  }
}

export const getGoogleRestaurantResults = async (latLong: string, query: string):  Promise<GoogleNearByResponse> => {
  try {
    const res = await fetch(`${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/nearbysearch/json?keyword=${query}&location=${latLong}&radius=${process.env.REACT_APP_DEFAULT_RADIUS_METERS}&key=${process.env.REACT_APP_GOOGLE_API}`);
    return res.json();
  } catch (error) {
    console.error("getGoogleRestaurantResults", error);
    return error;
  }
}

export const getGoogleDetail = async (googlePlaceId: string) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/details/json?place_id=${googlePlaceId}&key=${process.env.REACT_APP_GOOGLE_API}`);
    return res.json();
  } catch (error) {
    console.error("getGoogleDetail", error);
  }
}

export const getIndividualGoogleRestaurant = (query: string) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const promise = new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&radius=${process.env.REACT_APP_DEFAULT_RADIUS_METERS}&key=${process.env.REACT_APP_GOOGLE_API}`, {
      signal,
    });
    const data = await response.json();
    resolve(data);
  });
  (promise as PromiseWithCancel<any>).cancel = () => controller.abort();
  return promise as PromiseWithCancel<any>;
}

export const getSearchQueryPrediction = async (latLong: string, query: string) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/queryautocomplete/json?input=${query}&location=${latLong}&radius=${process.env.REACT_APP_DEFAULT_RADIUS_METERS}&key=${process.env.REACT_APP_GOOGLE_API}`);
    return res.json();
  } catch (error) {
    console.error("getSearchQueryPrediction", error);
  }
}
