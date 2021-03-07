import React, { useEffect, useState } from 'react';
import './shop.css';
import fakeData from '../../fakeData';
import Product from '../product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0,10) 
    const [pro,setPro] = useState(first10)
    const [cart,setCart] = useState([])
    
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
    
    return (
        <div className="shopAndReview">
            <div className="shopAndReview-container" style={{padding:'10px',margin:'5px'}} >
                    {
                        pro.map(product => <Product  
                            handler={addToCartHanlder} showAddtoCart={true} product={product} key={product.key}> </Product>)
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