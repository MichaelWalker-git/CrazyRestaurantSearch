export const getYelpResults = async (searchTerm: string, long: string, lat: string) => {

const requestHeaders = {
'headers': {
    'Authorization': `Bearer ${process.env.REACT_APP_YELP_API}`
    }
}
  try {
    const res = await fetch(`${process.env.REACT_APP_PROXY_DOMAIN}yelp/v3/businesses/search?latitude=${lat}&longitude=${long}&term=${searchTerm}&radius=${process.env.REACT_APP_DEFAULT_RADIUS_METERS}`, requestHeaders);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
