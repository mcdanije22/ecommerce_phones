import React from 'react';
import './reviews.scss';

const Reviews = ({reviews}) =>{
    return(
        <div id='reviews' >
            <h1><b>Reviews</b></h1>
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
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p> */}
                </li>
                )
            })}
               
            </ul>




            {/* <ul id='reviewList'>
                <li className = 'review'>
                    <h3>John Smith - 1 day ago</h3>
                    <h5> 4 out of 5 stars</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p>
                </li>
                <li className = 'review'>
                    <h3>John Smith - 1 day ago</h3>
                    <h5> 4 out of 5 stars</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p>
                </li>
            </ul> */}
        </div>
    ); 
};
export default Reviews;