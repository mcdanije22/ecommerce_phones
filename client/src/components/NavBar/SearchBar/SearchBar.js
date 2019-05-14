import React from 'react';
import './searchbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({onSearchChange}) =>{
    return(
        <div id ='searchBar-wrapper'>
         <input id='searchBar' type='text' placeholder='Search item...' onChange={onSearchChange}/>
         <button id='searchBar-button' ><FontAwesomeIcon  icon={faSearch} /></button>
        </div>
    )
}
export default SearchBar;