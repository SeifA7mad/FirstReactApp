import { useContext } from 'react';

import NavbarItem from './NavbarItem';
import { MoviesContext } from '../../context/moviesContext/MoviesProvider';

import classes from './Navbar.module.css';

const Navbar = () => {
  const moviesCtx = useContext(MoviesContext);

  let content = null;
  if (moviesCtx.movies.size > 0) {
    content = (
      <ul>
        {Array.from(moviesCtx.movies).map(([id,item]) => {
          return (
            <NavbarItem
              key={id}
              title={item.title}
              refComp={item.ref}
            />
          );
        })}
      </ul>
    );
  }
  return <nav className={classes.nav}> {content} </nav>;
};

export default Navbar;
