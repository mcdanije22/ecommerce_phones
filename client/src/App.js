import React, {Component} from 'react';
import './App.css';
import {Button, Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import AccountPage from './components/AccountPage/AccountPage';
import Footer from './components/footer/Footer';
import SearchPage from './components/SearchPage/SearchPage';
import ProductPage from './components/ProductPage/ProductPage';



class App extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    axios.get('http://localhost:3000')
    .then(res=>{
      console.log(res.data)
    })
  }
 
  render(){
  return (
      <div className="App">
        <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/account' component={AccountPage} />
            <Route path='/search/:search' component={SearchPage} />
            <Route path='/product' component={ProductPage} />
          </Switch>
        <Footer />
      </div>
  );
  }
}


export default App;
