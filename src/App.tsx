import React, {useEffect, useState} from 'react';
import logo from './logo.png';
import './App.scss';
import {getYelpResults} from './service/yelpService';
import {
  getGoogleRestaurantResults
} from './service/googleMapService';
import {Dropdown} from 'react-bootstrap';
import {GoogleBusiness, YelpBusiness} from './types';
import {iterateOverYelpMap, joinDataSources, joinTwoMaps} from './utilities';
import {SearchResultBody} from './components/SearchResultBody';
import {SearchBar} from "./components/SearchBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("Restaurants");
  const [searchArea, setSearchArea] = useState(["San Francisco, CA"])
  const [searchResults, setSearchResults] = useState<Map<string, Array<YelpBusiness | GoogleBusiness>>>(new Map());
  const [latLongSelectedCity, setLatLong] = useState(["-122.4194", "37.7749"]);
  const [isLoading, setLoading] = useState(false);

  const callYelpAndGoogle = () => {
    setLoading(true);
    let prev: any;
    Promise.all([
      getYelpResults(searchTerm, latLongSelectedCity[0], latLongSelectedCity[1]),
      getGoogleRestaurantResults(`${latLongSelectedCity[1]},${latLongSelectedCity[0]}`, searchTerm)
    ])
      .then((res) => joinDataSources(res))
      .then((mapResult) => {
        setSearchResults(mapResult.joinedDataMap);
        prev = mapResult.joinedDataMap;
        return mapResult.unMatchedMap;
      })
      .then((unMatchedData) => iterateOverYelpMap(unMatchedData))
      .then((moreJoinedData) => {
        const newDataState = joinTwoMaps(prev, moreJoinedData);
        setSearchResults(newDataState);
        setLoading(false);
      })
  }

  useEffect(() => {
    callYelpAndGoogle();
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
            callYelpAndGoogle={callYelpAndGoogle}
            setSearchTermValues={setSearchTerm}/>
          <span className={"headerTitle"}>Showing <b>{searchTerm}</b> near <b>{searchArea}</b> </span>
          <Dropdown.Divider/>
          <SearchResultBody searchResults={searchResults}
                            callDefaultSearch={callYelpAndGoogle}
                            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
