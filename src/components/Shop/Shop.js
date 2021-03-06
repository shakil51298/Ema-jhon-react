import React, { useState } from 'react';
import './shop.css';
import fakeData from '../../fakeData';
import Product from '../product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';


const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0,10) 
    const [pro,setPro] = useState(first10)

    const [cart,setCart] = useState([])
    const addToCartHanlder = (product) =>{
        const NewCart = [...cart, product];
        setCart(NewCart);
        // set to data manager in local storage;
        const total = NewCart.filter(pd => pd.key === product.key)
        const count = total.length;
        addToDatabaseCart(product.key,count)
    }
    
    return (
        <div className="shop">
            <div className="product-container">
                    {
                        pro.map(product => <Product  
                            handler={addToCartHanlder} showAddtoCart={true} product={product} key={product.key}> </Product>)
                   
                   }
            </div>
            <div className="cart-container">
                <Cart   cart={cart}></Cart>
                <Span></Span>
            </div>
            
        </div>
    );
};
function Span(props) {
    return <span></span>
}
export default Shop;