import React,{Component} from 'react';
import './productpage.scss';
import Reviews from './Reviews';
import axios from 'axios';
import Product from './Product';


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
    render(){
        if(this.state.currentProduct.length === 0){
            return null;
        }
        const filteredProduct = this.state.currentProduct.filter(item=>{
           return item.product_type === 'Phone'
        })
        const productReviews = this.state.currentProduct.filter(item=>{
            return item.review_id !== null;
        })
        
       
            return(
                <div id = 'productPage'>
                    <Product 
                        product={filteredProduct[0]}
                        reviews = {productReviews}
                    />
                    <Reviews
                        reviews = {productReviews}
                    />
                </div>
            )};
};
export default ProductPage;