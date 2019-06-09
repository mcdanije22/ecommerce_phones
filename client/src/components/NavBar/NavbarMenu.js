import React from 'react';
import './navbarMenu.scss';
import { Link } from 'react-router-dom'


const NavbarMenu = ({
    menuIsOpen,
    toggleNavbarMenu,
    loggedIn
})=>{
    return(
                <div style={{display:menuIsOpen?'block':'none'}}>
                    <div id='nav-menu'>
                        <ul id='menu-options'>
                        <li><Link to={'/'} onClick={toggleNavbarMenu} className='navList'>Home</Link></li>
                        <li><Link to={loggedIn?'/account':'/login'} onClick={toggleNavbarMenu} className='navList'>Account</Link></li> 
                        <li><Link to={'/search/deals'} onClick={toggleNavbarMenu} className='navList'>Deals</Link></li> 
                        <li><Link to={'/search/phone'} onClick={toggleNavbarMenu} className='navList'>Phones</Link></li> 
                        <li><Link to={'/search/accessory'} onClick={toggleNavbarMenu} className='navList'>Accessories</Link></li> 
                        </ul>
                    </div>
                    <div id='menu-background'>
                    </div>
                </div>      
    )
}
export default NavbarMenu;




