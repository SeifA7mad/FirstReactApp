import React, { useReducer, useEffect, useCallback } from 'react';

import useHttp from '../../hooks/use-http';

export const MoviesContext = React.createContext({
  movies: null,
  addMovie: null,
  addMovieRef: null,
  isLoading: false,
  hasError: null,
});

const initialMoviesState = {
  movies: new Map()
};

const moviesStateReducer = (state, action) => {
  if (action.type === 'ADD-MOVIES') {
    return {
      movies: action.movies,
    };
  }
  if (action.type === 'ADD-MOVIE') {
    return {
      movies: state.movies.concat(action.movie),
    };
  }

  if (action.type === 'ADD-MOVIES-REFS') {
    const newMovies = new Map(state.movies);
    const newMovie = newMovies.get(action.id);
    newMovie.ref = action.ref;
    newMovies.set(action.id, newMovie);

    return {
      movies: newMovies,
    };
  }
  return initialMoviesState;
};

// component provider funtion
const MoviesProvider = (props) => {
  // movies state
  const [moviesState, dispatch] = useReducer(
    moviesStateReducer,
    initialMoviesState
  );

  // movies http request
  const { isLoading, error, fetchData } = useHttp();

  const addMovie = (movieData) => {
    dispatch({ type: 'ADD-MOVIE', movie: movieData });
  };


  const addMovieRef = useCallback((id, ref) => {
    dispatch({ type: 'ADD-MOVIES-REFS', id: id, ref: ref });
  });

  useEffect(() => {
    // function to tranfer the requested movie data from server
    const transferData = (dataObj) => {
      let newMovies = new Map();
      for (let dataKey in dataObj) {
        newMovies.set(dataKey, {
          title: dataObj[dataKey].title,
          text: dataObj[dataKey].text,
          ref: null
        });
      }
      dispatch({ type: 'ADD-MOVIES', movies: newMovies });
    };

    fetchData(
      {
        url: 'https://custom-hooks-test-25918-default-rtdb.firebaseio.com/movies.json',
      },
      transferData
    );
  }, [fetchData]);

  return (
    <MoviesContext.Provider
      value={{
        movies: moviesState.movies,
        addMovie: addMovie,
        addMovieRef: addMovieRef,
        isLoading: isLoading,
        hasError: error,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
