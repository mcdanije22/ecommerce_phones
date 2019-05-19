import React,{Component} from 'react';
import './searchpage.scss';
import {Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { connect } from 'react-redux';

class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state={
            searchResults:[]
        }
    }
    componentWillMount(){
        const searchResults = this.props.match.params.search; //from link 
        axios.get(`http://localhost:3000/search/${searchResults}`)
        .then(res=>{
            this.setState({searchResults:res.data})
            console.log('brand filtered list', this.state.searchResults)
          })
  }
    componentDidUpdate(){
        const searchResults = this.props.match.params.search; //from link 
        axios.get(`http://localhost:3000/search/${searchResults}`)
        .then(res=>{
            if(this.state.searchResults === res.data){
                console.log('new', res.data)
                console.log('old state', this.state.searchResults)
                // this.setState({searchResults:res.data})
                    //WORK ON THIS
            }
          })
    }
    render(){
        const { searchField } = this.props;
        const searchResultAmounts = this.state.searchResults.length;
        const searchTerm = this.props.match.params.search;
        
        const {searchResults} = this.state;
        console.log(this.props) //from link 

    return(
        <div id='searchPage'>
            <p id='search-header'>{searchResultAmounts} results found for "{searchTerm}"</p>
            <hr style={{marginBottom: searchResultAmounts === 0?'20rem':''}} /> {/*handles empty page results for footer spacing*/}
            <ul id='searchResults'>

            {searchResults.map((item,i)=>{
                return(
                    <li className='result-item' key={i}>
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
                );
            })}

            </ul>
            <div id='search-buttons' style={{display: searchResultAmounts ===0? 'none': 'flex', marginBottom: searchResultAmounts === 1? '15rem':''}}>
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