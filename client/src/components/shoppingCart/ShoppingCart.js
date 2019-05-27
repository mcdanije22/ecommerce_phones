import React, {Component} from 'react';
import './shoppingcart.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faChevronLeft  } from '@fortawesome/free-solid-svg-icons';
import {Button} from 'reactstrap';


class ShoppingCart extends Component{
    constructor(props){
        super(props);
        this.state={
            currentShoppingCart:[]
        }
    }
    componentDidMount(){
        const customerid = this.props.match.params.customerid;
        axios.get(`http://localhost:3000/cart/${customerid}`)
        .then(res=>{
            this.setState({currentShoppingCart:res.data})
            console.log('test',this.state.currentShoppingCart)
        })
    }

    backHistory=()=>{
        this.props.history.goBack();
    }
   render(){
    console.log(this.props)
    const shoppingCart = this.state.currentShoppingCart;
    console.log(shoppingCart)
       return(
        <div id = 'shoppingCart'>
        <button onClick={this.backHistory} id='backBtn'><FontAwesomeIcon icon={faChevronLeft}/> Back</button>
        <div id='cartHeading'>
        <h1 >Shopping Cart</h1><p >Clear Cart</p>
        </div>
        <p id='emptyCart' style={{display:shoppingCart.length !== 0?'none':''}}>Your Shopping Cart is Empty...</p>
        <ul id='cartList'>
        {shoppingCart.map((item,i)=>{
            const{ brand, image_url, product_name, product_price, sale_discount, product_id, item_quantity } = item;
            return <li className = 'cartItem' id={product_id} key={i}>
                <img src='https://via.placeholder.com/80'/>
                <div className='productCardContent'>
                    <button type = 'submit' className='cartDelete'>
                        <FontAwesomeIcon icon={faTimes}/> 
                    </button>
                    <h1>{product_name}</h1>
                    <p>{brand}</p>
                    <div className='bottomCardContent'>
                        <div className ='quantityBtnGroup'>
                            <button type='submit'>-</button>
                            <input type='text' value={item_quantity} readOnly/>
                            <button type='submit'>+</button>
                        </div>
                        <p><b>${product_price}</b></p>
                    </div>
                </div>   
            </li>
        })}
        </ul>
        <div id='bottomCart' style={{display:shoppingCart.length === 0?'none':''}}>
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