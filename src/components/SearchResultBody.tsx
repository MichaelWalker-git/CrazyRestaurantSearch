import {GoogleBusiness, PredictionResponse, YelpBusiness} from "../types";
import React from "react";
import {BusinessResult} from './BusinessResult';
import {Col, Row, Spinner} from "react-bootstrap";

interface SearchResultBodyProps {
  searchResults: Map<string, Array<YelpBusiness | GoogleBusiness>>;
  callLastSearch: () => void;
  setSearchTerm: (newSearchTerm: string) => void;
  isLoading: boolean;
  prediction: Array<PredictionResponse>;
}

export const SearchResultBody = (props: SearchResultBodyProps) => {

  const handleCorrectedSearch = (newSearchTerm: string) => {
    props.setSearchTerm(newSearchTerm);
    props.callLastSearch();
  }

  return (
    <div>
      {props.searchResults?.size > 0 &&
      [...props.searchResults.values()].map((bizTupal: [YelpBusiness, GoogleBusiness]) => {
        return (<BusinessResult
            yelpBiz={bizTupal[0]}
            googleBiz={bizTupal[1]}
            key={bizTupal[0].id}/>
        )
      })
      }
      {!props.isLoading && props.prediction?.length > 0 && (
        <>
          <span>No results available for that term</span>
          {props.prediction.map((res: PredictionResponse, idx) => {
            return (<div key={`${res.place_id}-${idx}`}>
                Did you mean?&nbsp;
                <a href="#"
                   onClick={() => handleCorrectedSearch(res.description)}>
                  {res.description}
                </a>
              </div>
            )
          })}
        </>
      )}

      {!props.isLoading && props.prediction?.length === 0 && props.searchResults?.size === 0 && (
        <>
          <span>No results available</span>
          <div>Try <a href="#"
                      onClick={() => handleCorrectedSearch("Restaurants")}> Restaurants in San Francisco </a>
          </div>
        </>
      )}
      {props.isLoading && (
        <Row>
          <Col md={{span: 3, offset: 5}}><Spinner animation="border"/></Col>
        </Row>
      )}
    </div>
  );
}
