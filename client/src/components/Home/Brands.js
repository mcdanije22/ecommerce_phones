import React from 'react';
import SearchPage from '../SearchPage/SearchPage';
import { Link } from 'react-router-dom'

const Brands = () =>{
    return(
            <div id = 'brands-wrapper'>
                <Link to={`/search/Apple`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' className='brandIcon' name='Apple'/></Link>
                <Link to={`/search/Samsung`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' className='brandIcon'/></Link>
                <Link to={`/search/Lg`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg' className='brandIcon'/></Link>
                <Link to={`/search/Motorola`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/e/e5/Motorola_logo.svg' className='brandIcon'/></Link>
                <Link to={`/search/Google`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png' className='brandIcon'/></Link>
                <Link to={`/search/Blackberry`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/0/09/Font_Awesome_5_brands_blackberry.svg' className='brandIcon'/></Link>
            </div>
    )
};
export default Brands;