import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import '../AddressBook/addressbook.scss';

class AddressBook extends Component{
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
        editModal: !prevState.editModal
            })
        );
      }
    getInput=(e)=>{
       this.setState({[e.target.name]:e.target.value}) 
    }
    onSubmitNewCard=()=>{
        const { card_name, card_number, exp_date, cvc  } = this.state;
        const currentWalletList = this.state.walletList;
        if(card_name === '' || card_number === '' || exp_date === '' || cvc === ''){
            alert('fill in all required fields')
        }else{
        const newCard = Object.assign({},{
            card_name,
            card_number,
            exp_date,
            cvc 
        });
        console.log(newCard)
        const newWalletList = [...currentWalletList, newCard];
        this.setState({walletList:newWalletList})
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
    onSubmiteditCard=()=>{
    const { card_name, card_number, exp_date, cvc  } = this.state;
    const id = this.state.selectedCard.id;
    console.log(id)
    const editedCard = Object.assign({},{
        customer_id: this.state.selectedCard.customer_id,
        card_name: card_name || this.state.selectedCard.card_name,
        card_number:card_number || this.state.selectedCard.card_number,
        exp_date: exp_date || this.state.selectedCard.exp_date,
        cvc: cvc || this.state.selectedCard.cvc
    });
    const editedWalletList = [...this.state.walletList];
    editedWalletList[id] = editedCard;
    this.setState({walletList:editedWalletList})
    console.log(editedWalletList)
    axios.put(`http://localhost:3000/editcard`, {
        customer_id: this.state.selectedCard.customer_id,
        card_name: card_name || this.state.selectedCard.card_name,
        card_number:card_number || this.state.selectedCard.card_number,
        exp_date: exp_date || this.state.selectedCard.exp_date,
        cvc: cvc || this.state.selectedCard.cvc
    })
    .catch(error=>{
        console.log(error)
    })
    this.editToggle(); 
}

    render(){
        const { walletList } = this.state;
    return(
        <div id ='addressBook'>
            <Button type='submit' onClick={this.toggle}>+new address</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} id='addressModal'>
                        <ModalBody >
                        <h3>Add Address</h3>
                            <form>
                                <input type='text' className='inputAddressAdd' placeholder='card nickname' name='card_name' value={this.state.card_name} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='credit card number' name='card_number' value={this.state.card_number} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='expiration date ' name='exp_date' value={this.state.exp_date} onChange={this.getInput}/>
                                <input type='text' className='inputAddressAdd' placeholder='security code' name='cvc' value={this.state.cvc} onChange={this.getInput}/>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button type='submit' onClick={this.onSubmitNewCard}>add addresss</Button>
                            <Button type='submit' onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

            <Modal isOpen={this.state.editModal} toggle={this.editToggle} id='addressModal'>
                <ModalBody >
                <h3>Edit Address</h3>
                    <form>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedCard.card_name} name='card_name' value={this.state.card_name} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedCard.card_number}  name='card_number' value={this.state.card_number} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedCard.exp_date}  name='exp_date' value={this.state.exp_date} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedCard.cvc}  name='cvc' value={this.state.cvc} onChange={this.getInput}/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' onClick={this.onSubmiteditCard}>Save changes</Button>
                    <Button type='submit' onClick={this.editToggle}>Cancel</Button>
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
                                <Button className='listButton' onClick={(e)=>{
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
                                <Button className='listButton' 
                                    onClick={()=>{                                 
                                        axios.delete(`http://localhost:3000/deletecard/${card_name}`)
                                        .then(this.setState({walletList:walletList.filter(item => item.card_name !== card_name)}))
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
export default AddressBook;