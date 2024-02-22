import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import MovieDetails from './MovieDetails';
import './styles.css';

//main component: App
function App() {
  const [searchResults, setSearchResults] = useState([]); //state to store search results

  //function to implement Javascript Fetch from the RapidAPI
  const handleSearch = async (searchTerm) => {
    try {
      const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${searchTerm}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '15f1d5c376msh5ed860dc64432a3p13d424jsn999cb1318235', //API KEY
          'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
        },
      };

      const response = await fetch(url, options);
      const result = await response.json();
      setSearchResults(result.d);
    } catch (error) {
      console.error(error);
    }
  };

  //main container and routes for different paths
  return (
    <Router>
      <div class="navbar">
        <a href="app.js">Grab Your Popcorn</a>
      </div>
      <br></br>
      <div className="container mt-4">
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={<SearchResults searchResults={searchResults} />}
          />
          <Route
            path="/details/:id"
            element={<MovieDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}

//displaying the results
const SearchResults = ({ searchResults }) => (
  <div className="row row-cols-1 row-cols-md-4 g-4">
    {searchResults.map((item) => (
      item.y && (
        <div className="col mb-4" key={item.id}>
          <Link to={`/details/${item.id}`} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ height: '400px' }}>
              {item.i && item.i.imageUrl && (
                <img
                  src={item.i.imageUrl}
                  alt={item.l}
                  className="card-img-top"
                  style={{ height: '80%', objectFit: 'contain' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title text-truncate">{item.l}</h5>
              </div>
            </div>
          </Link>
        </div>
      )
    ))}
  </div>
);

export default App;
