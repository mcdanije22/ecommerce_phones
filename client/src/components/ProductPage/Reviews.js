import React from 'react';
import './reviews.scss';

const Reviews = () =>{
    return(
        <div id='reviews'>
            <h1><b>Reviews</b></h1>
            <hr/>
            <ul id='reviewList'>
                <li className = 'review'>
                    <h3>John Smith - 1 day ago</h3>
                    <p1> 4 out of 5 stars</p1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p>
                </li>
                <li className = 'review'>
                    <h3>John Smith - 1 day ago</h3>
                    <p1> 4 out of 5 stars</p1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p>
                </li>
            </ul>
        </div>
    ); 
};
export default Reviews;