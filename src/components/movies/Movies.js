
import Button from '../../UI/button/Button';
import MoviesItem from './movies-item/MoviesItem';

import classes from './Movies.module.css';

const Movies = (props) => {
    let moviesList = <h2> No Movies tonight... </h2>;

    if (props.items.length > 0) {
        moviesList = props.items.map((item) => {
            return <MoviesItem key={item.id} title={item.title} text={item.text} refComp={item.ref}/>
        });
    }

    let content = moviesList;

    if (props.loading) {
        content = <h2> Please wait.... </h2>;
    }

    if (props.err) {
        content = <Button type='cancel' onClick={props.onFetch}> Try again </Button>;
    }

    return (
        <div className={classes.movies}>
            {content}
        </div>
    );
};

export default Movies;