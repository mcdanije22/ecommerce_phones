import React from 'react';
import './searchbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const SearchBar = ({onSearchChange,searchField}) =>{
    return(
        <div id ='searchBar-wrapper'>
         <input id='searchBar' value= {searchField} type='text' placeholder='Search item...' onChange={onSearchChange}/>
         <Link to={`/search/${searchField}`} ><button id='searchBar-button'><FontAwesomeIcon  icon={faSearch} /></button></Link>
        </div>
    )
}
export default SearchBar;