import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';

const api_url = 'http://www.omdbapi.com?apikey=395728e3';
const movieEx = {
    "Title": "Batman Begins",
    "Year": "2005",
    "imdbID": "tt0372784",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}

function App() {
    // 395728e3
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
         const response = await fetch(`${api_url}&s=${title}`);
         const data = await response.json();

         setMovies(data.Search);
    }

    useEffect(() => {
       searchMovies();
    }, []);

    return (
        <div className="app">
            <h1>MovieSpace</h1>
            <div className="search">
                <input
                    placeholder="Search from movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
               movies?.length > 0
                ? (
                       <div className="container">
                           {movies.map((movie) => (
                               <MovieCard movie={movie} />
                           ))}
                        </div>
                   ) : (
                       <div className="empty">
                           <h2>No movies</h2>
                       </div>
                   )

            }



        </div>
    );
}


export default App;
