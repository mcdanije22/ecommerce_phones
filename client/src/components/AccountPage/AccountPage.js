import React, {Component} from 'react';
import './accountpage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faHome, faCreditCard, faLock, faSignOutAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';

class AccountPage extends Component{
    constructor(){
        super()
    }
    render(){
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
                    <li>
                        <FontAwesomeIcon icon={faHome} className='accountIcons'/> 
                            Address Book 
                        <FontAwesomeIcon icon={faChevronRight} className='accountIconsRight'/>
                    </li>
                    <hr />
                    <li>
                        <FontAwesomeIcon icon={faCreditCard} className='accountIcons'/> 
                            Wallet 
                        <FontAwesomeIcon icon={faChevronRight} className='accountIconsRight'/>
                    </li>
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
export default AccountPage;
