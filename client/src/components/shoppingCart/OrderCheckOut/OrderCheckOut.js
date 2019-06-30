import React,{Component} from 'react';
import './ordercheckout.scss';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { accountAddresses, accountCards } from '../../../actions/loginAction';


class OrderCheckOut extends Component{
    constructor(props){
        super(props);
       this.state={
        activeScreen:'address',
        modal:false,
        orderAddress:'',
        address_name:'',
        street:'',
        secondary:'',
        city:'',
        state:'',
        zipcode:'' 
       }
    }
    backHistory= () =>{
        this.props.history.goBack();
    }
    toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal,
          address_name:'',
          street:'',
          secondary:'',
          city:'',
          state:'',
          zipcode:''           
        }));
      }
      getInput=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
            console.log(this.state.orderAddress)
        }) 
     }
     

     onSubmitNewAddress=()=>{
        let { address_name, street, secondary, city, state, zipcode } = this.state;
        zipcode = parseInt(zipcode)
        const zipcodeCheck = Number.isInteger(zipcode);
        const zipcodeLength = zipcode.toString().length;
        if(address_name === '' || street === '' || city === '' || state === '' || zipcode === ''){
            alert('fill in all required fields')
        }else if(!zipcodeCheck || zipcodeLength !== 5){
            alert('please enter valid zipcode')
        }
        else{
        const newAddress = Object.assign({},{
            customer_id: this.props.currentAccount.customer_id,
            address_name,
            street,
            secondary,
            city,
            state,
            zipcode  
        });
        const newAddressBook = [...this.props.accountAddresses, newAddress]
        console.log(newAddressBook)
        this.props.getAccountAddresses(newAddressBook)
        console.log(this.props.accountAddresses)
        axios.post(`http://localhost:3000/addaddress`, {
            customer_id: this.props.currentAccount.customer_id,
            address_name,
            street,
            secondary,
            city,
            state,
            zipcode 
        })
        .catch(error=>{
            console.log(error)
        })
        this.toggle(); 
    }
}
isChecked=(e)=>{
    console.log(e.target.checked)
    if(e.target.checked){
        if(this.state.orderAddress !== ''){
            alert('select only one address')
            e.target.checked =false;
            // this.setState({orderAddress:e.target.id})
            }else{
        this.setState({orderAddress:e.target.id},()=>{
            console.log(this.state.orderAddress)
            })
        }
    }else if(!e.target.checked){
        this.setState({orderAddress:''})
    }
 }
addAddressToOrder=(e)=>{
    if(this.state.orderAddress === ''){
        alert('please select a shipping address')
    }else{
        this.setState({activeScreen:'payment'},()=>{
            console.log(this.state.activeScreen)
        })
      console.log(this.state.orderAddress)
    }
}

    render(){
        console.log(this.props)
        const{ accountAddresses, accountCards } = this.props;
        const { activeScreen } = this.state;
            return(
            <div id='mainContent'>
                <div id ='shippingAddress' style={{display:activeScreen === 'address'?'':'none'}}>
                <button onClick={this.backHistory} id='search-header'><FontAwesomeIcon icon={faChevronLeft}/> Back to cart</button>
                <h3>Shipping Address</h3>
                <Button type='submit' style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}} onClick={this.toggle}>+ Add Address</Button>
                    <div id='addressList'>
                        {
                            accountAddresses.map((address,i)=>{
                                return <div className='address' key={i}>
                                            <input type='checkbox' name='orderAddress' id={address.address_id || address.address_name} onChange={this.isChecked} /> 
                                            <div>
                                                <h5>{address.address_name}</h5>
                                                <p>{address.street}</p>
                                                <p>{address.city}, {address.state} {address.zipcode}</p>
                                            </div>
                                        </div>
                            })
                        }
                    </div>
                    
                </div>

                    {/* wallet */}
                <div id ='shippingAddress' style={{display:activeScreen === 'payment'?'':'none'}}>
                <button  id='search-header'><FontAwesomeIcon icon={faChevronLeft}/> Back to shipping options</button>
                <h3>Payment Option</h3>
                <Button type='submit' style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}} onClick={this.toggle}>+ Add Card</Button>
                    <div id='addressList'>
                        {
                            accountCards.map((card,i)=>{
                                return <div className='address' key={i}>
                                            <input type='checkbox' name='orderAddress' id={card.card_id || card.card_name} onChange={this.isChecked} /> 
                                            <div>
                                                <h5>{card.card_name}</h5>
                                                <p>{card.card_number}</p>
                                                <p>{card.cvc}</p>
                                                <p>{card.exp_date}</p>
                                            </div>
                                        </div>
                            })
                        }
                    </div>
                </div>
                
                <Modal isOpen={this.state.modal} toggle={this.toggle} id='addressModal'>
                        <ModalBody >
                        <h3>Add Address</h3>
                            <form>
                                <input type='text' className='inputAddressAdd' placeholder='address nickname' name='address_name' value={this.state.address_name} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='street address' name='street' value={this.state.street} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='apt, p.o box, etc..(optional)' name='secondary' value={this.state.secondary} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='city' name='city' value={this.state.city} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='state' name='state' value={this.state.state} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='zipcode' name='zipcode' value={this.state.zipcode} onChange={this.getInput}/>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button type='submit' style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}} onClick={this.onSubmitNewAddress}>Add addresss</Button>
                            <Button type='submit' style={{border:'1px #dc3545  solid', backgroundColor:'transparent', color:'#dc3545'}} onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <div id='bottomCheckOut'>
                    <Button type='submit' id='paymnetButton' onClick={this.addAddressToOrder}> Continue to payment </Button>
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
  const mapDispatchToProps = (dispatch) =>{
    return{
      getAccountAddresses: (list) => dispatch(accountAddresses(list)),
      getAccountCards: (list) =>dispatch(accountCards(list))
    }
  } 
export default connect(mapStateToProps, mapDispatchToProps)(OrderCheckOut);