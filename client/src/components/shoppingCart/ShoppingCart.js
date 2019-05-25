import React, {Component} from 'react';
import './shoppingcart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes  } from '@fortawesome/free-solid-svg-icons';

class ShoppingCart extends Component{
    constructor(){
        super();
    }
   render(){
       return(
        <div id = 'shoppingCart'>
        <div id='cartHeading'>
        <h1 >Shopping Cart</h1><p >Clear Cart</p>
        </div>
        <ul id='cartList'>
            <li className = 'cartItem'>
                <img src='https://via.placeholder.com/80'/>
                <div className='productDescription'>
                    <button type = 'submit' className='cartDelete'>
                        <FontAwesomeIcon icon={faTimes}/> 
                    </button>
                    <h1>Iphone XS Max</h1>
                    <p>Apple</p>
                    <div className='bottomCard'>
                        <div className ='quantityBtnGroup'>
                            <button type='submit'>-</button>
                            <input type='text'/>
                            <button type='submit'>+</button>
                        </div>
                        <p><b>$1000</b></p>
                    </div>
                </div>   
            </li>
            <li className = 'cartItem'>
                <img src='https://via.placeholder.com/80'/>
                <div className='productDescription'>
                    <button type = 'submit' className='cartDelete'>
                        <FontAwesomeIcon icon={faTimes}/> 
                    </button>
                    <h1>Iphone XS Max</h1>
                    <p>Apple</p>
                    <div className='bottomCard'>
                        <div className ='quantityBtnGroup'>
                            <button type='submit'>-</button>
                            <input type='text'/>
                            <button type='submit'>+</button>
                        </div>
                        <p><b>$1000</b></p>
                    </div>
                </div>   
            </li>
            <li className = 'cartItem'>
                <img src='https://via.placeholder.com/80'/>
                <div className='productDescription'>
                    <button type = 'submit' className='cartDelete'>
                        <FontAwesomeIcon icon={faTimes}/> 
                    </button>
                    <h1>Iphone XS Max</h1>
                    <p>Apple</p>
                    <div className='bottomCard'>
                        <div className ='quantityBtnGroup'>
                            <button type='submit'>-</button>
                            <input type='text'/>
                            <button type='submit'>+</button>
                        </div>
                        <p><b>$1000</b></p>
                    </div>
                </div>   
            </li>
        </ul>
        </div>
       );
   }
}
export default ShoppingCart;