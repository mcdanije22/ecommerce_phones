import React from 'react';
import './productpage.scss';
import { Link } from 'react-router-dom';
import { UncontrolledCarousel, Button, Modal, ModalBody } from 'reactstrap';

const items = [
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 1',
      caption: 'Slide 1',
      header: 'Slide 1 Header'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 2',
      caption: 'Slide 2',
      header: 'Slide 2 Header'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 3',
      caption: 'Slide 3',
      header: 'Slide 3 Header'
    }
  ];

const Product = ({product, reviews,addToShoppingCart, currentAccount, modalLogin}) =>{
    const{ brand, product_id, product_name, product_price, image_url, descripition, sale_discount } = product;
    
    const scoreList = reviews.map(item=> item.review_score)
    const scoreAverage = scoreList.reduce((total, num)=>{
        return total + num / scoreList.length;
    })
    return(
        <React.Fragment>
        <div id = 'product-header'>
                <p>{brand}</p>  
                <h3>{product_name}</h3> 
            </div>
            <div id = 'topImg'>
            <img src='https://via.placeholder.com/200'/>
            </div>
            <div id = 'imgText'>
                <p style={{display: reviews[0] == 0? 'none':'block' }}>Customer Review: {scoreAverage || 0} out of 5</p>
                <h3 style={{textDecoration:sale_discount !== null?'line-Through':''}}>Price: ${product_price}.00</h3>
                { sale_discount !== null? <h3>Sale Price: ${product_price - sale_discount}.00</h3>:'' }
            </div>
            <div id='mainButton'>
            {currentAccount !== ''?<Button type = 'submit' id={product_id} onClick={addToShoppingCart}>Add to Cart</Button>:<Button type = 'submit' id={product_id}><Link to='/login' style={{color:'black'}}>Add to Cart</Link></Button>}
            
            <Modal isOpen={modalLogin} toggle={this.toggle} id='cartModal' >
                        <ModalBody style={{display:'flex', justifyContent:'center', fontSize:'2rem', marginTop:'2rem', color:'green'}}>
                            <p>Please sign in first</p>
                        </ModalBody>
                        <div id='bottomModal' style={{display:'flex', justifyContent:'center', fontSize:'1rem', marginBottom:'6rem'}}>
                                <Button className='modalBtn' onClick={this.toggle}>Log In</Button>
                                <Link to={'/'}><Button className='modalBtn'>Register</Button></Link>
                        </div>
                    </Modal>


            </div>
            <div id = 'recommendedSection'>
                <h3>Recommended Items:</h3>
                <UncontrolledCarousel id='test' items={items} />
            </div>
            <div id = 'productDescription'>
                <h1><b>Description</b></h1>
                <hr/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p>
        </div>
        </React.Fragment>
    );
};
export default Product;