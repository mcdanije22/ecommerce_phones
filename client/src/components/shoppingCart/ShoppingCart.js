import React, {Component} from 'react';
import './shoppingcart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faChevronLeft  } from '@fortawesome/free-solid-svg-icons';
import {Button} from 'reactstrap';


class ShoppingCart extends Component{
    constructor(props){
        super(props);
    }

    backHistory=()=>{
        this.props.history.goBack();
    }
   render(){
    console.log(this.props)

       return(
        <div id = 'shoppingCart'>
        <button onClick={this.backHistory} id='backBtn'><FontAwesomeIcon icon={faChevronLeft}/> Back</button>
        <div id='cartHeading'>
        <h1 >Shopping Cart</h1><p >Clear Cart</p>
        </div>
        <ul id='cartList'>
            <li className = 'cartItem'>
                <img src='https://via.placeholder.com/80'/>
                <div className='productCardContent'>
                    <button type = 'submit' className='cartDelete'>
                        <FontAwesomeIcon icon={faTimes}/> 
                    </button>
                    <h1>Iphone XS Max</h1>
                    <p>Apple</p>
                    <div className='bottomCardContent'>
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
                <div className='productCardContent'>
                    <button type = 'submit' className='cartDelete'>
                        <FontAwesomeIcon icon={faTimes}/> 
                    </button>
                    <h1>Iphone XS Max</h1>
                    <p>Apple</p>
                    <div className='bottomCardContent'>
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
                <div className='productCardContent'>
                    <button type = 'submit' className='cartDelete'>
                        <FontAwesomeIcon icon={faTimes}/> 
                    </button>
                    <h1>Iphone XS Max</h1>
                    <p>Apple</p>
                    <div className='bottomCardContent'>
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
        <div id='bottomCart'>
            <div id ='cartSubtotal'>
            <p>Subtotal</p><h5>$1000.00</h5>
            </div>
            <div id='bottomButton'>
            <Button type = 'submit' color='success'>CHECKOUT</Button>
            </div>
        </div>
        </div>
       );
   }
}
export default ShoppingCart;