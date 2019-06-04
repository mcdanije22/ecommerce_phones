import React,{Component} from 'react';
import './searchpage.scss';
import {Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductPage from '../ProductPage/ProductPage';

import { connect } from 'react-redux';

class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state={
            searchResults:[]
        }
    }
    componentWillMount(){
        const searchParam = this.props.match.params.search; //from link 
        axios.get(`http://localhost:3000/search/${searchParam}`)
        .then(res=>{
            this.setState({searchResults:res.data})
          })
  }
  
    backHistory=()=>{
        this.props.history.goBack();
    }
    render(){
        const { searchField } = this.props;
        const searchResultAmounts = this.state.searchResults.length;
        const searchTerm = this.props.match.params.search;
        
        const {searchResults} = this.state;
        console.log(this.props) //from link
    return(
        <div id='searchPage'>
            <button onClick={this.backHistory} id='search-header'><FontAwesomeIcon icon={faChevronLeft}/> Back</button>
            <p id='search-header'>{searchResultAmounts} results found for "{searchTerm}"</p>
            <hr /> {/*handles empty page results for footer spacing*/}
            {/* <hr style={{marginBottom: searchResultAmounts === 0?'20rem':''}} /> handles empty page results for footer spacing */}
            <ul id='searchResults'>

            {searchResults.map((item,i)=>{
                return(
                    <Link to={`/product/${item.product_id}/${searchResults[0].brand}`} style={{color:'black'}} key={i}><li className='result-item' >
                        <img src='https://via.placeholder.com/80x120' className='search-img'/>
                        <div className='search-item-info'>
                            <p>
                            {item.product_name}
                            <br/>
                            By {item.brand}
                            </p>
                            <h3>${item.product_price}</h3>
                        </div>
                        <hr className='float-clear'/>
                    </li>
                </Link>
                );
            })}

            </ul>
            {/* <div id='search-buttons' style={{display: searchResultAmounts ===0? 'none': 'flex', marginBottom: searchResultAmounts === 1? '15rem':''}}> */}
            <div id='search-buttons' style={{display: searchResultAmounts ===0? 'none': 'flex'}}>
                <Button type= 'submit' className='searchButton'><FontAwesomeIcon icon={faChevronLeft}/> Previous</Button>
                <Button type= 'submit' className='searchButton'>Next <FontAwesomeIcon icon={faChevronRight}/></Button>
            </div>
        </div>
    );
    }
}
const mapStateToProps = state => {
    return {
      searchField: state.search.searchField
    }
  }
export default  connect(mapStateToProps, null)(SearchPage);