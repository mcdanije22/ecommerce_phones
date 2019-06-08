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
      this.setState({[e.target.name] : e.target.value},()=>{
        console.log(this.state.email)
          console.log(this.state.password)
      })  
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
            this.props.getAccount();
             
        }})
        }
    }
    render(){
        console.log(this.props.currentAccount)
        return(
            <div id='logPage' >
                <div id='contentBox'>
                    <div id='signIn' >
                    <h2>Log in</h2>
                        <p>E-MAIL</p>
                        <input type='text' name='email' onChange={this.getInput}/>
                        <p>PASSWORD</p>
                        <input type='text' name='password' onChange={this.getInput}/>
                        <Link to={true?'/account':'/login'}> <Button type='submit' onClick={this.accountLogIn}>Sign in</Button> </Link>
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
      getAccount: (e) => dispatch(loginAccount({name:'josh'}))
    }
  } 
export default connect()(SignIn);
