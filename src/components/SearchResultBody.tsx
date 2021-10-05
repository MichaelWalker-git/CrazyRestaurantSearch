import {GoogleBusiness, YelpBusiness} from "../types";
import React from "react";
import { BusinessResult } from './BusinessResult';

interface SearchResultBodyProps {
  searchResults: Map<string, Array<YelpBusiness | GoogleBusiness>>;
  callDefaultSearch: () => void;
}

export const SearchResultBody = (props: SearchResultBodyProps) => {
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
      {props.searchResults?.size === 0 && (
        <>
          <span>No results available</span>
          <div>Try <a href={""} onClick={props.callDefaultSearch}> Restaurants in San Francisco </a>
          </div>
        </>
      )}
    </div>
  );
}
