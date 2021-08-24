import { useRef } from 'react';
import useHttp from '../../../hooks/use-http';
import Button from '../../../UI/button/Button';
import classes from './AddMovies.module.css';

const AddMovies = (props) => {
  const inputTitleRef = useRef();
  const inputTextRef = useRef();

  const { isLoading, error, fetchData: sendData } = useHttp();

  const transferData = (movieTitle, movieText, dataObj) => {
    const genertedId = dataObj.name;
    const newMovie = { id: genertedId, title: movieTitle, text: movieText };
    props.onAddMovie(newMovie);
  };

  const addMovieHandler = (event) => {
    event.preventDefault();

    const title = inputTitleRef.current.value;
    const text = inputTextRef.current.value;

    sendData(
      {
        url: 'https://custom-hooks-test-25918-default-rtdb.firebaseio.com/movies.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { title: title, text: text },
      },
      transferData.bind(null, title, text)
    );

  };

  return (
    <form className={classes.addMovies} onSubmit={addMovieHandler}>
      <label> Add Movie </label>
      <input ref={inputTitleRef} placeholder='Title' />
      <input ref={inputTextRef} placeholder='Text' />
      <Button type='confirm'> Add Movie </Button>
      <Button type='cancel' onClick={props.onHideModal}>
        cancel
      </Button>
    </form>
  );
};

export default AddMovies;
