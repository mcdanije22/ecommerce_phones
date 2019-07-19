import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

  const Featured = () =>{
      return(
        <div id='top-img'>
         <Link to={'/product/4/apple'}><img src='https://www.rogers.com/cms/rogers/page-specific/wireless/iphone-2018/images/M_XR_Banner.jpg' /></Link> 
        </div>
      )
  };
  export default Featured;