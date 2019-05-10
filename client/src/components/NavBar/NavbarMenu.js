import React from 'react';
import './navbarMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes } from '@fortawesome/free-solid-svg-icons';

const NavbarMenu = ({
    menuIsOpen,
    toggleNavbarMenu
})=>{
    return(
        <React.Fragment>
            <div id='nav-menu'>
            {/* <button type='submit'><FontAwesomeIcon id='menu-exit' icon={faTimes} /></button> */}
                <ul id='menu-options'>
                   <li>Home</li> 
                   <li>Account</li> 
                   <li>Deals</li> 
                   <li>Phones</li> 
                   <li>Accessories</li> 

                </ul>
            </div>
            <div id='menu-background'>
            </div>
        </React.Fragment>
    )
}
export default NavbarMenu;




