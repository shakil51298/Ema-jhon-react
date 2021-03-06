import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../Review_Item/ReviewItem';

const Review = () => {
    const [cart,SetCart] = useState([])
   
   
    useEffect(()=>{
        const saveData = getDatabaseCart();
        // collecting key from an object (Object.keys)
        const productkeys = Object.keys(saveData);
        const cartProducts = productkeys.map(key =>{
             const product = fakeData.find(pd => pd.key === key);
             product.quantity = saveData[key]
            return product
            });
            SetCart(cartProducts)
    },[])
    return (
        <div>
            <h2> Cart Item Total: {cart.length} this is review</h2>
           <div style={{padding:'10px',margin:'5px'}}>
           {
               cart.map(pd =>  <ReviewItem product={pd}></ReviewItem>)
           }
           </div>
        </div>
    );
};

export default Review;