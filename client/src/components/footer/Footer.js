import React,{Component} from 'react';
import './footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab, faFacebook, faInstagram, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SearchPage from '..//SearchPage/SearchPage';
import { connect } from 'react-redux';

class Footer extends Component{
    constructor(){
        super();
    }
    render(){
        const { loggedIn } = this.props;
        const { customer_id } = this.props.currentAccount;
    return(
        <div id='footer'>
           <a href ='#'><button type='submit' id='footer-button'>
                Back to top
            </button></a>
            <div id='footer-bottom'>
                <ul id='footer-social'>
                    <a href='https://www.facebook.com/GameStop/' target='_blank'><li>
                        <FontAwesomeIcon icon={faFacebook} className='footer-socailButton'/>
                    </li></a>
                    <a href='https://www.instagram.com/gamestop/' target='_blank'><li>
                        <FontAwesomeIcon icon={faInstagram} className='footer-socailButton'/>
                    </li></a>
                    <a href='https://twitter.com/GameStop?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' target='_blank'><li>
                        <FontAwesomeIcon icon={faTwitter} className='footer-socailButton'/>
                    </li></a>
                    <a href='https://www.youtube.com/user/GamestopVideo' target='_blank'><li>
                        <FontAwesomeIcon icon={faYoutube} className='footer-socailButton'/>
                    </li></a>
                </ul>
            </div>
            <div id='footer-middle' >
                <ul id='row-one' >
                    <li ><Link to={`/search/Apple`}  component={SearchPage}>Apple</Link></li>
                    <li ><Link to={`/search/Samsung`}  component={SearchPage}>Samsung</Link></li>
                    <li ><Link to={`/search/Lg`}  component={SearchPage}>Lg</Link></li>
                </ul>
                <ul id='row-two'>
                    <li><a href='mailto:someone@example.com?Subject=Hello%20again' target='_top'>Contact us</a></li>
                    <a href='https://twitter.com/GameStop?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' target='_blank'>
                        <li>Follow us</li>
                    </a>
                    <li><a href='https://goo.gl/maps/47VbM7kj5DxTiPHj7' target='_blank'>Find us</a></li>
                </ul>
                <ul id='row-three'>
                    <Link to={loggedIn?'/account':'/login'} ><li>Sign in</li></Link>
                    <Link to={loggedIn?'/account':'/login'} > <li>Account</li></Link>
                    <Link to={`/cart/${customer_id}`}><li>Cart</li></Link>
                </ul>
                
            </div>
            <p id='footer-paragraph'><FontAwesomeIcon icon={faCopyright} id='footer-copyright'/> All rights reserved 2019
            <br/>1234 N. Main st New York, Ny 11124 USA</p>
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      currentAccount: state.account.currentAccount,
      loggedIn: state.account.loggedIn
    }
  }
export default connect(mapStateToProps, null)(Footer);