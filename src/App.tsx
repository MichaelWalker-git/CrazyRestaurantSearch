import React, { ChangeEvent, createRef, Ref, useEffect, useMemo, useState } from 'react';
import logo from './logo.png';
import './App.scss';
import { getYelpResults } from './service/yelpService';
import {
  getGooglePhotoRef,
  getGoogleRestaurantResults,
  getLatLong,
  getLocationAutoComplete
} from './service/googleMapService';

import debounce from 'lodash.debounce';
import { Button, Card, Col, Container, Dropdown, FormControl, InputGroup, Row } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import {GoogleAutoCompletePrediction, GoogleBusiness, YelpBusiness} from './types';
import { Type } from 'typescript';

const BusinessResult = (props: any) => {
  const [googleUrlImage, setUrlImage] = useState("");
  const { name, location, rating, image_url, review_count } = props.yelpBiz;
  const { user_ratings_total, } = props.googleBiz;
  const googleRating = props.googleBiz.rating;
  //TODO(miketran): Google reviews
  //TODO(miketran): Restaurant website

  // function validateResponse(response: any) {
  //   if (!response.ok) {
  //     throw Error(response.statusText);
  //   }
  //   return response;
  // }

  // const googleImage = getGooglePhotoRef(props.googleBiz.photos[0].photo_reference)
  //   .then(validateResponse)
  //   .then(response => response?.blob())
  //   .then(blob => {
  //     setUrlImage(URL.createObjectURL(blob))
  //     console.log(URL.createObjectURL(blob))
  //   })

  return (
    <>
      <Card>
        <h4>{name} : {location.address1} - <a href={"website"}>{"website"}</a> </h4>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <h5>Yelp Rating: {rating} of 5 stars ({review_count} total reviews)</h5>
                <Card.Img variant="top" src={image_url} />
              </Col>
              <Col>
                <h5>Google Rating: {googleRating} of 5 stars ({user_ratings_total} total reviews)</h5>
                <Card.Img variant="top" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEACyFoIIiPqphiR3VgwJhoQlv9S4_AWIiFYcr18UKG-j_FpXunyRaeS7ErEvP6BEO49dMFnLURs0HIOQqgPzF8D3tmDr5aFsOXNMI3l-98I8hOoDhfgD3ylUklBo45U1B6RQSRbjalhtHraoB-1qoU-KpKK7pra6S7ruxi-Tto5WEHq&key=AIzaSyAjf7dv23CHDQtTyldde3N3BJpYxXXFnkE`} />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <Dropdown.Divider />

    </>
  )
}

//TODO(miketran): Add Correct Type
const SearchResultBody = (props: any) => {
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

interface SearchBarProps {
  handleSearchResults: (a: Map<string, Array<YelpBusiness|GoogleBusiness>>) => void;
  latLong: Array<string>;
  searchAreaTerm: Array<string>;
  searchBoxTerm: string;
  setLatLongValues: (a: Array<string>) => void;
  setSearchAreaValues: (a: Array<string>) => void;
  setSearchTermValues: (a: string) => void;
}

function SearchBar(props: SearchBarProps) {
  const [options, setCityOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const selectLocationDropdown = createRef<AsyncTypeahead<string>>();

  const changeHandler = (locationText: string) => {
    setLoading(true);
    getLocationAutoComplete(locationText).then((res) => {
      const formattedData = res.predictions
        .map((val: GoogleAutoCompletePrediction) => val.description);
      setCityOptions(formattedData);
    })
      .finally(() => setLoading(false));
  };

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), []);

  const handleMenuClose = (menuOpen: boolean) => {
    const selectedVal = selectLocationDropdown.current?.getInput().value;

    if (!menuOpen && selectedVal) {
      props.setSearchAreaValues([selectedVal || props.searchAreaTerm[0]]);
      getLatLong(selectedVal).then((res) => {
        const { lng, lat } = res.results[0].geometry.location;
        props.setLatLongValues([lng, lat]);
      });
    }
  }

  //TODO(miketran): Validation of inputs.
  /**
   * Kicks off search when both inputs are inputted.
   * @param evt
   */
  const handleSearch = (evt: any) => {
    evt.preventDefault();
    Promise.all([
      getYelpResults(props.searchBoxTerm, props.latLong[0], props.latLong[1]),
      getGoogleRestaurantResults(`${props.latLong[1]},${props.latLong[0]}`,props.searchBoxTerm )
    ]).then((res) => {
      const newDataMap = joinDataSources(res);
      props.handleSearchResults(newDataMap)
    })
  }

  const clearLocationInput = () => {
    selectLocationDropdown.current?.clear();
  }

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>Find:</InputGroup.Text>
      <FormControl
        placeholder="Find..."
        aria-label="Find what?"
        aria-describedby="basic-addon2"
        type={"text"}
        value={props.searchBoxTerm}
        onChange={(evt) => props.setSearchTermValues(evt.target.value)}
      />
      <InputGroup.Text>Nearby:</InputGroup.Text>
      <AsyncTypeahead
        defaultSelected={props.searchAreaTerm}
        id="selections-example"
        onSearch={(text: string) => { debouncedChangeHandler(text); }}
        options={options}
        ref={selectLocationDropdown}
        placeholder="Choose a city..."
        isLoading={isLoading}
        onMenuToggle={handleMenuClose}
        onFocus={clearLocationInput}
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={handleSearch}>Search
        </Button>
    </InputGroup>
  );
}

const joinDataSources = (res: [{businesses: Array<YelpBusiness>}, {results: Array<GoogleBusiness>}]) => {
  const resultMap = new Map();
  const joinedMap = new Map();
  const yelpResults = res[0].businesses;
  const googleResults = res[1].results;
  for (let i = 0; i < yelpResults.length; i++) {
    if(yelpResults[i].location.address1?.length > 0){
      resultMap.set(yelpResults[i].location.address1, [yelpResults[i]]);
    }
  }
  for (let j = 0; j < googleResults.length; j++) {
    const firstPartAddress = googleResults[j].vicinity.split(",")[0];
    if(resultMap.has(firstPartAddress)){
      const currentBizArr = resultMap.get(firstPartAddress);
      joinedMap.set(firstPartAddress, [...currentBizArr, googleResults[j]]);
    }
  }
  return joinedMap;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("Restaurants");
  const [searchArea, setSearchArea] = useState(["San Francisco, CA"])
  const [searchResults, setSearchResults] = useState<Map<string, Array<YelpBusiness|GoogleBusiness>>>(new Map());
  const [latLongSelectedCity, setLatLong] = useState(["-122.4194", "37.7749"]);

  useEffect(() => {
    Promise.all([
      getYelpResults(searchTerm, latLongSelectedCity[0], latLongSelectedCity[1]),
      getGoogleRestaurantResults(`${latLongSelectedCity[1]},${latLongSelectedCity[0]}`,searchTerm )
    ]).then((res) => {
      setSearchResults(joinDataSources(res));
    })
  }, [])



  const handleSearchResults = (searchResultFromButton: Map<string, Array<YelpBusiness|GoogleBusiness>>) => {
    setSearchResults(searchResultFromButton);
  }

  return (
    <div className="App">
      <header>
        <a href="https://www.intellimize.com/" target="_blank"
          rel="noopener noreferrer">
          <img src={logo} alt="logo" />
        </a>
      </header>
      <main className={"mainBody"}>
        <div>
          <SearchBar
            handleSearchResults={handleSearchResults}
            searchBoxTerm={searchTerm}
            searchAreaTerm={searchArea}
            latLong={latLongSelectedCity}
            setSearchAreaValues={setSearchArea}
            setLatLongValues={setLatLong}
            setSearchTermValues={setSearchTerm} />
          <h2>Showing {searchTerm} near {searchArea} </h2>
          <Dropdown.Divider />
          <SearchResultBody searchResults={searchResults} />
        </div>
      </main>
    </div>
  );
}

export default App;
