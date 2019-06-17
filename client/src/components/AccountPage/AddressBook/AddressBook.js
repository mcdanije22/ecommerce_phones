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
            modal:false
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
    getInput=(e)=>{
       this.setState({[e.target.name]:e.target.value}) 
    }
    onSubmitNewAddress=()=>{
        const customerid=this.props.location.state.customerid
        const { address_name, street, secondary, city, state, zipcode } = this.state;
        const currentAddressList = this.state.addressBook;
        if(address_name === '' || street === '' || city === '' || state === '' || zipcode === ''){
            alert('fill in all required fields')
        }else{
        const newAddress = Object.assign({},{
            address_name,
            street,
            secondary,
            city,
            state,
            zipcode  
        });
        const newAddressBook = [...currentAddressList, newAddress];
        this.setState({addressBook:newAddressBook})

        axios.post(`http://localhost:3000/addaddress`, {
            customer_id: this.props.location.state.customerid,
            address_name,
            street,
            secondary,
            city,
            state,
            zipcode 
        })
        this.toggle(); 
    }
}
 
    render(){
        const { addressBook } = this.state;
    return(
        <div id ='addressBook'>
            <Button type='submit' onClick={this.toggle}>+new address</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} id='addressAddModal'>
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
                                <Button className='listButton'>Edit</Button>
                                <Button className='listButton' 
                                    onClick={(e)=>{
                                        const { addressBook } = this.state;
                                        axios.delete(`http://localhost:3000/deleteaddress/${address_id}`)
                                        .then(this.setState({addressBook:addressBook.filter(item => item.address_id !== address_id)}))
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