import React,{Component} from 'react';
import './productpage.scss';
import Reviews from './Reviews';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from './Product';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';



class ProductPage extends Component{
    constructor(props){
        super(props);
        this.state={
            currentProduct:[],
            modal: false,
            reviewModal:false,
            errorModal: false,
            modalLogin: false,
            errorMessageReview:false,
            reviewer:'',
            review:'',
            reviewScore:''
        }
    }
    componentDidMount(){
        const productId = this.props.match.params.id; //from link 
        const brandName = this.props.match.params.brand;
        axios.get(`https://ecommerce-phonelab.herokuapp.com/product/${productId}/${brandName}`)
        .then(res=>{
            this.setState({currentProduct:res.data})
        })
    }
    backHistory= () =>{
        this.props.history.goBack();
    }

    addToShoppingCart= (e) =>{
        const shoppingCart = this.props.shoppingCart;
        axios.post('https://ecommerce-phonelab.herokuapp.com/addcart',{
            customer_id:this.props.currentAccount.customer_id,
            product_id:e.target.id  
        })
        .then(this.setState({errorModal:false}))
        .catch(err=>{
            if(err.response.status == 400){
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
      reviewToggle = () => {
        this.setState(prevState => ({
          reviewModal: !prevState.reviewModal,
          errorMessageReview:false          
        }));
      }
      getInput = (e) =>{
        this.setState({[e.target.name] : e.target.value})  
      }
      onReviewSubmit=()=>{
          const productId = this.props.match.params.id;
          const { reviewer, reviewScore, review } = this.state;
          if(reviewer == '' || reviewScore == '' || review == ''){
            alert('Fill in all fields')
          }
          else if(reviewScore > 0 && reviewScore < 6){
          axios.post('https://ecommerce-phonelab.herokuapp.com/postreview',{
              reviewer,
              review,
              review_score:reviewScore,
              product_id:productId
          })
          .then(data=>{
            const reviewList = [...this.state.currentProduct, ...data.data]
            this.setState({currentProduct:reviewList})
          })
          this.reviewToggle();
        }else{
            this.setState({errorMessageReview:true})
        }
      }

    render(){
        const customerid = this.props.currentAccount.customer_id;
        if(this.state.currentProduct.length === 0){
            return null;
        }
       const product = this.state.currentProduct.filter(item=>{
            const productId = this.props.match.params.id;
            return item.product_id == productId;
           })
        // const filteredProduct = this.state.currentProduct.filter(item=>{
        //    return item.product_type === 'Phone'
        // })
        // const filterAccessory = this.state.currentProduct.filter(item=>{
        //     return item.product_type === 'Accessory'
        //  })
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
                    <Modal isOpen={this.state.reviewModal} toggle={this.reviewToggle} id='cartModal' >
                    <p style={{display:'flex', justifyContent:'center',fontSize:'2rem', marginTop:'2rem'}}>Add Review</p>
                        <ModalBody style={{display:'flex', justifyContent:'center', fontSize:'2rem'}}>
                           <form>
                               <input type='text' placeholder='Name' name='reviewer' onChange={this.getInput} style={{paddingLeft:'1rem',border:'none',backgroundColor:'transparent',borderBottom:'1px black solid',margin:'.5rem 0'}}></input>
                               <input  type="number" name="reviewScore" placeholder='Review score (1 to 5)' min="1" max="5"  onChange={this.getInput}  style={{paddingLeft:'1rem',border:'1px black solid', margin:'1rem 0'}}></input>
                               <p style={{marginBottom:'0rem',fontSize:'1rem',color:'red', display:this.state.errorMessageReview?'':'none'}}>Enter review score between 1 and 5</p>
                               <textarea type='text' placeholder='review' name='review' onChange={this.getInput} style={{paddingLeft:'1rem',marginTop:'1rem',width:'300px', height:'200px', border:'1px solid black'}}></textarea>
                           </form>
                        </ModalBody>
                        <div id='bottomModal' style={{display:'flex', justifyContent:'center', fontSize:'1rem', marginBottom:'4rem'}}>
                                <Button className='modalBtn' onClick={this.reviewToggle}>Cancel Review</Button>
                                 <Button className='modalBtn' onClick={this.onReviewSubmit}>Add Review</Button>
                        </div>
                    </Modal>
                    <Product 
                        // product = {filteredProduct[0] || filterAccessory[0]}
                        product = {product[0]}
                        reviews = {productReviews.length !== 0?productReviews:[0] }
                        addToShoppingCart = {this.addToShoppingCart}
                        currentAccount = {this.props.currentAccount}
                        loginToggle={this.loginToggle}
                        modalLogin={this.state.modalLogin}
                    />
                   {productReviews.length !== 0?
                   <Reviews
                        reviews = {productReviews}
                        reviewToggle={this.reviewToggle}
                    />
                    : 
                    <div id = 'noReviews'>
                    <h1><b>Reviews</b><button type='submit' onClick={this.reviewToggle} style={{marginLeft:'.5rem', fontSize:'1.2rem'}}><FontAwesomeIcon icon={faPlus}/></button></h1>
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
export default connect(mapStateToProps, null)(ProductPage);