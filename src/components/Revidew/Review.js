import React, { useEffect, useImperativeHandle, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../Review_Item/ReviewItem';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart,SetCart] = useState([])
    const [orderPlaced,SetOrderPlaced] = useState(false);
   
    const history = useHistory()
    const handleProceedCheckOut =()=>{
        history.push('/shipment')
        // SetCart([]);
        // SetOrderPlaced(true);
        // processOrder();
    }
   
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
    const removerBtnHandler = (pdKEy)=>{
            // console.log('remove clicked',pdKEy);
            //remove the produc from review list/pages
            const newCard = cart.filter(pd => pd.key !== pdKEy)
            SetCart(newCard)
            //remove from dataBaseCart
            removeFromDatabaseCart(pdKEy)
    }
    //set ighipy images

    let thankyou
     if(orderPlaced){
         thankyou = <img src={happyImage} alt=""/>
     }
    return (
        <div className="shopAndReview">
           <div className="shopAndReview-container" style={{padding:'10px',margin:'5px'}}>
                {
                    cart.map(pd =>  <ReviewItem 
                    product={pd}
                    key={pd.key}
                    removehnadler={removerBtnHandler}
                    >
                    </ReviewItem>)
                }
                {
                    thankyou //image
                }
                
           </div>
           <div className="cart-container">
               <Cart cart={cart}>
                   <button className="add-to-cart-btn" onClick={handleProceedCheckOut}>Proceed Check Out</button>
               </Cart>
                {/* <Cart   cart={cart}></Cart> */}
                
            </div>
        </div>
    );
};

export default Review;