import React from 'react';
import './home.scss';
import Featured from './Featured';
import Brands from './Brands';
const Home = () =>{
    return(
        <div id = 'home'>
            <Featured />
            <h3 className = 'home-header'>
                Shop by brand
            </h3>
            <Brands />
        </div>
        
    );
}
export default Home;
