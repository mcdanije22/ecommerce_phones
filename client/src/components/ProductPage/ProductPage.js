import React,{Component} from 'react';
import './productpage.scss';
import Reviews from './Reviews';
import axios from 'axios';
import Product from './Product';


class ProductPage extends Component{
    constructor(props){
        super(props);
        this.state={
            currentProduct:[],
            productReviews:[]
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
    return(
        <div id = 'productPage'>
            <Product 
                product={this.state.currentProduct[0]}
            />
            <Reviews/>
        </div>
    )};
};
export default ProductPage;