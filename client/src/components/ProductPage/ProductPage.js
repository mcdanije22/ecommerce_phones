import React,{Component} from 'react';
import './productpage.scss';
import Reviews from './Reviews';
import axios from 'axios';
import Product from './Product';


class ProductPage extends Component{
    constructor(props){
        super(props);
        this.state={
            currentProduct:{}
        }
    }
    componentDidMount(){
        const productId = this.props.match.params.id; //from link 
        axios.get(`http://localhost:3000/product/${productId}`)
        .then(res=>{
            this.setState({currentProduct:res.data}, ()=>{
                console.log(this.state.currentProduct)
            })
          })
    }
    render(){
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