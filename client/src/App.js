import React, {Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import AccountPage from './components/AccountPage/AccountPage';
import Footer from './components/footer/Footer';
import SearchPage from './components/SearchPage/SearchPage';
import ProductPage from './components/ProductPage/ProductPage';
import ShoppingCart from './components/shoppingCart/ShoppingCart';
import SignIn from './components/SignIn/SignIn';
import Orders from './components/AccountPage/Orders/Orders';
import SpecificOrder from './components/AccountPage/Orders/SpecificOrder';
import AddressBook from './components/AccountPage/AddressBook/AddressBook';
import Wallet from './components/AccountPage/wallet/Wallet';
import ChangePassword from './components/AccountPage/ChangePassword/ChangePassword';
import OrderCheckOut from './components/shoppingCart/OrderCheckOut/OrderCheckOut';

class App extends Component{
  constructor(props){
    super(props);
  }
 
  render(){
  return (
      <div className="App">
        <NavBar />
        <div id='main'>
          <Switch>
            <Route path ='/login' component={SignIn} />
            <Route exact path='/' component={Home} />
            <Route path='/account' component={AccountPage} />
            <Route path='/orders/:customerid' component={Orders} />
            <Route path='/specificorder/:customerid/:orderid' component={SpecificOrder} />
            <Route path='/address/:customerid' component={AddressBook} />
            <Route path='/wallet/:customerid' component={Wallet} />
            <Route path='/changepassword' component={ChangePassword} />
            <Route path='/checkout' component={OrderCheckOut} />
            <Route path='/search/:search' render={(props)=>(
            <SearchPage key={props.location.key} {...props} />
            )}/>
            <Route path='/product/:id/:brand' component={ProductPage} />
            <Route path='/deals' component={SearchPage} />
            <Route path='/cart/:customerid' component={ShoppingCart} />
          </Switch>
          </div>
        <Footer />
      </div>
  );
  }
}


export default App;
