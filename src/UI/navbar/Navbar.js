import { useContext } from 'react';

import NavbarItem from './NavbarItem';
import { MoviesContext } from '../../context/moviesContext/MoviesProvider';

import classes from './Navbar.module.css';

const Navbar = (props) => {
  const moviesCtx = useContext(MoviesContext);

  let content = null;
  if (moviesCtx.movies.length > 0) {
    content = (
      <ul>
        {moviesCtx.movies.map((item) => {
          return (
            <NavbarItem
              key={item.id}
              title={item.title}
              
            />
          );
        })}
      </ul>
    );
  }
  return <nav className={classes.nav}> {content} </nav>;
};

export default Navbar;
