import NavbarItem from './NavbarItem';

import classes from './Navbar.module.css';

const Navbar = (props) => {
  let content = null;
  if (props.items.length > 0) {
    content = (
      <ul>
        {props.items.map((item) => {
          return <NavbarItem key={item.id} title={item.title} refComp={item.ref} />;
        })}
      </ul>
    );
  }
  return <nav className={classes.nav}> {content} </nav>;
};

export default Navbar;
