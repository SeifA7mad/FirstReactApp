import { useContext } from 'react';

import { MoviesContext } from '../../../context/moviesContext/MoviesProvider';
import useHttp from '../../../hooks/use-http';
import useInput from '../../../hooks/use-input';
import Button from '../../../UI/button/Button';
import classes from './AddMovies.module.css';

const AddMovies = (props) => {

  //movies data
  const moviexCtx = useContext(MoviesContext);

  //title input hook
  const {
    inputValue: titleInputValue,
    inputValueIsValid: titleInputValueIsValid,
    inputHasAnError: titleInputHasAnError,
    onChangeInputValueHandler: onChangeTitleInputValueHandler,
    onBlurInputHanlder: onBlurTitleInputHandler,
    onResetInputHandler: onResetTitleInputHandler,
  } = useInput((titleInputValue) => titleInputValue.trim() !== '');

  //text input hook
  const {
    inputValue: textInputValue,
    inputValueIsValid: textInputValueIsValid,
    inputHasAnError: textInputHasAnError,
    onChangeInputValueHandler: onChangeTextInputValueHandler,
    onBlurInputHanlder: onBlurTextInputHandler,
    onResetInputHandler: onResetTextInputHandler,
  } = useInput((textInputValue) => textInputValue.trim() !== '');

  // fetch hook
  const { isLoading, fetchData: sendData } = useHttp();

  //from validaty
  let formIsValid = false;
  if (textInputValueIsValid && titleInputValueIsValid) {
    formIsValid = true;
  }

  const transferData = (movieTitle, movieText, dataObj) => {
    const genertedId = dataObj.name;
    const newMovie = { id: genertedId, title: movieTitle, text: movieText };
    moviexCtx.addMovie(newMovie);
  };

  const onSubmitMovieHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    sendData(
      {
        url: 'https://custom-hooks-test-25918-default-rtdb.firebaseio.com/movies.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { title: titleInputValue, text: textInputValue },
      },
      transferData.bind(null, titleInputValue, textInputValue)
    );

    onResetTitleInputHandler();
    onResetTextInputHandler();
  };

  return (
    <form className={classes.addMovies} onSubmit={onSubmitMovieHandler}>
      <label> Add Movie </label>
      <input
        placeholder='Title'
        onChange={onChangeTitleInputValueHandler}
        onBlur={onBlurTitleInputHandler}
        value={titleInputValue}
      />
      {titleInputHasAnError && (
        <p> title must not be empty </p>
      )}
      <input
        placeholder='Text'
        onChange={onChangeTextInputValueHandler}
        onBlur={onBlurTextInputHandler}
        value={textInputValue}
      />
      {textInputHasAnError && (
        <p> text must not be empty </p>
      )}
      <Button type='confirm' disabled={!formIsValid}>
        {' '}
        {isLoading ? 'Loading...' : 'Add Movie'}{' '}
      </Button>
      <Button type='cancel' onClick={props.onHideModal}>
        cancel
      </Button>
    </form>
  );
};

export default AddMovies;
