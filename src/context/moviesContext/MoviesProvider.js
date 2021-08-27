import React, { useReducer, useRef, useEffect } from 'react';

import useHttp from '../../hooks/use-http';

export const MoviesContext = React.createContext({
  movies: [],
  moviesRef: null,
  addMovie: null,
  addMovieRef: null,
  isLoading: false,
  hasError: null,
});

const initialMoviesState = {
  movies: [],
  moviesRefs: new Map(),
};

const moviesStateReducer = (state, action) => {
  if (action.type === 'ADD-MOVIES') {
    return {
      movies: action.movies,
      moviesRefs: state.moviesRefs,
    };
  }
  if (action.type === 'ADD-MOVIE') {
    return {
      movies: state.movies.concat(action.movie),
      moviesRefs: state.moviesRefs,
    };
  }

  if (action.type === 'ADD-MOVIES-REFS') {
    return {
      movies: state.movies,
      moviesRefs: action.movieRef,
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

  // movies refs
  const moviesRef = useRef(new Map());

  // movies http request
  const { isLoading, error, fetchData } = useHttp();

  const addMovie = (movieData) => {
    dispatch({ type: 'ADD-MOVIE', movie: movieData });
  };

  const addMovieRef = (id, ref) => {
    moviesRef.current.set(id, ref);
  };

  useEffect(() => {
    dispatch({ type: 'ADD-MOVIES-REFS', movieRef: moviesRef });
  }, [moviesRef]);

  useEffect(() => {
    // function to tranfer the requested movie data from server
    const transferData = (dataObj) => {
      let newMovies = [];
      for (let dataKey in dataObj) {
        newMovies.push({
          id: dataKey,
          title: dataObj[dataKey].title,
          text: dataObj[dataKey].text,
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
        moviesRef: moviesState.moviesRefs,
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
