import { useState } from 'react';

import MoviesProvider from './context/moviesContext/MoviesProvider';

import Navbar from './UI/navbar/Navbar';
import Movies from './components/movies/Movies';
import Modal from './UI/modal/Modal';
import AddMovies from './components/movies/addMoviesForm/AddMovies';
import Button from './UI/button/Button';

function App() {
  const [addFormIsShowen, setAddFormIsShowen] = useState(false);

  const showAddFormHandler = () => {
    setAddFormIsShowen(true);
  };

  const hideAddFormHandler = () => {
    setAddFormIsShowen(false);
  };

  return (
    <MoviesProvider>
      <header>
        <Navbar/>
      </header>
      <Movies />
      <Button type='open' onClick={showAddFormHandler} />
      {addFormIsShowen && (
        <Modal onClose={hideAddFormHandler}>
          <AddMovies onHideModal={hideAddFormHandler} />
        </Modal>
      )}
    </MoviesProvider>
  );
}

export default App;
