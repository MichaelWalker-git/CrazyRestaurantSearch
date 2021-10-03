import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.png';
import './App.scss';
import { getYelpResults } from './service/yelpService';
import { getLocationAutoComplete } from './service/googleMapService';

import debounce from 'lodash.debounce';
import { Button, Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import {YelpBusiness} from './types';

//TODO(miketran): Add Correct Type
const SearchResultBody = (props: any) => {
  console.log(props.searchResults, "?")
  return (
    <div>

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
    // setSearchResults(searchResults);
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
