import React from 'react';
import './navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faUserCircle, faShoppingCart,faAdjust } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar/SearchBar';




const NavBar = ()=>{
    return(
        
    <div id = 'navbar-wrapper'>
        <div id='top-row-navbar'>
            <div id= 'navbar-icon-group1'>
                <FontAwesomeIcon id='navbar-logo' icon={faAdjust} />
                <FontAwesomeIcon id='navbar-menu' icon={faBars} />
            </div>
            <div id= 'navbar-icon-group2'>
                <FontAwesomeIcon id='navbar-user' icon={faUserCircle} />
                <FontAwesomeIcon id='navbar-cart' icon={faShoppingCart} />
            </div>
        </div>
        <SearchBar />
    </div>
    )
}
export default NavBar;