import { useContext } from 'react';

import Button from '../../UI/button/Button';
import MoviesItem from './movies-item/MoviesItem';

import { MoviesContext } from '../../context/moviesContext/MoviesProvider';

import classes from './Movies.module.css';

const Movies = () => {
  const moviesCtx = useContext(MoviesContext);

  let moviesList = <h2> No Movies tonight... </h2>;

  if (moviesCtx.movies.length > 0) {
    moviesList = moviesCtx.movies.map((item) => {
      return (
        <MoviesItem
          key={item.id}
          id={item.id}
          title={item.title}
          text={item.text}
          onAddMoviesRef={moviesCtx.addMovieRef}
        />
      );
    });
  }

  let content = moviesList;

  if (moviesCtx.isLoading) {
    content = <h2> Please wait.... </h2>;
  }

  if (moviesCtx.hasError) {
    content = (
      <Button type='cancel'>
        Try again
      </Button>
    );
  }

  return <div className={classes.movies}>{content}</div>;
};

export default Movies;
