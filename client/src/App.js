import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';
import {Button, Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import AccountPage from './components/AccountPage/AccountPage';
import Footer from './components/footer/Footer';
import SearchPage from './components/SearchPage/SearchPage';
import ProductPage from './components/ProductPage/ProductPage';

import { setSearchField } from './actions/searchAction';



class App extends Component{
  constructor(props){
    super(props);
  }
 
  render(){
    const {searchField , onSearchChange} = this.props;
    console.log(onSearchChange)
  return (
      <div className="App">
        <NavBar searchChange = {onSearchChange}/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/account' component={AccountPage} />
            <Route path='/search' component={SearchPage} />
            <Route path='/product' component={ProductPage} />
          </Switch>
        <Footer />
      </div>
  );
  }
}

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);
