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
  const moviesRef = useRef(new Map());
  const [mRefs, setMRefs] = useState(new Map());

  const { isLoading, error, fetchData } = useHttp();

  const addMovieRef = (id, ref) => {
    moviesRef.current.set(id, ref);

    setMRefs(moviesRef);
  };

  useEffect(() => {
    const transferData = (dataObj) => {
      let newMovies = [];
      for (let dataKey in dataObj) {
        newMovies.push({
          id: dataKey,
          title: dataObj[dataKey].title,
          text: dataObj[dataKey].text
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
        {mRefs.size !== 0 && <Navbar items={movies} moviesRef={mRefs}/>}
      </header>
      <Movies
        items={movies}
        loading={isLoading}
        err={error}
        onAddMoviesRef={addMovieRef}
      />
      <Button type='open' onClick={showAddFormHandler} />
      {addFormIsShowen && (
        <Modal onClose={hideAddFormHandler}>
          <AddMovies
            onAddMovie={addMovieHandler}
            onHideModal={hideAddFormHandler}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
