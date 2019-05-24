import React,{Component} from 'react';
import './productpage.scss';
import Reviews from './Reviews';
import axios from 'axios';
import Product from './Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class ProductPage extends Component{
    constructor(props){
        super(props);
        this.state={
            currentProduct:[]
        }
    }
    componentDidMount(){
        // const productId = this.props.match.params.id; //from link 
        // axios.get(`http://localhost:3000/product/${productId}`)
        // .then(res=>{
        //     this.setState({currentProduct:res.data}, ()=>{
        //         console.log(this.state.currentProduct)
        //     })
        //   })

        const productId = this.props.match.params.id; //from link 
        const brandName = this.props.match.params.brand;
        console.log(this.props)
        axios.get(`http://localhost:3000/product/${productId}/${brandName}`)
        .then(res=>{
            this.setState({currentProduct:res.data}, ()=>{
                console.log(this.state.currentProduct)
            })
          })

        //   axios.get(`http://localhost:3000/product`)
        //   .then(res=>{
        //     this.setState({productReviews:res.data}, ()=>{
        //         console.log(this.state.productReviews)
        //     })
        //   })

    }
    backHistory=()=>{
        this.props.history.goBack();
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
       console.log('new', this.props)
            return(
                <div id = 'productPage'>
                    <button onClick={this.backHistory} id='search-header'><FontAwesomeIcon icon={faChevronLeft}/> Back</button>
                    <Product 
                        product={filteredProduct[0] || filterAccessory[0]}
                        reviews = {productReviews.length !== 0?productReviews:[0] }
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