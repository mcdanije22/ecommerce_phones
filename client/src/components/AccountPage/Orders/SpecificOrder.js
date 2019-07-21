import React,{Component} from 'react'; 
import './orders.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

class SpecificOrder extends Component{
    constructor(){
        super();
        this.state={
            items:[],
            orderInfo:[]
        }
    }
    componentDidMount(){
        const { customerid, orderid } =this.props.match.params;
        axios.get(`https://ecommerce-phonelab.herokuapp.com/specificorder/${customerid}/${orderid}`)
        .then(data=>{
            // const itemList = [];
            // data.data.map(item=>{
            //     itemList.push()
            // })
            this.setState({orderInfo:data.data[0], items:data.data},()=>{
            })
        })
    }
    backHistory=()=>{
        this.props.history.goBack();
    }
    render(){
        let { date_order_placed, street, city, zipcode, state, card_number, total } = this.state.orderInfo;
        const { items } = this.state;
        if(date_order_placed){
            date_order_placed = date_order_placed.slice(0,10)
        }
        if(card_number){
            card_number = card_number.slice(12,16)       
        }
        return(
            <div id='specific-order'>
            <button onClick={this.backHistory} id='search-header'><FontAwesomeIcon icon={faChevronLeft}/> Back</button>
            <div id = 'order-detail'>
                <h5>Items({items.length}):</h5>
                {
                    items.map((item,i)=>{
                     return   <React.Fragment key={i}>
                        <p> {item.product_name} </p>
                        <hr/>
                        </React.Fragment>
                    })
                }
            </div>
            <div id='order-detail'>
                <h5>Date order placed:</h5>
                <p> {date_order_placed} </p>
                <hr/>
                <h5>Shipping to:</h5>
                <p> {street} {city}, {state} {zipcode} </p>
                <hr/>
                <h5>Payment used:</h5>
                <p> Card that ends in {card_number} </p>
                <hr/>
                <h5>Order total:</h5>
                <p> ${total} </p>
            </div>
            <div id='orders'>
                
            </div>
            </div>
        )
    }
}
export default SpecificOrder;