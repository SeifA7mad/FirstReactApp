import classes from './NavbarItem.module.css';

const NavbarItem = (props) => {

    const navigateTo = (refComp) => {
        refComp.current.scrollIntoView({ behavior: 'smooth' });
    };

    return <li className={classes.navbarItem} onClick={()=>navigateTo(props.refComp)}> {props.title} </li>
};

export default NavbarItem;