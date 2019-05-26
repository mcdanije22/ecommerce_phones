import React,{Component} from 'react';
import './productpage.scss';
import Reviews from './Reviews';
import axios from 'axios';
import Product from './Product';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class ProductPage extends Component{
    constructor(props){
        super(props);
        this.state={
            currentProduct:[],
            modal: true
        }
    }
    componentDidMount(){
        const productId = this.props.match.params.id; //from link 
        const brandName = this.props.match.params.brand;
        console.log(this.props)
        axios.get(`http://localhost:3000/product/${productId}/${brandName}`)
        .then(res=>{
            this.setState({currentProduct:res.data}, ()=>{
                console.log(this.state.currentProduct)
            })
          })
    }
    backHistory= () =>{
        this.props.history.goBack();
    }

    addToShoppingCart= (e) =>{
        axios.post('http://localhost:3000/addcart',{
            customer_id:0,
            product_id:e.target.id
        })
    }
    
    toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    render(){
        if(this.state.currentProduct.length === 0){
            return null;
        }
        const filteredProduct = this.state.currentProduct.filter(item=>{
           return item.product_type === 'Phone'
        })
        const filterAccessory = this.state.currentProduct.filter(item=>{
            return item.product_type === 'Accessory'
         })
        const productReviews = this.state.currentProduct.filter(item=>{
            return item.review_id !== null;
        })
            return(
                <div id = 'productPage'>
                    <button onClick={this.backHistory} id='search-header'><FontAwesomeIcon icon={faChevronLeft}/> Back</button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} id='cartModal' >
                    <ModalBody>
                    Added to Cart
                    </ModalBody>
                    <ModalFooter>
                    <Button>test</Button>
                    <Button>test</Button>
                    </ModalFooter>
                    </Modal>
                    <Product 
                        product = {filteredProduct[0] || filterAccessory[0]}
                        reviews = {productReviews.length !== 0?productReviews:[0] }
                        addToShoppingCart = {this.addToShoppingCart}
                    />
                   {productReviews.length !== 0?
                   <Reviews
                        reviews = {productReviews}
                    />
                    : 
                    <div id = 'noReviews'>
                    <h1><b>Reviews</b></h1>
                    <hr/>
                    <p>No Reviews yet...</p>
                    </div>
                    }
                   
                </div>
            )};
};
export default ProductPage;