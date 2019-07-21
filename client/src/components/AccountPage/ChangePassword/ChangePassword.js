import React,{Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginAccount } from '../../../actions/loginAction';
import './changepassword.scss';

class ChangePassword extends Component{
    constructor(){
        super();
        this.state={
            currentPassword:'',
            newPassword:'',
            confirmPassword:'',
            changeSuccessful:false
        }
    }
    getInput = (e) =>{
        this.setState({[e.target.name] : e.target.value},()=>{
        })  
      }
      changePassword=()=>{
        const { password, customer_id } = this.props.location.state.currentCustomer;
        const { currentPassword, newPassword, confirmPassword } = this.state;
          if(currentPassword !== password){
            alert('enter correct password')
          } else if( newPassword !== confirmPassword ){
            alert('passowrd does not match')
          }else if(newPassword.length < 8){
              alert('password must be atleast 8 characters long')
          }else{
            axios.put('https://ecommerce-phonelab.herokuapp.com/editpassword',{
                newPassword,
                customer_id
            })
            .then(data=>{
                if(data.data.length !== 0){
                    this.props.getAccount(data.data[0])
                    this.setState({
                        currentPassword:'',
                        newPassword:'',
                        confirmPassword:'',
                        changeSuccessful:true
                    })
                }
            })
            .catch(error=>{
                console.log(error)
            })
          }
      }
    render(){
    return(
        <div id ='changePassword'>
            <div id='content'>
            <h2>Change Password</h2>
            <p>Current Passowrd</p>
            <input type='text' name='currentPassword' value={this.state.currentPassword} onChange={this.getInput}></input>
            <p>New Passowrd</p>
            <input type='text' name='newPassword' value={this.state.newPassword} onChange={this.getInput}></input>
            <p>Confirm Passowrd</p>
            <input type='text' name='confirmPassword' value={this.state.confirmPassword} onChange={this.getInput}></input>
            <p style={{display:this.state.changeSuccessful?'':'none',color:'green'}}>Password changed succsessfully!</p>
            <Button type='submit' color='success' onClick={this.changePassword}>Change password</Button>
            </div>
        </div>
    )}
}

const mapStateToProps = state => {
    return {
        currentAccount: state.account.currentAccount
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return{
      getAccount: (user) => dispatch(loginAccount(user))
    }
  } 
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);