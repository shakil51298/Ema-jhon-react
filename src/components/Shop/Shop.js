import React, { useEffect, useState } from 'react';
import './shop.css';
import fakeData from '../../fakeData';
import Product from '../product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
// import { CircularProgress } from '@material-ui/core';


const Shop = () => {

    // const first10 = fakeData.slice(0,10) 
    const [products,setPro] = useState([])
    const [cart,SetCart] = useState([])
    
    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setPro(data))
    },[])
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
    const addToCartHanlder = (product) =>{

        // const NewCart = [...cart, product];
        
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded)
        let count = 1;
        let NewCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            NewCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            NewCart = [...cart,product];
        }
        // const count = sameProduct.length;
        SetCart(NewCart);
        // set to data manager in local storage;
        // const total = NewCart.filter(pd => pd.key === product.key)
        // const count = total.length;
        addToDatabaseCart(product.key,count)
        
    }   
    document.title ="Ema Jhon"
    return (
        <div className="shopAndReview">
            
            <div className="shopAndReview-container" style={{padding:'10px',margin:'5px'}} >
            {
                products.length === 0 && <h1>Loding.....</h1>
            }
                    {
                        products.map(product => <Product  
                            handler={addToCartHanlder} showAddtoCart={true} products={product} key={product.key}> </Product>)
                   }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to='/review'><button className='add-to-cart-btn'>Review your order</button> </Link>
                </Cart>
            </div>
            
        </div>
    );
};
// function Span(props) {
//     return <span></span>
// }
export default Shop;