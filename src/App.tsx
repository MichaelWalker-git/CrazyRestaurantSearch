import React, { ChangeEvent, createRef, Ref, useEffect, useMemo, useState } from 'react';
import logo from './logo.png';
import './App.scss';
import { getYelpResults } from './service/yelpService';
import { getLatLong, getLocationAutoComplete } from './service/googleMapService';

import debounce from 'lodash.debounce';
import { Button, Card, Col, Container, Dropdown, FormControl, InputGroup, Row } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { GoogleAutoCompletePrediction, YelpBusiness } from './types';
import { Type } from 'typescript';

const BusinessResult = (props: any) => {
  const { name, location, rating, image_url, review_count } = props.yelpBiz;

  //TODO(miketran): Google reviews
  //TODO(miketran): Restaurant website
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
                <h5>Google Rating: {rating} of 5 stars ({review_count} total reviews)</h5>
                <Card.Img variant="top" src={image_url} />
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

  // join yelp and google data
  return (
    <div>
      {props.searchResults?.length > 0 && props.searchResults.map((biz: YelpBusiness) => {
        return (<BusinessResult yelpBiz={biz} key={biz.id} />)
      })}
    </div>
  );
}

interface SearchBarProps {
  handleSearchResults: (a: Array<YelpBusiness>) => void;
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
    console.log(props.searchAreaTerm, "handleSearch", props)

    getYelpResults(props.searchBoxTerm, props.latLong[0], props.latLong[1]).then((res) => {
      props.handleSearchResults(res.businesses)
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

function App() {
  const [searchTerm, setSearchTerm] = useState("Restaurants");
  const [searchArea, setSearchArea] = useState(["San Francisco, CA"])
  const [searchResults, setSearchResults] = useState<Array<YelpBusiness>>([]);
  const [latLongSelectedCity, setLatLong] = useState(["-122.4194", "37.7749"]);

  useEffect(() => {
    Promise.all([
      getYelpResults(searchTerm, latLongSelectedCity[0], latLongSelectedCity[1]),
    ]).then((res) => {
      setSearchResults(res[0].businesses);
    })
  }, [])

  const handleSearchResults = (searchResultFromButton: Array<YelpBusiness>) => {
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
      <main>
        <div>
          <SearchBar handleSearchResults={handleSearchResults}
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
