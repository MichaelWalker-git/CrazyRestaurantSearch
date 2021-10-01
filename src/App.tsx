import React, {useEffect} from 'react';
import logo from './logo.png';
import './App.scss';

function SearchResultBody() {
  return (
    <div>
      <></>
    </div>
  );
}

function SearchBar() {
  return null;
}

function App() {

  useEffect(() => {
    fetch("")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
        },

        (error) => {
          console.error(error);
        }
      )
  }, [])

  return (
    <div className="App">
      <header>
        <a href="https://www.intellimize.com/" target="_blank"  rel="noopener noreferrer">
          <img src={logo} alt="logo" />
        </a>
      </header>
      <main>
        <div>
          <SearchBar/>
          <SearchResultBody/>
        </div>
      </main>
    </div>
  );
}

export default App;
