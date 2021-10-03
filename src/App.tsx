import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.png';
import './App.scss';
import { getYelpResults } from './service/yelpService';
import { getLocationAutoComplete } from './service/googleMapService';

import debounce from 'lodash.debounce';
import { Button, Card, Col, Container, Dropdown, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { YelpBusiness } from './types';

const BusinessResult = (props: any) => {
  const { name, location, rating, image_url, url, review_count } = props.yelpBiz;
  
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
              <Card.Img variant="top" src={image_url}/>
            </Col>
            <Col>
            <h5>Google Rating: {rating} of 5 stars ({review_count} total reviews)</h5>
              <Card.Img variant="top" src={image_url}/>
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

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    console.log(event.target.value);
    getLocationAutoComplete(event.target.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300)
    , []);

  const handleSearch = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();

    getYelpResults("san francisco", "chinese").then((res) => {
      props.handleSearchResults(res.businesses)
    })
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
      <Typeahead
        defaultSelected={selectedCity}
        id="selections-example"
        onInputChange={(text: String, e: Event) => { console.log(text, e); }}
        options={options}
        placeholder="Choose a state..."
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
    getYelpResults(searchArea, searchTerm).then((res) => {
      setSearchResults(res.businesses);
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
