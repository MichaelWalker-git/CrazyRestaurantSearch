
export const getLocationAutoComplete = (location: string) => {
    return fetch(`${process.env.REACT_APP_PROXY_DOMAIN}google/maps/api/place/autocomplete/json?input=${location}&types=(cities)&key=${process.env.REACT_APP_GOOGLE_API}`)      
        .then((res: any) => res.json())
        .then(
          (result) => {
            return result;
          },
    
          (error) => {
            console.error(error);
          }
        )
        .catch((err) => console.error(err));
    }



export const getGoogleRestaurantResults = () => {
    return fetch(`${process.env.PROXY_DOMAIN}/google/*`)
}