import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import './addressbook.scss';

class AddressBook extends Component{
    constructor(props){
        super(props);
        this.state={
            addressBook:[],
            address_name:'',
            street:'',
            secondary:'',
            city:'',
            state:'',
            zipcode:'' ,
            modal:false,
            editModal:false,
            selectedAddress:''
        }
    }
    componentDidMount(){
        const customerid=this.props.location.state.customerid
        axios.get(`http://localhost:3000/address/${customerid}`)
        .then(data=>{
            // const addressList=data.data;
            // addressList.map((item,i)=>{
            //     const newAddressBook = [];
            //     console.log(newAddressBook)
            //     newAddressBook.push(item)
            //     this.setState({addressBook:newAddressBook})
            // })
            this.setState({addressBook:data.data},()=>{
                console.log(this.state.addressBook)
            })
            // this.setState({address:data.data})
        })
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
      editToggle = () => {
        this.setState(prevState => ({
        editModal: !prevState.editModal
        })
        );
      }
    getInput=(e)=>{
       this.setState({[e.target.name]:e.target.value}) 
    }
    onSubmitNewAddress=()=>{
            const { address_name, street, secondary, city, state, zipcode } = this.state;
        const currentAddressList = this.state.addressBook;
        if(address_name === '' || street === '' || city === '' || state === '' || zipcode === ''){
            alert('fill in all required fields')
        }else if(zipcode.length !== 5){
            alert('please enter valid zipcode')
        }
        else{
        const newAddress = Object.assign({},{
            address_name,
            street,
            secondary,
            city,
            state,
            zipcode  
        });
        console.log(newAddress)
        const newAddressBook = [...currentAddressList, newAddress];
        this.setState({addressBook:newAddressBook})
        console.log(newAddressBook)
        axios.post(`http://localhost:3000/addaddress`, {
            customer_id: this.props.location.state.customerid,
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
 
    render(){
        const { addressBook } = this.state;
    return(
        <div id ='addressBook'>
            <Button type='submit' onClick={this.toggle}>+new address</Button>
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
                            <Button type='submit' onClick={this.onSubmitNewAddress}>add addresss</Button>
                            <Button type='submit' onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

            <Modal isOpen={this.state.editModal} toggle={this.editToggle} id='addressModal'>
                <ModalBody >
                <h3>Edit Address</h3>
                    <form>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedAddress.address_name} name='address_name' value={this.state.address_name} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedAddress.street}  name='street' value={this.state.street} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedAddress.secondary}  name='secondary' value={this.state.secondary} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedAddress.city}  name='city' value={this.state.city} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedAddress.state}  name='state' value={this.state.state} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedAddress.zipcode}  name='zipcode' value={this.state.zipcode} onChange={this.getInput}/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' onClick={this.editAddress}>Save changes</Button>
                    <Button type='submit' onClick={this.editToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <ul id='addressList'>
            {
                addressBook.map((item,i)=>{
                const { address_name, street, secondary, city, state, zipcode, address_id} = item;
                return(
                        <li key={i} className='address' id={address_id}>
                            <h5>{address_name}</h5>
                            <p>{street}</p>
                            <p>{secondary}</p>
                            <p>{city}</p>
                            <p>{state}</p>
                            <p>{zipcode}</p>
                            <div className='bottomButtons'>
                                <Button className='listButton' onClick={()=>{
                                      const currentAddres = Object.assign({},{
                                        address_id,
                                        address_name,
                                        street,
                                        secondary,
                                        city,
                                        state,
                                        zipcode  
                                    });
                                    this.setState({selectedAddress:currentAddres},()=>{
                                        console.log(this.state.selectedAddress)
                                    })
                                    this.editToggle();
                                }}>Edit</Button>
                                <Button className='listButton' 
                                    onClick={()=>{                                 
                                        axios.delete(`http://localhost:3000/deleteaddress/${address_name}`)
                                        .then(this.setState({addressBook:addressBook.filter(item => item.address_name !== address_name)}))
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