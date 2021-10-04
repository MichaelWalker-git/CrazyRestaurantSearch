import React, { createRef, Ref, useEffect, useMemo, useState } from 'react';
import logo from './logo.png';
import './App.scss';
import { getYelpResults } from './service/yelpService';
import { getLocationAutoComplete } from './service/googleMapService';

import debounce from 'lodash.debounce';
import { Button, Card, Col, Container, Dropdown, FormControl, InputGroup, Row } from 'react-bootstrap';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
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
      {props.searchResults.length > 0 && props.searchResults.map((biz: YelpBusiness) => {
        return (<BusinessResult yelpBiz={biz} key={biz.id} />)
      })}
    </div>
  );
}

function SearchBar(props: any) {

  const [query, setQuery] = useState('');
  const [options, setCityOptions] = useState([]);
  const [selectedCity, changeSelectedCity] = useState(['San Francisco, CA'])
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

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300)
    , []);


  const handleMenuClose = (menuOpen: boolean) => {
    if (!menuOpen) {
      const selectedVal = selectLocationDropdown.current?.getInput().value;
      changeSelectedCity([selectedVal || selectedCity[0]]);
      console.log("menu selectedCity", selectedCity, selectedVal);
    }
  }

  const handleSearch = (evt: any) => {
    evt.preventDefault();
    console.log(evt, "handleSearch")

    getYelpResults("san francisco", "chinese").then((res) => {
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
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <InputGroup.Text>Nearby:</InputGroup.Text>
      <AsyncTypeahead
        defaultSelected={selectedCity}
        id="selections-example"
        onSearch={(text: string) => { debouncedChangeHandler(text); }}
        options={options}
        ref={selectLocationDropdown}
        placeholder="Choose a state..."
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

/**
 *       {/* <input type='text'
      ></input>
      <input
        onChange={debouncedChangeHandler}
        type="text"
        placeholder="Type a query..."
      />
      <button onClick={handleSearch}>Search</button> */

function App() {

  const [searchTerm, setSearchTerm] = useState("restaurants");
  const [searchArea, setSearchArea] = useState("San Francisco, CA")
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    Promise.all([
      getYelpResults(searchArea, searchTerm),

    ]).then((res) => {
      setSearchResults(res[0].businesses);
    })
  }, [])

  const handleSearchResults = (searchResultQuery: Array<YelpBusiness>) => {
    console.log(searchResultQuery, "!!")
  }

  return (
    <div className="App">
      <header>
        <a href="https://www.intellimize.com/" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="logo" />
        </a>
      </header>
      <main>
        <div>
          <SearchBar handleSearchResults={handleSearchResults} />
          <h2>Showing {searchTerm} near {searchArea} </h2>
          <Dropdown.Divider />
          <SearchResultBody searchResults={searchResults} />
        </div>
      </main>
    </div>
  );
}

export default App;
