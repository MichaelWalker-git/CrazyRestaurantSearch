import React, {useEffect, useState} from 'react';
import logo from './logo.png';
import './App.scss';
import {Dropdown} from 'react-bootstrap';
import {GoogleBusiness, YelpBusiness} from './types';
import {SearchResultBody} from './components/SearchResultBody';
import {SearchBar} from "./components/SearchBar";
import {callYelpAndGoogle} from "./service/mergeYelpAndGoogleData";

function App() {
  const [searchTerm, setSearchTerm] = useState("Restaurants");
  const [searchArea, setSearchArea] = useState(["San Francisco, CA"])
  const [searchResults, setSearchResults] = useState<Map<string, Array<YelpBusiness | GoogleBusiness>>>(new Map());
  const [latLongSelectedCity, setLatLong] = useState(["-122.4194", "37.7749"]);
  const [isLoading, setLoading] = useState(false);

  const [prediction, setPrediction] = useState([]);

  const handleSearchAndJoin = () => {
    callYelpAndGoogle(
      setLoading,
      setPrediction,
      setSearchResults,
      searchTerm,
      latLongSelectedCity,
    )
  }

  useEffect(() => {
    handleSearchAndJoin();
  }, [])

  const handleSearchResults = (searchResultFromButton: Map<string, Array<YelpBusiness | GoogleBusiness>>) => {
    setSearchResults(searchResultFromButton);
  }

  return (
    <div className="App">
      <header>
        <a href="https://www.intellimize.com/" target="_blank"
           rel="noopener noreferrer">
          <img src={logo} alt="logo"/>
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
            callYelpAndGoogle={handleSearchAndJoin}
            setSearchTermValues={setSearchTerm}/>
          <span className={"headerTitle"}>Showing <b>{searchTerm}</b> near <b>{searchArea}</b> </span>
          <Dropdown.Divider/>
          <SearchResultBody searchResults={searchResults}
                            callLastSearch={handleSearchAndJoin}
                            isLoading={isLoading}
                            prediction={prediction}
                            setSearchTerm={setSearchTerm}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
