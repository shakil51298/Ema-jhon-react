import React, { useState } from 'react';
import './shop.css';
import fakeData from '../../fakeData';
import Product from '../product/Product';
import Cart from '../Cart/Cart';


const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0,10) 
    const [pro,setPro] = useState(first10)

    const [cart,setCart] = useState([])
    const addToCartHanlder = (product) =>{
        const NewCart = [...cart, product];
        setCart(NewCart);
    }
    
    return (
        <div className="shop">
            <div className="product-container">
                    {
                        pro.map(product => <Product  handler={addToCartHanlder}  product={product}> </Product>)
                    }
            </div>
            <div className="cart-container">
                <Cart  cart={cart}></Cart>
                <Span></Span>
            </div>
            
        </div>
    );
};

function Span(props) {
    return <span>0</span>
}
export default Shop;