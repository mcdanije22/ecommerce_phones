import React, {Component} from 'react';
import {Button} from 'reactstrap';
import './signin.scss';

class SignIn extends Component{
    constructor(){
        super();

    }

    render(){
        return(
            <div id='logPage'>
                {/* <h1>Welcome</h1>
                <div id='topButtons'>
                    <Button className='signIn' type='submit'>Sign In</Button>
                    <Button className='signIn' type='submit'>Sign Up</Button>
                </div> */}
                <div id='contentBox'>
                    <div id='signIn'>
                    <h2>Log in</h2>
                        <p>E-MAIL</p>
                        <input type='text'/>
                        <p>PASSWORD</p>
                        <input type='text'/>
                        <Button type='submit'>Sign in</Button>
                    </div>
                    
                    <p>Dont have an account? <span>Create one!</span></p>
                </div>
            </div>
        )
    }
}
export default SignIn;
