import React,{Component} from 'react';
import { connect } from 'react-redux';

class OrderCheckOut extends Component{
    constructor(props){
        super(props);
       
    }
    render(){
        console.log(this.props)
        return(
            <div></div>
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