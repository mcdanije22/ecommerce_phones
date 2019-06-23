import React,{Component} from 'react';
import { Button } from 'reactstrap';
import './changepassword.scss';

class ChangePassword extends Component{
    constructor(){
        super();
        this.state={
            currentPassword:'',
            newPassword:'',
            confirmPassword:''
        }
    }
    getInput = (e) =>{
        this.setState({[e.target.name] : e.target.value},()=>{
            console.log(this.state.currentPassword)
        })  
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
            <Button type='submit' color='success'>Change password</Button>
            </div>
        </div>
    )}
}
export default ChangePassword;