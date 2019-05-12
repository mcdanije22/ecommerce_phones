import React from 'react';
import './footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab, faFacebook, faInstagram, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

const Footer = () =>{
    return(
        <div id='footer'>
           <a href ='#'><button type='submit' id='footer-button'>
                Back to top
            </button></a>
            <div id='footer-bottom'>
                <ul id='footer-social'>
                    <li>
                        <FontAwesomeIcon icon={faFacebook} className='footer-socailButton'/>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faInstagram} className='footer-socailButton'/>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faTwitter} className='footer-socailButton'/>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faYoutube} className='footer-socailButton'/>
                    </li>
                </ul>
          
            </div>
            <div id='footer-middle'>
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
            <p id='footer-paragraph'><FontAwesomeIcon icon={faCopyright} id='footer-copyright'/> All rights reserved 2019
            <br/>1234 N. Main st New York, Ny 11124 USA</p>
        </div>
    )
};
export default Footer;