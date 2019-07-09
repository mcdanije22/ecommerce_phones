import { GET_SHOPPING_CART } from './constants';

export const shoppingCart = (item) =>{
    return{
        type:GET_SHOPPING_CART,
        payload:item
    }
};
