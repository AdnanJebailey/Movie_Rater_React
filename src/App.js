import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

  const [movies, setMovie] = useState([]);
  const [selectedmovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 08d57e0e1411e09d1ea35a2f447f5145c2516806'
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovie(resp))
    .catch(error => console.log(error))   
  }, [])

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const updatedMovie = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovie(newMovies)
  }

  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const MovieCreated = movie => {

    const newMovies = [...movies, movie];
    setMovie(newMovies)

  }

  const removeClicked = movie => {
    const newMovies = movies.filter( mov => mov.id !== movie.id)
    setMovie(newMovies);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Movie - Rater</h2>
      </header>
      <div className="layout">
        <div>
          <MovieList 
          movies={movies} 
          movieClicked={loadMovie} 
          editClicked={editClicked}
          removeClicked={removeClicked}

          />
          <button onClick={ newMovie }>New Movie</button>
        </div>
          <MovieDetails movie={selectedmovie} updateMovie={loadMovie}/>
          { editedMovie ?
           <MovieForm  movie={editedMovie} updatedMovie={updatedMovie} MovieCreated={MovieCreated}/> : null}
          
      </div>
    </div>
  );
}

export default App;
