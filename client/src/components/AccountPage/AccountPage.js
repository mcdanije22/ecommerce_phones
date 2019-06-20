import React, {Component} from 'react';
import './accountpage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBoxOpen, faHome, faCreditCard, faLock, faSignOutAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';

class AccountPage extends Component{
    constructor(){
        super();
    }
    render(){
        console.log(this.props.currentAccount)
        const {first_name, last_name, customer_id} = this.props.currentAccount;
        console.log(first_name)
        return(
            <div id='AccountPage'>
                <h3>My Account</h3>
                <ul id='accountOptions'>
                    <hr />
                    <li>
                        <FontAwesomeIcon icon={faBoxOpen} className='accountIcons'/> 
                            Orders 
                        <FontAwesomeIcon icon={faChevronRight} className='accountIconsRight'/> 
                    </li>
                    <hr />
                    <Link to={{
                        pathname:`/address/${customer_id}`,
                        state:{customerid:customer_id}
                    }} >                    
                    <li>
                        <FontAwesomeIcon icon={faHome} className='accountIcons'/> 
                            Address Book 
                        <FontAwesomeIcon icon={faChevronRight} className='accountIconsRight'/>
                    </li>
                    </Link>
                    <hr />
                    <Link to={{
                        pathname:`/wallet/${customer_id}`,
                        state:{customerid:customer_id}
                    }} >  
                    <li>
                        <FontAwesomeIcon icon={faCreditCard} className='accountIcons'/> 
                            Wallet 
                        <FontAwesomeIcon icon={faChevronRight} className='accountIconsRight'/>
                    </li>
                    </Link>
                    <hr />
                    <li>
                        <FontAwesomeIcon icon={faLock} className='accountIcons'/>  
                            Change Password 
                        <FontAwesomeIcon icon={faChevronRight} className='accountIconsRight'/>
                    </li>
                    <hr />
                    <li>
                        <FontAwesomeIcon icon={faSignOutAlt} className='accountIcons'/>
                            Sign Out 
                        <FontAwesomeIcon icon={faChevronRight} className='accountIconsRight'/>
                    </li>
                    <hr />
                </ul>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        currentAccount: state.account.currentAccount
    }
  }
export default connect(mapStateToProps, null)(AccountPage);
