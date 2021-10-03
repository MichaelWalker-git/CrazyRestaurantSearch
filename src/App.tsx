import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.scss';
import { getYelpResults } from './service/yelpService';
import { getLocationAutoComplete } from './service/googleMapService';

function SearchResultBody() {
  return (
    <div>
      <></>
    </div>
  );
}

function SearchBar() {


  const [query, setQuery] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    console.log(event.target.value);
    getLocationAutoComplete(event.target.value)
  };

  const handleSearch = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    getYelpResults("san francisco", "chinese")
  }

  return (
    <div>
      <input type='text'

      ></input>
      <input
        onChange={changeHandler}
        type="text"
        placeholder="Type a query..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

function App() {

  useEffect(() => {
    getYelpResults("San Francisco", "chinese")

  }, [])

  return (
    <div className="App">
      <header>
        <a href="https://www.intellimize.com/" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="logo" />
        </a>
      </header>
      <main>
        <div>
          <SearchBar />
          <SearchResultBody />
        </div>
      </main>
    </div>
  );
}

export default App;
