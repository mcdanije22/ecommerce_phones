import React,{Component} from 'react';
import './ordercheckout.scss';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

class OrderCheckOut extends Component{
    constructor(props){
        super(props);
       
    }
    backHistory= () =>{
        this.props.history.goBack();
    }
    render(){
        console.log(this.props)
        return(
            <div id='mainContent'>
                <div id ='shippingAddress'>
                <button onClick={this.backHistory} id='search-header'><FontAwesomeIcon icon={faChevronLeft}/> Back to cart</button>
                <h3>Shipping Address</h3>
                    <div id='addressList'>
                        <div className='address'>
                            <input type='checkbox'/> 
                            <div>
                            <h5>Test</h5>
                            <p>123 main st</p>
                            <p>Rochester, Ny 14624</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      currentAccount: state.account.currentAccount,
      accountAddresses: state.account.accountAddresses,
      accountCards: state.account.accountCards    
    }
  }
export default connect(mapStateToProps)(OrderCheckOut);