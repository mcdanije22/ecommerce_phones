import React, {Component} from 'react';
import './shoppingcart.scss';

class ShoppingCart extends Component{
    constructor(){
        super();
    }
   render(){
       return(
        <div id = 'shoppingCart'>
        <ul>
            <li className = 'cartItem'>
                <img src='https://via.placeholder.com/80'/>
                <div className='productDescription'>
                    <h1>Iphone XS Max</h1>
                    <p>Apple</p>
                    <div className='bottomCard'>
                    <button type='submit'>test</button>
                    <p>75</p>
                </div>
                </div>
                
            </li>
        </ul>
        </div>
       );
   }
}
export default ShoppingCart;