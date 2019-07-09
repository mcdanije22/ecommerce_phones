import { GET_SHOPPING_CART } from '../actions/constants';

const intialState = {
    shoppingCart: ''
};

 const getShoppingCart = ( state=intialState, action={} )=>{
    switch(action.type){
        case GET_SHOPPING_CART:
        return {
            ...state,
            shoppingCart: action.payload
        }            
        default:
            return state
    }
}
export default getShoppingCart;