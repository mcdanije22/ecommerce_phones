import React from 'react';
import './reviews.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus } from '@fortawesome/free-solid-svg-icons';

const Reviews = ({reviews, reviewToggle}) =>{
    return(
        <div id='reviews' >
            <h1><b>Reviews</b><button type='submit' onClick={reviewToggle} style={{marginLeft:'.5rem', fontSize:'1.2rem'}}><FontAwesomeIcon icon={faPlus}/></button></h1>
            <hr/>
            <ul id='reviewList'>
            {reviews.map((item,i)=>{
                const{post_date, review, review_score, reviewer} = item;
                return(
                    <li className = 'review' key={i}>
                    <h3>{reviewer}</h3> 
                    <p> {post_date.slice(0,10)}</p> 
                    <p> {review_score} out of 5 stars</p>
                    <h5> {review} </h5>
                </li>
                )
            })}
            </ul>
        </div>
    ); 
};
export default Reviews;