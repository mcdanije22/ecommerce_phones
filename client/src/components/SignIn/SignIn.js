import React, {Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import { loginAccount, accountAddresses, accountCards } from '../../actions/loginAction';
import './signin.scss';

class SignIn extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            first_name:'',
            last_name:'',
            loginFailed:false,
            signInForm:true,
            registrationFailed:false
        }
    }
    getInput = (e) =>{
      this.setState({[e.target.name] : e.target.value})  
    }

    accountLogIn = () =>{
        let {email, password}=this.state;
        email = email.toLowerCase();
        if(email === '' || password === ''){
            alert('fill in all fields')
        }else{
        axios.post('https://ecommerce-phonelab.herokuapp.com/signin',{
            email,
            password
        })
        .then(data=>{
            if(data.data.length === 0 ){
                this.wrongLogin();
            }else{
            this.props.getAccount(data.data[0]); 
            axios.get(`https://ecommerce-phonelab.herokuapp.com/address/${data.data[0].customer_id}`)
            .then(data=>{
                this.props.getAccountAddresses(data.data)
            }) 
            axios.get(`https://ecommerce-phonelab.herokuapp.com/wallet/${data.data[0].customer_id}`)
            .then(data=>{
                this.props.getAccountCards(data.data)
            })             
            this.backHistory();            
        }})
        }
    }
accountRegister = () =>{
    let { email, password, first_name, last_name } = this.state;
    email = email.toLowerCase();
    if(email === '' || password === '' || first_name === '' || last_name === ''){
        alert('fill in all fields')
    }else if(password.length < 8){
        alert('password must be atleast 8 characters long')
    }else{
        axios.post('https://ecommerce-phonelab.herokuapp.com/register',{
            email,
            password,
            first_name,
            last_name
        })
        .then(data=>{
            this.backHistory();            
        })
        .catch(error=>{ 
            if(error.response.status === 500){
                this.setState({registrationFailed:true})
            }
        })
    }
}   
    wrongLogin=()=>{
        this.setState({password:'', loginFailed:true})
    }
    signInToggle=()=>{
        this.setState({signInForm:this.state.signInForm?false:true, loginFailed:false,registrationFailed:false, email:'', password:'', first_name:'', last_name:''})
    }
    backHistory= () =>{
        this.props.history.goBack();
    }
    render(){
        return(
            <div id='logPage' >
                <div id='contentBox'>
                    <div id='signIn' style={{display:this.state.signInForm?'':'none'}}>
                    <h2>Log in</h2>
                        <p>E-MAIL</p>
                        <input type='text' name='email' onChange={this.getInput} value={this.state.email}/>
                        <p>PASSWORD</p>
                        <input type='text' name='password' onChange={this.getInput} value={this.state.password}/>
                        <p style={{color:'red', textAlign:'center', display:!this.state.loginFailed?'none':'block'}}>Wrong username or password</p>
                        <Button type='submit' color='success' onClick={this.accountLogIn}>Sign in</Button>
                        <p>Dont have an account? <span onClick={this.signInToggle}>Create one!</span></p>
                    </div>
                    <div id='signIn' style={{display:!this.state.signInForm?'':'none'}}>
                    <h2>Register</h2>
                        <p>First Name</p>
                        <input type='text' name='first_name' onChange={this.getInput} value={this.state.first_name}/>
                        <p>Last Name</p>
                        <input type='text' name='last_name' onChange={this.getInput} value={this.state.last_name}/>
                        <p>Email Address</p>
                        <input type='text' name='email' onChange={this.getInput} value={this.state.email}/>
                        <p>Choose a Password</p>
                        <input type='text' name='password' onChange={this.getInput} value={this.state.password}/>
                        <p style={{color:'red', textAlign:'center', display:!this.state.registrationFailed?'none':'block'}}>Account already exist for this email address</p>
                        <Button type='submit' color='success' onClick={this.accountRegister}>Register</Button>
                        <p>Already have an account? <span onClick={this.signInToggle}>Sign in!</span></p>
                    </div>
                </div>
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
      getAccount: (user) => dispatch(loginAccount(user)),
      getAccountAddresses: (list) => dispatch(accountAddresses(list)),
      getAccountCards: (list) =>dispatch(accountCards(list))
    }
  } 
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
