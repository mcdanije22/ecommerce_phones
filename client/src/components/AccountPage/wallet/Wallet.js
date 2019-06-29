import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { accountCards } from '../../../actions/loginAction';
import '../AddressBook/addressbook.scss';

class Wallet extends Component{
    constructor(props){
        super(props);
        this.state={
            walletList:[],
            card_name:'',
            card_number:'',
            exp_date:'',
            cvc:'',
            modal:false,
            editModal:false,
            selectedCard:''
        }
    }
    componentDidMount(){
        const customerid=this.props.location.state.customerid
        console.log(customerid)
        axios.get(`http://localhost:3000/wallet/${customerid}`)
        .then(data=>{
            this.setState({walletList:data.data},()=>{
                console.log(this.state.walletList)
            })
        })
    }
    toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal,
          card_name:'',
          card_number:'',
          exp_date:'',
          cvc:''           
        }));
      }
      editToggle = () => {
        this.setState(prevState => ({
        editModal: !prevState.editModal,
        card_number:'',
        exp_date:'',
        cvc:''  
            })
        );
      }
    getInput=(e)=>{
       this.setState({[e.target.name]:e.target.value}) 
    }
   

onSubmitNewCard=()=>{
    let { card_name, card_number, exp_date, cvc  } = this.state;
    const currentWalletList = this.state.walletList;
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
    const newWalletList = [...currentWalletList, newCard];
    this.setState({walletList:newWalletList})
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
    this.toggle(); 
    }
}
    editCard = (card_name, card_number, exp_date, cvc,id) =>{
        const editedCard = Object.assign({},{
                customer_id: this.state.selectedCard.customer_id,
                card_name: this.state.selectedCard.card_name,
                card_number:card_number || this.state.selectedCard.card_number,
                exp_date: exp_date || this.state.selectedCard.exp_date,
                cvc: cvc || this.state.selectedCard.cvc
        });
        const editedWalletList = [...this.state.walletList];
        editedWalletList[id] = editedCard;
        this.setState({walletList:editedWalletList})
        this.props.getAccountCards(editedWalletList)
        console.log(editedWalletList)
        axios.put(`http://localhost:3000/editcard`, {
            customer_id: this.state.selectedCard.customer_id,
            card_name:this.state.selectedCard.card_name,
            card_number:card_number || this.state.selectedCard.card_number,
            exp_date: exp_date || this.state.selectedCard.exp_date,
            cvc: cvc || this.state.selectedCard.cvc
        })
        .catch(error=>{
            console.log(error)
        })
        this.editToggle(); 
    }
    onSubmiteditCard=()=>{
    let { card_name, card_number, exp_date, cvc  } = this.state;
    console.log(card_number, cvc)
    const id = this.state.selectedCard.id;
    console.log(id)
    const cardNumberLength = card_number.toString().length;
    const cardCvcLength = cvc.toString().length;
    console.log(cardCvcLength)
    if(card_number !== ''){
        card_number = parseInt(card_number)
        const numberCheck = Number.isInteger(card_number);
        if(!numberCheck || cardNumberLength !== 16){
            alert('enter valid card number')
            this.setState({card_number:''})
        }else{
            this.editCard(card_name, card_number, exp_date, cvc, id);
        }
    }else if(cvc !== ''){
        cvc = parseInt(cvc)
        const cvcCheck = Number.isInteger(cvc);
        if(!cvcCheck || cardCvcLength > 3 && cardCvcLength > 5){
            alert('enter valid security number')
            this.setState({cvc:''})
        }else{
            this.editCard(card_name, card_number, exp_date, cvc, id); 
        }
    }
}
    render(){
        const { walletList } = this.state;
    return(
        <div id ='addressBook'>
            <h2>Card wallet</h2>
            <Button type='submit' 
             style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}}
             onClick={this.toggle}>new card</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} id='addressModal'>
                        <ModalBody >
                        <h3>Add Card</h3>
                            <form>
                                <input type='text' className='inputAddressAdd' placeholder='Card Nickname' name='card_name' value={this.state.card_name} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='Card #' name='card_number' value={this.state.card_number} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='MM/YY ' name='exp_date' value={this.state.exp_date} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='CVC' name='cvc' value={this.state.cvc} onChange={this.getInput}/>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button type='submit' style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}}  onClick={this.onSubmitNewCard}>Add card</Button>
                            <Button type='submit' style={{border:'1px #dc3545  solid', backgroundColor:'transparent', color:'#dc3545'}} onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

            <Modal isOpen={this.state.editModal} toggle={this.editToggle} id='addressModal'>
                <ModalBody >
                <h3>Edit Card:</h3><h4 style={{textAlign:'center'}}>{this.state.selectedCard.card_name}</h4> 
                    <form>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedCard.card_number}  name='card_number' value={this.state.card_number} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedCard.exp_date}  name='exp_date' value={this.state.exp_date} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedCard.cvc}  name='cvc' value={this.state.cvc} onChange={this.getInput}/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}}  onClick={this.onSubmiteditCard}>Save changes</Button>
                    <Button type='submit' style={{border:'1px #dc3545  solid', backgroundColor:'transparent', color:'#dc3545'}}  onClick={this.editToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <ul id='addressList'>
            {
                walletList.map((item,i)=>{
                const { card_name, card_number, exp_date, cvc, customer_id } = item;
                return(
                        <li key={i} className='address' >
                            <h5>{card_name}</h5>
                            <p>{card_number}</p>
                            <p>{exp_date}</p>
                            <p>{cvc}</p>
                            <div className='bottomButtons'>
                                <Button className='listButton'
                                style={{border:'1px #868e96  solid', backgroundColor:'transparent', color:'#868e96'}}
                                onClick={(e)=>{
                                      const currentCard = Object.assign({},{
                                        id:i,
                                        card_name,
                                        card_number,
                                        exp_date,
                                        cvc,  
                                        customer_id  
                                    });
                                    this.setState({selectedCard:currentCard},()=>{
                                        console.log(this.state.selectedCard)
                                    })
                                    this.editToggle();
                                }}>Edit</Button>
                                <Button 
                                className='listButton' 
                                style={{border:'1px #dc3545  solid', backgroundColor:'transparent', color:'#dc3545'}} 
                                    onClick={()=>{                                 
                                        axios.delete(`http://localhost:3000/deletecard/${card_name}`)
                                        .then(this.setState({walletList:walletList.filter(item => item.card_name !== card_name)}))
                                        .then(this.props.getAccountCards(walletList.filter(item => item.card_name !== card_name)))
                                }}>Delete</Button>
                            </div>
                        </li>
                    );
                })
            }
            </ul>
        </div>
    )}
}
const mapDispatchToProps = (dispatch) =>{
    return{
        getAccountCards: (list) =>dispatch(accountCards(list))
    }
  } 
export default connect(null, mapDispatchToProps )(Wallet);