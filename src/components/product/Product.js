import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props)
    const {img,name,seller,stock,price} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="pro-name">{name}</h4>
                <br/>
                <p><small>by:{seller}</small></p>
                <p><small>${price}</small></p>
                <p><small>Only {stock} left in stock- Order Soon</small></p>
                <button className="add-to-cart-btn" onClick={()=>props.handler(props.product)} ><FontAwesomeIcon icon={faShoppingCart} /> add to cart </button>
            </div>
        </div>
    );
};

export default Product;