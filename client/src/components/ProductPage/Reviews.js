import React from 'react';
import './reviews.scss';

const Reviews = ({reviews}) =>{
    return(
        <div id='reviews'>
            <h1><b>Reviews</b></h1>
            <hr/>
            <ul id='reviewList'>

            {reviews.map((item,i)=>{
                const{post_date, review, review_score, first_name, last_name} = item;
                return(
                    <li className = 'review' key={i}>
                    <h3>{first_name} {last_name} - {post_date.slice(0,10)}</h3>
                    <h5> {review_score} out of 5 stars</h5>
                    <p>{review}</p>
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