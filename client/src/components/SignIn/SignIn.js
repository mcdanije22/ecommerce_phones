import React, {Component} from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { loginAccount } from '../../actions/loginAction';
import './signin.scss';

class SignIn extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:''
        }
    }
    getInput = (e) =>{
      this.setState({[e.target.name] : e.target.value})  
    }

    accountLogIn = () =>{
        const {email, password}=this.state;
        if(email === '' || password === ''){
            alert('fill in both fields')
        }else{
        axios.post('http://localhost:3000/signin',{
            email,
            password
        })
        .then(data=>{
            if(data.data.length === 0 ){
                alert('wrong email or password')
            }else{
            console.log(data.data)
            this.props.getAccount(data.data[0]); 
            this.backHistory();            
        }})
        }
    }

    backHistory= () =>{
        this.props.history.goBack();
    }
    render(){
        return(
            <div id='logPage' >
                <div id='contentBox'>
                    <div id='signIn' >
                    <h2>Log in</h2>
                        <p>E-MAIL</p>
                        <input type='text' name='email' onChange={this.getInput}/>
                        <p>PASSWORD</p>
                        <input type='text' name='password' onChange={this.getInput}/>
                        <Button type='submit' onClick={this.accountLogIn}>Sign in</Button>
                        <p>Dont have an account? <span>Create one!</span></p>
                    </div>

                    <div id='signIn' style={{display:'none'}}>
                    <h2>Register</h2>
                        <p>First Name</p>
                        <input type='text'/>
                        <p>Last Name</p>
                        <input type='text'/>
                        <p>Address</p>
                        <input type='text'/>
                        <p>Email Address</p>
                        <input type='text'/>
                        <p>Choose a Password</p>
                        <input type='text'/>
                        <Button type='submit'>Sign in</Button>
                        <p>Already have an account? <span>Sign in!</span></p>
                    </div>
                </div>
            </div>
        )
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
