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
        addressModal:false,
        paymentModal:false,
        orderInfo:'',
        orderAddress:'',
        orderPayment:'',
        address_name:'',
        street:'',
        secondary:'',
        city:'',
        state:'',
        zipcode:'',
        card_name:'',
        card_number:'',
        cvc:'',
        exp_date:''  
       }
    }
    backHistory= () =>{
        this.props.history.goBack();
    }
    paymentToggle = () => {
        this.setState(prevState => ({
        paymentModal: !prevState.paymentModal,
        card_name:'',
        card_number:'',
        cvc:'',
        exp_date:''              
        }));
      }
      addressToggle = () => {
        this.setState(prevState => ({
         addressModal: !prevState.addressModal,
          address_name:'',
          street:'',
          secondary:'',
          city:'',
          state:'',
          zipcode:'',
          card_name:'',
          card_number:'',
          cvc:'',
          exp_date:''               
        }));
      }
      getInput=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
            console.log(this.state.orderAddress)
        }) 
     }
     

//      onSubmitNewAddress=()=>{
//         let { address_name, street, secondary, city, state, zipcode } = this.state;
//         zipcode = parseInt(zipcode)
//         const zipcodeCheck = Number.isInteger(zipcode);
//         const zipcodeLength = zipcode.toString().length;
//         if(address_name === '' || street === '' || city === '' || state === '' || zipcode === ''){
//             alert('fill in all required fields')
//         }else if(!zipcodeCheck || zipcodeLength !== 5){
//             alert('please enter valid zipcode')
//         }
//         else{
//         const newAddress = Object.assign({},{
//             customer_id: this.props.currentAccount.customer_id,
//             address_name,
//             street,
//             secondary,
//             city,
//             state,
//             zipcode  
//         });
//         const newAddressBook = [...this.props.accountAddresses, newAddress]
//         console.log(newAddressBook)
//         this.props.getAccountAddresses(newAddressBook)
//         console.log(this.props.accountAddresses)
//         axios.post(`http://localhost:3000/addaddress`, {
//             customer_id: this.props.currentAccount.customer_id,
//             address_name,
//             street,
//             secondary,
//             city,
//             state,
//             zipcode 
//         })
//         .catch(error=>{
//             console.log(error)
//         })
//         this.addressToggle(); 
//     }
// }

// current
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
    axios.post(`http://localhost:3000/addaddress`, {
        customer_id: this.props.currentAccount.customer_id,
        address_name,
        street,
        secondary,
        city,
        state,
        zipcode 
    })
    .then(data=>{
        console.log(data)
        const newAddress = Object.assign({},{
            customer_id: this.props.currentAccount.customer_id,
            address_id:data.data[0].address_id,
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
    })
    .catch(error=>{
        console.log(error)
    })
    this.addressToggle(); 
}
}

onSubmitNewCard=()=>{
    let { card_name, card_number, exp_date, cvc  } = this.state;
    card_number = parseInt(card_number)
    cvc = parseInt(cvc)
    console.log(Number.isInteger(card_number))
    const numberCheck = Number.isInteger(card_number);
    const cvcCheck = Number.isInteger(cvc);
    const cardNumberLength = card_number.toString().length;
    const cardCvcLength = cvc.toString().length;
    if(card_name === '' || card_number === '' || exp_date === '' || cvc === ''){
    alert('fill in all required fields')
    } else if(!numberCheck && !cvcCheck){
        alert('enter vaild numbers in fields')
        this.setState({card_number:'', cvc:''})
    }
     else if(!numberCheck || cardNumberLength !== 16){
        alert('enter vaild card number')
        this.setState({card_number:''})
    }else if(!cvcCheck || cardCvcLength > 3 && cardCvcLength > 5){
        alert('enter vaild security number')
        this.setState({cvc:''})
    }
    else{
    const newCard = Object.assign({},{
        card_name,
        card_number,
        exp_date,
        cvc 
    });
    console.log(newCard)
    const newWalletList = [...this.props.accountCards, newCard];
    this.props.getAccountCards(newWalletList)
    console.log(newWalletList)
    axios.post(`http://localhost:3000/addcard`, {
        customer_id: this.props.location.state.customerid,
        card_name,
        card_number,
        exp_date,
        cvc 
    })
    .catch(error=>{
        console.log(error)
    })
    this.paymentToggle(); 
    }
}

isChecked=(e)=>{
    console.log(e.target.checked)
    if(e.target.checked){
        if(this.state.orderAddress !== ''){
            alert('select only one address')
            e.target.checked =false;
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
isCheckedWalet=(e)=>{
    console.log(e.target.checked)
    if(e.target.checked){
        if(this.state.orderPayment !== ''){
            alert('select only one payment option')
            e.target.checked = false;
            }else{
        this.setState({orderPayment:e.target.id},()=>{
            console.log(this.state.orderPayment)
            })
        }
    }else if(!e.target.checked){
        this.setState({orderPayment:''})
    }
 }
 addPaymentToOrder=(e)=>{
     const { orderAddress, orderPayment } = this.state;
     const customerid = this.props.currentAccount.customer_id;
    if(this.state.orderPayment === ''){
        alert('please select a payment option')
    }else{
        this.setState({activeScreen:'review'},()=>{
            console.log(this.state.activeScreen)
            axios.get(`http://localhost:3000/orderaccountinfo/${orderAddress}/${orderPayment}/${customerid}`)
            .then(res=>{
                this.setState({orderInfo:res.data},()=>{
                    console.log(this.state.orderInfo)
                })
              })
        })
    }
}
changeScreen=()=>{
    let { activeScreen } = this.state;
    if(activeScreen == 'payment'){
        this.setState({activeScreen:'address'})
    } else if(activeScreen == 'review'){
        this.setState({activeScreen:'payment'})
    }
}
    render(){
        console.log(this.props)
        const{ accountAddresses, accountCards } = this.props;
        const { activeScreen } = this.state;
            return(
            <div id='mainContent'>
            
                    {/* shipping addresss */}
                <div id ='shippingAddress' style={{display:activeScreen === 'address'?'':'none'}}>
                <button onClick={this.backHistory} id='search-header'><FontAwesomeIcon icon={faChevronLeft}/> Back to cart</button>
                <h3>Shipping Address</h3>
                <Button type='submit' style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}} onClick={this.addressToggle}>+ Add Address</Button>
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
                    <div id='bottomCheckOut'>
                    <Button type='submit' id='orderButton' onClick={this.addAddressToOrder}> Continue to payment </Button>
                    </div>
                </div>

                    {/* wallet */}
                <div id ='shippingAddress' style={{display:activeScreen === 'payment'?'':'none'}}>
                <button id='search-header' onClick={this.changeScreen}><FontAwesomeIcon icon={faChevronLeft}/> Back to shipping options</button>
                <h3>Payment Option</h3>
                <Button type='submit' style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}} onClick={this.paymentToggle}>+ Add Card</Button>
                    <div id='addressList'>
                        {
                            accountCards.map((card,i)=>{
                                return <div className='address' key={i}>
                                            <input type='checkbox' name='orderPayment' id={card.card_id || card.card_name} onChange={this.isCheckedWalet} /> 
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
                    <div id='bottomCheckOut'>
                    <Button type='submit' id='orderButton' onClick={this.addPaymentToOrder}> Review order </Button>
                    </div>

               
                </div>
                {/* review order */}
                <div id ='shippingAddress' style={{display:activeScreen === 'review'?'':'none'}}>
                            <button onClick={this.changeScreen} id='search-header'><FontAwesomeIcon icon={faChevronLeft}/> Back to payment option</button>
                            <h3>Order Summary</h3>
                                <div id='addressList'>
                                </div>
                                <div id='bottomCheckOut'>
                                <Button type='submit' id='orderButton' onClick={this.addAddressToOrder}> Place order </Button>
                                </div>

                            </div>
                
                <Modal isOpen={this.state.addressModal} toggle={this.addressToggle} id='addressModal'>
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
                            <Button type='submit' style={{border:'1px #dc3545  solid', backgroundColor:'transparent', color:'#dc3545'}} onClick={this.addressToggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.paymentModal} toggle={this.paymentToggle} id='addressModal'>
                        <ModalBody >
                        <h3>Add Payment</h3>
                        <form>
                                <input type='text' className='inputAddressAdd' placeholder='Card Nickname' name='card_name' value={this.state.card_name} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='Card #' name='card_number' value={this.state.card_number} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='MM/YY ' name='exp_date' value={this.state.exp_date} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='CVC' name='cvc' value={this.state.cvc} onChange={this.getInput}/>
                        </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button type='submit' style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}} onClick={this.onSubmitNewCard}>Add addresss</Button>
                            <Button type='submit' style={{border:'1px #dc3545  solid', backgroundColor:'transparent', color:'#dc3545'}} onClick={this.paymentToggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
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