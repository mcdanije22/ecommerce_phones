import React,{Component} from 'react';
import './productpage.scss';
import Reviews from './Reviews';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from './Product';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { shoppingCart } from '../../actions/shoppingCartAction';



class ProductPage extends Component{
    constructor(props){
        super(props);
        this.state={
            currentProduct:[],
            modal: false,
            errorModal: false,
            modalLogin: false
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
        const shoppingCart = this.props.shoppingCart;
        axios.post('http://localhost:3000/addcart',{
            customer_id:this.props.currentAccount.customer_id,
            product_id:e.target.id  
        })
        .then(this.setState({errorModal:false}))
        .catch(err=>{
            if(err.response.status == 400){
                console.log(err.response.status)
                this.setState({errorModal:true})
            }
        })
        this.toggle();

    }
    
    toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal          
        }));
      }

      loginToggle = () => {
        this.setState(prevState => ({
            modalLogin: !prevState.modalLogin      
        }));
      }

    render(){
        console.log(this.props.shoppingCart)
        const customerid = this.props.currentAccount.customer_id;
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
                    <p style={{display:'flex', justifyContent:'center', fontSize:'6rem', marginTop:'2rem', color:'green'}}><FontAwesomeIcon icon={faCheckCircle}  /></p>
                        <ModalBody style={{display:'flex', justifyContent:'center', fontSize:'2rem', color:'green'}}>
                            <p style={{display:this.state.errorModal?'none':''}}>Added to Cart!</p>
                            <p style={{display:!this.state.errorModal?'none':'', color:'red'}}>Item already in cart!</p>
                        </ModalBody>
                        <div id='bottomModal' style={{display:'flex', justifyContent:'center', fontSize:'1rem', marginBottom:'4rem'}}>
                                <Button className='modalBtn' onClick={this.toggle}>Keep Shopping</Button>
                                <Link to={`/cart/${customerid}`}><Button className='modalBtn'>Go to Cart</Button></Link>
                        </div>
                    </Modal>
                    <Product 
                        product = {filteredProduct[0] || filterAccessory[0]}
                        reviews = {productReviews.length !== 0?productReviews:[0] }
                        addToShoppingCart = {this.addToShoppingCart}
                        currentAccount = {this.props.currentAccount}
                        loginToggle={this.loginToggle}
                        modalLogin={this.state.modalLogin}
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
const mapStateToProps = state => {
    return {
      currentAccount: state.account.currentAccount,
      shoppingCart: state.shoppingCart.shoppingCart    
    }
  }
  const mapDispatchToProps = (dispatch) =>{
    return{
        getShoppingCart: (item) => dispatch(shoppingCart(item))
    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);