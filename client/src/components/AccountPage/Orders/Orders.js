import React,{Component} from 'react';
import './orders.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


class Orders extends Component {
    constructor(props){
        super(props);
        this.state={
            orders:[]
        }
    }
    componentDidMount(){
        const customerid=this.props.location.state.customerid
        axios.get(`https://ecommerce-phonelab.herokuapp.com/orders/${customerid}`)
        .then(data=>{
            this.setState({orders:data.data},()=>{
            })
        })
    }
    
    render(){
        const { orders } = this.state;
        return(
            <div id ='orders'>
            <h2>Orders</h2>
            <ul id='orderList'>
            {
                orders.map((order,i)=>{
                const { order_id, product_name, total, image_url, customer_id } = order;
                return(
                        <Link key={i} to={`/specificorder/${customer_id}/${order_id}`}>
                        <li  className='order' >
                        <div className='listContent'>
                        <img src={image_url} />
                            <p>{product_name}</p>
                           {/* <h6><FontAwesomeIcon icon={faChevronRight} className='accountIconsRight'/></h6>  */}
                        </div>
                            <hr/>
                        </li>
                        </Link>
                    );
                })
            }
            </ul>
        </div>
    )}
}
export default Orders;