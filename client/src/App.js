import React, {Component} from 'react';
import './App.css';
import {Button, Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Footer from './components/footer/Footer';



class App extends Component{
  constructor(props){
    super(props);

  }
  render(){
  return (
      <div className="App">
        <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        <Footer />
      </div>
  );
  }
}
export default App;
