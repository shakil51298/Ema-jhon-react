import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price
    }
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15){
        shipping = 12.99
    }
    else if(total > 0 ){
        shipping = 12.99
    }
    // const tax = Math.round(total/10)
    const tax = (total/10)
    
    const formateNumber = num => {
            const pricision = num.toFixed(2);
            return Number(pricision)
    }
    return (
        <div className='cart-OrderSum'>
            <h2>Order Summery</h2>
            <h3>Items Ordered:{cart.length} </h3>
            <div className="ingrediants">
                <p>Shipping and Handing :{formateNumber(shipping)} </p>
                <p>Estimated TAX :{formateNumber(tax)} </p>
                <p>Product Price: {formateNumber(total)}</p>
                <p>Total: {formateNumber(total + shipping + tax)}</p>
            </div>
            <Link to='/review'><button className='add-to-cart-btn'>Review your order</button> </Link>
        </div>
    );
};

export default Cart;