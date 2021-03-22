import React, { useEffect, useState } from 'react';
import './shop.css';
import fakeData from '../../fakeData';
import Product from '../product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';


const Shop = () => {

    const first10 = fakeData.slice(0,10) 
    const [products,setPro] = useState([])
    const [cart,setCart] = useState([])
    
    useEffect(()=>{
        setPro(first10)
    },[])
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const PriviousCart = productKeys.map(existingKey => {

            const product = fakeData.find(pd=> pd.key === existingKey);
            product.quantity = savedCart[existingKey]
            // console.log(existingKey, savedCart[existingKey]);
            return product;
        })
        // console.log(productKeys);
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
        setCart(NewCart);
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
function Span(props) {
    return <span></span>
}
export default Shop;