import {GoogleBusiness, YelpBusiness} from "../types";
import React from "react";
import { BusinessResult } from './BusinessResult';

 //TODO(miketran): Add Correct Type
export const SearchResultBody = (props: any) => {
  console.log(props, "PROPS in SearchResultBody")
  return (
    <div>
      {props.searchResults?.size > 0 &&
      [...props.searchResults.values()].map((bizTupal: [YelpBusiness,GoogleBusiness]) => {
        return (<BusinessResult
            yelpBiz={bizTupal[0]}
            googleBiz={bizTupal[1]}
            key={bizTupal[0].id} />
        )})
      }
    </div>
  );
}
