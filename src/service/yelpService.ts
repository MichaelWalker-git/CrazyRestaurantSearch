export const getYelpResults = (location: string, searchTerm: string) => {

const requestHeaders = {
'headers': {
    'Authorization': `Bearer ${process.env.REACT_APP_YELP_API}`
    }
}  

return fetch(`${process.env.REACT_APP_PROXY_DOMAIN}yelp/v3/businesses/search?location=${location}&term=${searchTerm}`, requestHeaders)      
    .then((res: any) => res.json())
    .then(
      (result) => {
        console.log("result", result)
        return result;
      },

      (error) => {
        console.error(error);
      }
    )
    .catch((err) => console.error(err));
}
