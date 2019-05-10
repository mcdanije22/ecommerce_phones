import React, {Component} from 'react';
import './navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faUserCircle, faShoppingCart,faAdjust } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar/SearchBar';
import NavbarMenu from './NavbarMenu';




class NavBar extends Component{
    constructor(props){
        super(props);
            this.state={
                menuIsOpen:false
            }
    }
    toggleNavbarMenu = ()=>{
        this.setState({
            menuIsOpen:this.state.menuIsOpen?false:true
        },()=>{
            const bodyElement = document.querySelector('body');
            this.state.menuIsOpen?bodyElement.style.overflow = 'hidden':bodyElement.style.overflow = 'scroll';
        })
    }
    render(){
        return(
        <div id='navbar'>
            <div id = 'navbar-wrapper'>
                <div id='top-row-navbar'>
                    <div id= 'navbar-icon-group1'>
                        <FontAwesomeIcon id='navbar-logo' icon={faAdjust} />
                        {/* <p>PhoneOutlet</p> */}
                        <FontAwesomeIcon id='navbar-menu' icon={faBars} onClick={this.toggleNavbarMenu}/>
                    </div>
                    <div id= 'navbar-icon-group2'>
                        <FontAwesomeIcon id='navbar-user' icon={faUserCircle} />
                        <FontAwesomeIcon id='navbar-cart' icon={faShoppingCart} />
                    </div>
                </div>
                <SearchBar />
            </div>
            <NavbarMenu 
                menuIsOpen={this.state.menuIsOpen} 
                toggleNavbarMenu={this.toggleNavbarMenu}
            />

        </div>
        )
    }
}
export default NavBar;


