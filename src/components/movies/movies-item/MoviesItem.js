import { useState } from 'react';

import classes from './MoviesItem.module.css';

const MoviesItem = (props) => {
  const [isShowen, setIsShowen] = useState(true);

  const collapseSectionHandler = () => {
    setIsShowen((prevIsShown) => !prevIsShown);
  };
  
  return (
    <section ref={(ref) => props.onAddMoviesRef(props.id, ref)} className={classes.moviesItem}>
      <h3>
        {props.title}
        <i
          className={`${classes.arrow} ${
            isShowen ? classes.arrowUp : classes.arrowDown
          }`}
          onClick={collapseSectionHandler}
        ></i>
      </h3>
      {isShowen && <p> {props.text} </p>}
    </section>
  );
};

export default MoviesItem;
