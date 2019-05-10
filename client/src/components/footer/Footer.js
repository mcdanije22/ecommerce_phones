import React from 'react';
import './footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

const Footer = () =>{
    return(
        <div id='footer'>
            <button type='submit' id='footer-button'>
                Back to top
            </button>
            <div id='footer-content'>
                <ul id='row-one'>
                    <li>Apple</li>
                    <li>Samsung</li>
                    <li>LG</li>
                </ul>
                <ul id='row-two'>
                    <li>Contact us</li>
                    <li>Follow us</li>
                    <li>Find us</li>
                </ul>
                <ul id='row-three'>
                    <li>Register</li>
                    <li>Sign in</li>
                    <li>Cart</li>
                </ul>
            </div>
            <div id='footer-bottom'>
                <p><FontAwesomeIcon icon={faCopyright} id='footer-copyright'/> All rights reserved 2019</p>
            </div>
        </div>
    )
};
export default Footer;