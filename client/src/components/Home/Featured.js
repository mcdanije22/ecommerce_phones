import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

  const Featured = () =>{
      return(
        <div id='top-img'>
         <Link to={'/product/4/apple'}><img src='https://cdn.shopify.com/s/files/1/0810/8331/files/category_banner_ipxs_xr.jpg?4939419680647679162' /></Link> 
        </div>
      )
  };
  export default Featured;