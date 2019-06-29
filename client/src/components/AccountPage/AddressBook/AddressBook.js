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
            this.setState({addressBook:data.data},()=>{
                console.log(this.state.addressBook)
            })
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
        let { address_name, street, secondary, city, state, zipcode } = this.state;
        const currentAddressList = this.state.addressBook;
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
    onSubmiteditAddress=()=>{
    let { address_name, street, secondary, city, state, zipcode } = this.state;
    const id = this.state.selectedAddress.id;
    zipcode = parseInt(zipcode)
    const zipcodeCheck = Number.isInteger(zipcode);
    const zipcodeLength = zipcode.toString().length;
    console.log(id)
    if(!zipcodeCheck || zipcodeLength !== 5){
        alert('please enter valid zipcode')
        this.setState({zipcode:''})
    }else{
    const editedAddress = Object.assign({},{
        customer_id: this.state.selectedAddress.customer_id,
        address_name: this.state.selectedAddress.address_name,
        street:street || this.state.selectedAddress.street,
        secondary: secondary || this.state.selectedAddress.secondary,
        city: city || this.state.selectedAddress.city,
        state: state || this.state.selectedAddress.state,
        zipcode: zipcode || this.state.selectedAddress.zipcode
    });
    const editedAdressList = [...this.state.addressBook];
    editedAdressList[id] = editedAddress;
    this.setState({addressBook:editedAdressList})
    console.log(editedAdressList)
    axios.put(`http://localhost:3000/editaddress`, {
        customer_id: this.state.selectedAddress.customer_id,
        address_name: this.state.selectedAddress.address_name,
        street:street || this.state.selectedAddress.street,
        secondary: secondary || this.state.selectedAddress.secondary,
        city: city || this.state.selectedAddress.city,
        state: state || this.state.selectedAddress.state,
        zipcode: zipcode || this.state.selectedAddress.zipcode
    })
    .catch(error=>{
        console.log(error)
    })
    this.editToggle(); 
    }
}

    render(){
        const { addressBook } = this.state;
    return(
        <div id ='addressBook'>
            <h2>Address Book</h2>
            <Button type='submit' 
            style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}}
            onClick={this.toggle}>new address</Button>
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
                            <Button type='submit' style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}} onClick={this.onSubmitNewAddress}>Add address</Button>
                            <Button type='submit' style={{border:'1px #dc3545  solid', backgroundColor:'transparent', color:'#dc3545'}} onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

            <Modal isOpen={this.state.editModal} toggle={this.editToggle} id='addressModal'>
                <ModalBody >
                <h3>Edit Address:</h3><h4 style={{textAlign:'center'}}>{this.state.selectedAddress.address_name}</h4> 
                    <form>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedAddress.street}  name='street' value={this.state.street} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedAddress.secondary || 'apt, p.o box, etc..(optional)'}  name='secondary' value={this.state.secondary} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedAddress.city}  name='city' value={this.state.city} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedAddress.state}  name='state' value={this.state.state} onChange={this.getInput}/>
                        <input type='text' className='inputAddressAdd' placeholder={this.state.selectedAddress.zipcode}  name='zipcode' value={this.state.zipcode} onChange={this.getInput}/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' style={{border:'1px #28a745  solid', backgroundColor:'transparent', color:'#28a745'}}  onClick={this.onSubmiteditAddress}>Save changes</Button>
                    <Button type='submit' style={{border:'1px #dc3545  solid', backgroundColor:'transparent', color:'#dc3545'}} onClick={this.editToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <ul id='addressList'>
            {
                addressBook.map((item,i)=>{
                const { address_name, street, secondary, city, state, zipcode, customer_id } = item;
                return(
                        <li key={i} className='address' >
                            <h5>{address_name}</h5>
                            <p>{street}</p>
                            <p>{secondary}</p>
                            <p>{city}, {state} {zipcode}</p>
                            <div className='bottomButtons'>
                                <Button className='listButton'
                                style={{border:'1px #868e96  solid', backgroundColor:'transparent', color:'#868e96'}}
                                 onClick={(e)=>{
                                      const currentAddres = Object.assign({},{
                                        id:i,
                                        address_name,
                                        street,
                                        secondary,
                                        city,
                                        state,
                                        zipcode, 
                                        customer_id  
                                    });
                                    this.setState({selectedAddress:currentAddres},()=>{
                                        console.log(this.state.selectedAddress)
                                    })
                                    this.editToggle();
                                }}>Edit</Button>
                                <Button className='listButton' 
                                    style={{border:'1px #dc3545  solid', backgroundColor:'transparent', color:'#dc3545'}}
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


