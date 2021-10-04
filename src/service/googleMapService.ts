
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

export const getGoogleRestaurantResults = async (latLong: string, query: string) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/nearbysearch/json?keyword=${query}&location=${latLong}&radius=${process.env.REACT_APP_DEFAULT_RADIUS_METERS}&key=${process.env.REACT_APP_GOOGLE_API}`);
    return res.json();
  } catch (error) {
    console.error("getGoogleRestaurantResults", error);
  }
}

export const getGooglePhotoRef = async (photoRef: string) => {
  try {
    return await fetch(`${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.REACT_APP_GOOGLE_API}`);
  } catch (error) {
    console.error("getGoogleRestaurantResults", error);
  }
}
