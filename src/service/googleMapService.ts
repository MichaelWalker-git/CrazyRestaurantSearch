
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
    const res = await fetch(`${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/textsearch/json?input=${query}&types=(cities)&key=${process.env.REACT_APP_GOOGLE_API}`);
    return res.json();
  } catch (error) {
    console.error("getGoogleRestaurantResults", error);
  }
}