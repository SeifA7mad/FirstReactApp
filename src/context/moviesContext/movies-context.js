import React from 'react';

const moviesContext = React.createContext(
    {
        movies: [],
        moviesRef: null,
        addMovie: null,
        addMovieRef: null
    }
);

export default moviesContext;
