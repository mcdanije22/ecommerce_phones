import React from 'react';
import SearchPage from '../SearchPage/SearchPage';
import { Link } from 'react-router-dom'

const Brands = () =>{
    return(
            <div id = 'brands-wrapper'>
                <Link to={`/search/apple`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' className='brandIcon' name='Apple'/></Link>
                <Link to={`/search/samsung`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' className='brandIcon'/></Link>
                <Link to={`/search/lg`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg' className='brandIcon'/></Link>
                <Link to={`/search/motorola`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/e/e5/Motorola_logo.svg' className='brandIcon'/></Link>
                <Link to={`/search/google`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/d/dc/Google_svg_icon_logo.svg' className='brandIcon'/></Link>
                <Link to={`/search/blackberry`} component={SearchPage}><img src='https://upload.wikimedia.org/wikipedia/commons/0/09/Font_Awesome_5_brands_blackberry.svg' className='brandIcon'/></Link>
            </div>
    )
};
export default Brands;