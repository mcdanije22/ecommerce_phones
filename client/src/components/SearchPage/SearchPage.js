import React,{Component} from 'react';
import './searchpage.scss';
import {Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';

class SearchPage extends Component{
    constructor(){
        super();
    }
    render(){
        const { searchField } = this.props;
        console.log(searchField)
    return(
        <div id='searchPage'>
            <p id='search-header'>9999 results found for "Apple"</p>
            <hr/>
            <ul id='searchResults'>


                {/* map this with data from db */}
                <li className='result-item'>
                    <img src='https://via.placeholder.com/80x120' className='search-img'/>
                    <div className='search-item-info'>
                        <p>
                        Iphone XS max
                        <br/>
                        By Apple
                        </p>
                        <h3>$900</h3>
                    </div>
                </li>
                <hr className='float-clear'/>
                {/* map this with data from db */}



                {/* delete this, example data */}
                <li className='result-item'>
                    <img src='https://via.placeholder.com/80x120' className='search-img'/>
                    <div className='search-item-info'>
                        <p>
                        Iphone XS max
                        <br/>
                        By Apple
                        </p>
                        <h3>$900</h3>
                    </div>
                </li>
                <hr className='float-clear'/>
                <li className='result-item'>
                    <img src='https://via.placeholder.com/80x120' className='search-img'/>
                    <div className='search-item-info'>
                        <p>
                        Iphone XS max
                        <br/>
                        By Apple
                        </p>
                        <h3>$900</h3>
                    </div>
                </li>
                <hr className='float-clear'/>
                <li className='result-item'>
                    <img src='https://via.placeholder.com/80x120' className='search-img'/>
                    <div className='search-item-info'>
                        <p>
                        Iphone XS max
                        <br/>
                        By Apple
                        </p>
                        <h3>$900</h3>
                    </div>
                </li>
                <hr className='float-clear'/>
                <li className='result-item'>
                    <img src='https://via.placeholder.com/80x120' className='search-img'/>
                    <div className='search-item-info'>
                        <p>
                        Iphone XS max
                        <br/>
                        By Apple
                        </p>
                        <h3>$900</h3>
                    </div>
                </li>
                <hr className='float-clear'/>
                 {/* delete this, example data */}    



            </ul>
            <div id='search-buttons'>
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