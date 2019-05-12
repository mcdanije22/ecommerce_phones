import React from 'react';
import './navbarMenu.scss';
import { Link } from 'react-router-dom'


const NavbarMenu = ({
    menuIsOpen,
    toggleNavbarMenu
})=>{
    return(
                <div style={{display:menuIsOpen?'block':'none'}}>
                    <div id='nav-menu'>
                        <ul id='menu-options'>
                        <li><Link to={'/'} onClick={toggleNavbarMenu} className='navList'>Home</Link></li>
                        <li><Link to={'/account'} onClick={toggleNavbarMenu} className='navList'>Account</Link></li> 
                        <li>Deals</li> 
                        <li>Phones</li> 
                        <li>Accessories</li> 
                        </ul>
                    </div>
                    <div id='menu-background'>
                    </div>
                </div>      
    )
}
export default NavbarMenu;




