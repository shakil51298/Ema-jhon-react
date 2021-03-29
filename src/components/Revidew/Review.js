import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../Review_Item/ReviewItem';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {

    
    const [cart,SetCart] = useState([])
    const [orderPlaced] = useState(false);
   
    const history = useHistory()
    const handleProceedCheckOut =()=>{
        history.push('/shipment')
    }
   
    useEffect(()=>{
        const saveData = getDatabaseCart();
        const productskeys = Object.keys(saveData);
       fetch('http://localhost:5000/productFromKeys',{
        method: 'POST',
        body: JSON.stringify(productskeys),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(res => res.json())
      .then(data =>SetCart(data))
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
            </div>
        </div>
    );
};

export default Review;