import { useState, useEffect, useRef } from 'react';
import useHttp from './hooks/use-http';

import Navbar from './UI/navbar/Navbar';
import Movies from './components/movies/Movies';
import Modal from './UI/modal/Modal';
import AddMovies from './components/movies/addMoviesForm/AddMovies';
import Button from './UI/button/Button';

function App() {
  const [movies, setMovies] = useState([]);
  const [addFormIsShowen, setAddFormIsShowen] = useState(false);

  const { isLoading, error, fetchData } = useHttp();

  useEffect(() => {
    const transferData = (dataObj) => {
      let newMovies = [];
      let i = 0;
      for (let dataKey in dataObj) {
        newMovies.push({
          id: dataKey,
          title: dataObj[dataKey].title,
          text: dataObj[dataKey].text,
          ref: null,
        });
      }
      setMovies(newMovies);
    };

    fetchData(
      {
        url: 'https://custom-hooks-test-25918-default-rtdb.firebaseio.com/movies.json',
      },
      transferData
    );

  }, [fetchData]);

  const showAddFormHandler = () => {
    setAddFormIsShowen(true);
  };

  const hideAddFormHandler = () => {
    setAddFormIsShowen(false);
  };

  const addMovieHandler = (movieObj) => {
    setMovies((prevMovies) => prevMovies.concat(movieObj));
    hideAddFormHandler();
  };

  return (
    <>
      <header>
        <Navbar items={movies} />
      </header>
      <Movies items={movies} loading={isLoading} err={error} />
      <Button type='open' onClick={showAddFormHandler} />
      {addFormIsShowen && (
        <Modal onClose={hideAddFormHandler}>
          <AddMovies onAddMovie={addMovieHandler} onHideModal={hideAddFormHandler} />
        </Modal>
      )}
    </>
  );
}

export default App;
