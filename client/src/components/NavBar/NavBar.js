import React, {Component} from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faUserCircle, faShoppingCart,faHome } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar/SearchBar';
import NavbarMenu from './NavbarMenu';
import { setSearchField, clearSearchField } from '../../actions/searchAction'
import { connect } from 'react-redux';



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
        const {searchField , onSearchChange,clearsearchField, currentAccount, loggedIn} = this.props;
        const customerid = currentAccount.customer_id; 
        return(
        <div id='navbar'>
            <div id = 'navbar-wrapper'>
                <div id='top-row-navbar'>
                    <div id= 'navbar-icon-group1'>
                        {/* <Link to={'/'} ><FontAwesomeIcon id='navbar-logo' icon={faHome} /></Link>  */}
                        {/* <p>PhoneOutlet</p> */}
                        <FontAwesomeIcon id='navbar-menu' icon={faBars} onClick={this.toggleNavbarMenu}/>
                    </div>
                    <div id= 'navbar-icon-group2'>
                        <Link to={loggedIn?'/account':'/login'} ><FontAwesomeIcon id='navbar-user' icon={faUserCircle} /></Link>
                        <Link to={`/cart/${customerid}`}><FontAwesomeIcon id='navbar-cart' icon={faShoppingCart} /></Link>
                    </div>
                </div>
                <SearchBar 
                onSearchChange={onSearchChange} 
                clearsearchField={clearsearchField}
                searchField={searchField} 
                />
            </div>
            <NavbarMenu 
                menuIsOpen={this.state.menuIsOpen} 
                toggleNavbarMenu={this.toggleNavbarMenu}
                loggedIn = {loggedIn}
            />
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      searchField: state.search.searchField,
      currentAccount: state.account.currentAccount,
      loggedIn: state.account.loggedIn
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return{
      onSearchChange: (e) => dispatch(setSearchField(e.target.value)),
      clearsearchField: ()=> dispatch(clearSearchField())
    }
  } 

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);


